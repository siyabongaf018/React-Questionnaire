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
     // console.log("Fetched questionnaires:", questionnaire);

      if (questionnaire && questionnaire.question) {
        setQuestionnaires(questionnaire.question);
      //  console.log("Fetched questionnaires:", questionnaire.question);
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
      // console.log(newData.agree + " response " + response);
    } else if (response === "neutral") {
      newData.neutral = 1;
      // console.log(newData.neutral + " response " + response);
    } else if (response === "disagree") {
      newData.disagree = 1;
      // console.log(newData.disagree + " response " + response);
    }

    //assign the newdata wich is updated to the olddata.
    oldData[questionId] = newData;

    setQuestionnaires2(oldData);
    setResponses({ ...responses, [questionId]: response });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 1. Calculate the new data for the questionnaire questions
    const updatedData = questionnaires.map((item, index) => {
      const newItem = questionnaires2[index]; // Use the index to access the corresponding item
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
  
    // 2. Update the local state with the new data
    setQuestionnaires(updatedData);
    console.log("data",questionnaires);
  
    try {
      // 3. Send PUT requests to update the database for each question
      const promises = questionnaires.map(async (item, index) => {
        const questionData = {
          question: item.question,
          agree: item.agree,
          neutral: item.neutral,
          disagree: item.disagree,
        };
  
        // Use the item's id for the PUT request URL
        const response = await axios.put(
          `http://localhost:3000/questionnairesData/${item.id}`,
          questionData
        );
  
        console.log(`Question ${index} updated:`, response.data);
  
        // Return the response so we can wait for all requests to complete
        return response;
      });
  
      // Wait for all PUT requests to complete
      await Promise.all(promises);
  
      console.log("All questions updated successfully");
  
      // 4. Uncomment the following line to navigate after successful submission
      // navigate("/");
    } catch (error) {
      console.error("Error updating questions:", error);
      // Handle any errors that may occur during the database update here
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //updating the new data from the form with the precious data from the database
  //   const updatedData = questionnaires.map((item) => {
  //     const newItem = questionnaires2.find((newItem) => newItem.id === item.id);
  //     if (newItem) {
  //       return {
  //         ...item,
  //         agree: item.agree + newItem.agree,
  //         neutral: item.neutral + newItem.neutral,
  //         disagree: item.disagree + newItem.disagree,
  //       };
  //     }
  //     return item;
  //   });

  //   setQuestionnaires(updatedData);
  //   console.log(questionnaires);
  //   let dataSet = [...questionnaires];

  //   // going through the useState to update the database for all the values for the quiestions
  //   questionnaires.map(async (item, index) => {
  //     const quiestionData = {
  //       question: item.question,
  //       agree: parseInt(item.agree),
  //       neutral: parseInt(item.neutral),
  //       disagree: parseInt(item.disagree),
  //     };

  //     const response = await axios.put(
  //       `http://localhost:3000/questionnairesData/${index}`,
  //       quiestionData
  //     );
  //     console.log(response.data);

  //     if (response.status === 200) {
  //       // navigate("/");
  //     }
  //   });
  // };

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
