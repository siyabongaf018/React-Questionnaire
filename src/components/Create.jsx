import Header from "./Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ListOfQuestionnaires from "./ListOfQuestionnaires";
import "./style.css";

const Create = () => {
  const [question, setQuestion] = useState("");

  const [questionnaires, setQuestionnaires] = useState([]);

  //Get All questionnairs on the database
  useEffect(() => {
    axios.get("http://localhost:3000/questionnairesData").then((response) => {
      setQuestionnaires(response.data);
    });
  }, []);

  const onDeleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/questionnairesData/${id}`);
      setQuestionnaires((prevData) => prevData.filter((a) => a.id !== id));
      // window.alert("Record deleted");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        question: question,
        agree: 0,
        neutral: 0,
        disagree: 0,
      };
      const response = await axios.post(
        "http://localhost:3000/questionnairesData",
        formData
      );
      setQuestionnaires([...questionnaires, response.data]);
      setQuestion("");
    } catch (error) {
      console.error("Error creating questionnaire:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="Context">
        <h2>Create A Questionnaire</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid blue",
              width: "300px",
              height: "30px",
            }}
            placeholder="Add Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <br />
          <br />
          <button className="btnSubmit" type="submit">
            <span>Add</span>
          </button>
        </form>
        <hr/>
        {questionnaires.length > 0 ? (
          <ListOfQuestionnaires
            questionnaires={questionnaires}
            onDeleteMember={onDeleteMember}
          />
        ) : (
          <h2>No Questions</h2>
        )}
      </div>
    </div>
  );
};

export default Create;
