import Header from "./Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
        {/* <div>
            <h3>Dashboard</h3>
            <p>Total Questions: {totalQuestions}</p>
            <p>Total Agree: {totalAgree}</p>
            <p>Total Neutral: {totalNeutral}</p>
            <p>Total Disagree: {totalDisagree}</p>
          </div> */}
        <div className="main-title">
          <h1 className="title">Dashboard</h1>
        </div>
        <div className="main-container">
          <div className="cards card__questions">
            <div className="main__cards">
              <h3>Total Questions:</h3>
            </div>
            <h1>{totalQuestions}</h1>
          </div>

          <div className="cards card__agree">
            <div className="main__cards">
              <h3>Total Agree:</h3>
            </div>
            <h1>{totalAgree}</h1>
          </div>

          <div className="cards card__neutral">
            <div className="main__cards">
              <h3>Total Neutral:</h3>
            </div>
            <h1>{totalNeutral}</h1>
          </div>

          <div className="cards card__disagree">
            <div className="main__cards">
              <h3>Total Disagree:</h3>
            </div>
            <h1>{totalDisagree}</h1>
          </div>
        </div>


        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={questionnaires}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <h3>ADF</h3>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="question" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="agree" fill="green" />
            <Bar dataKey="neutral" fill="orange" />
            <Bar dataKey="disagree" fill="red" />
          </BarChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default DashBoard;
