import Header from "./Header";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DashBoard = () => {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    // Fetch questionnaires from the database
    axios.get("http://localhost:3000/questionnairesData").then((response) => {
      setQuestionnaires(response.data);
    });
  }, []);

  const data = [...questionnaires];
  let totalAgree = 0;
  let totalNeutral = 0;
  let totalDisagree = 0;

  data.map((item, index) => {
    totalAgree += data[index].agree;
    totalNeutral += data[index].neutral;
    totalDisagree += data[index].disagree;
  });
  const totalQuestions = data.length;

  
  return (
    <div>
      <Header />
      <div className="Context">
        <div>
          <h3>Dashboard</h3>
          <p>Total Questions: {totalQuestions}</p>
          <p>Total Agree: {totalAgree}</p>
          <p>Total Neutral: {totalNeutral}</p>
          <p>Total Disagree: {totalDisagree}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
