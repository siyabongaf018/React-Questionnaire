import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionnairesForUser = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [responses, setResponses] = useState({}); // State to store user responses
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/questionnairesData").then((response) => {
      const questionnaire = response.data;
      setQuestionnaires(questionnaire);
      if (questionnaire && questionnaire.question) {
        console.log("Fetched questionnaires:", questionnaire.question);
      }
    });
  }, []);

  const handleResponse = (questionId, response) => {
    // Get the previous response for this question
    const previousResponse = responses[questionId];

    // If a previous response exists, decrement it
    if (previousResponse) {
      setQuestionnaires((prevQuestionnaires) => {
        return prevQuestionnaires.map((item, index) => {
          if (index === questionId) {
            return {
              ...item,
              [previousResponse]: item[previousResponse] - 1,
              [response]: item[response] + 1,
            };
          }
          return item;
        });
      });
    } else {
      // No previous response, just increment the new response
      setQuestionnaires((prevQuestionnaires) => {
        return prevQuestionnaires.map((item, index) => {
          if (index === questionId) {
            return {
              ...item,
              [response]: item[response] + 1,
            };
          }
          return item;
        });
      });
    }

    // Update the response state
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: response,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    try {
      const promises = questionnaires.map(async (item, index) => {
        const questionData = {
          question: item.question,
          agree: item.agree,
          neutral: item.neutral,
          disagree: item.disagree,
        };
  
        const response = await axios.put(
          `http://localhost:3000/questionnairesData/${item.id}`,
          questionData
        );
  
        console.log(`Question ${index} updated:`, response.data);
  
        return response;
      });
  
      await Promise.all(promises);
  
      console.log("All questions updated successfully");
      navigate("/");
   
    } catch (error) {
      console.error("Error updating questions:", error);
      
    }
  };

  // navigate("/dashBoard");
  
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
                <label>Agree</label>
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="agree"
                  checked={responses[index] === "agree"}
                  onChange={() => handleResponse(index, "agree")}
                />
                <label>Neutral</label>
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="neutral"
                  checked={responses[index] === "neutral"}
                  onChange={() => handleResponse(index, "neutral")}
                />
                <label>Disagree</label>
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="disagree"
                  checked={responses[index] === "disagree"}
                  onChange={() => handleResponse(index, "disagree")}
                />
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
