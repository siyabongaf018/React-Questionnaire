import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionnairesForUser = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [questionnaires2, setQuestionnaires2] = useState([]);

  const navigate = useNavigate();

  const [responses, setResponses] = useState({}); // State to store user responses

  useEffect(() => {
    axios.get("http://localhost:3000/questionnairesData").then((response) => {
      const questionnaire = response.data;
      setQuestionnaires(response.data);
      setQuestionnaires2(response.data);
      setResponses(questionnaire);
      console.log("Fetched questionnaires:", questionnaire);

      if (questionnaire && questionnaire.question) {
        setQuestionnaires(questionnaire.question);
        console.log("Fetched questionnaires:", questionnaire.question);
      }
    });
  }, []);

  const handleResponse = (questionId, response) => {
    // console.log(questionId);

    let oldData = [...questionnaires2];
    let newData = oldData[questionId];

    newData.agree = 0;
    newData.disagree = 0;
    newData.neutral = 0;
    if (response === "agree") {
      newData.agree = 1;
      console.log(newData.agree + " response " + response);
    } else if (response === "neutral") {
      newData.neutral = 1;
      console.log(newData.neutral + " response " + response);
    } else if (response === "disagree") {
      newData.disagree = 1;
      console.log(newData.disagree + " response " + response);
    }

    //assign the newdata wich is updated to the olddata.
    oldData[questionId] = newData;

    setQuestionnaires2(oldData);
    setResponses({ ...responses, [questionId]: response });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //updating the new data from the form with the precious data from the database
    const updatedData = questionnaires.map((item) => {
      const newItem = questionnaires2.find((newItem) => newItem.id === item.id);
      if (newItem) {
        return {
          ...item,
          agree: item.agree + newItem.agree,
          neutral: item.neutral + newItem.neutral,
          disagree: item.disagree + newItem.disagree,
        };
      }
      return item;
    });

    setQuestionnaires(updatedData);
    console.log(questionnaires);
    let dataSet = [...questionnaires];

    // const response = await axios.post(
    //   "http://localhost:3000/questionnairesData",
    //   dataSet
    // );

    // if (response.status === 201) {
    //   navigate("/");
    // }

    // // Send a PUT request to update the data on the server
    // axios
    //   .put("http://localhost:3000/questionnairesData/1", dataSet)
    //   .then((response) => {
    //     console.log("Data updated successfully:", response.data);
    //     // You can add any additional handling here if needed.
    //   })
    //   .catch((error) => {
    //     console.error("Error updating data:", error);
    //     // Handle any errors that occur during the PUT request.
    //   });
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <h3>Questionnaire</h3>
        {questionnaires.length > 0 ? (
          questionnaires.map((question, index) => (
            <div key={index}>
              <h3>{question.question}</h3>
              <div>
                <label>Agree</label>{" "}
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="agree"
                  checked={responses[index] === "agree"}
                  onChange={() => handleResponse(index, "agree")}
                />{" "}
                <label>Neutral</label>
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="neutral"
                  checked={responses[index] === "neutral"}
                  onChange={() => handleResponse(index, "neutral")}
                />{" "}
                <label>Disagree</label>
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="disagree"
                  checked={responses[index] === "disagree"}
                  onChange={() => handleResponse(index, "disagree")}
                />{" "}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuestionnairesForUser;
