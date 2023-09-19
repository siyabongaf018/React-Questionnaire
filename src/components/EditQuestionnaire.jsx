import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const EditQuestionnaire = () => {
  const [question, setQuestion] = useState("");
  const [agree, setAgree] = useState("");
  const [neutral, setNeutral] = useState("");
  const [disagree, setDisagree] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/questionnairesData/${id}`)
      .then((response) => {
        const questionnaire = response.data;
        setQuestion(questionnaire.question);
        setAgree(questionnaire.agree);  
        setNeutral(questionnaire.neutral);
        setDisagree(questionnaire.disagree);

      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const dataSet = {
      question: question,
      agree: parseInt(agree),
      neutral: parseInt(neutral),
      disagree: parseInt(disagree),
    };

    try {
      const response = await axios.put(`http://localhost:3000/questionnairesData/${id}`, dataSet);
    console.log(response.data);
    // alert("Blog data saved!");
    
    if (response.status === 200) {
      // Redirect to the desired route (in this case, '/')
      navigate('/');
    }
    } catch (error) {
      console.error("Error updating response:", error);
      //display error
    }
  };

  return (
    <div>
      <Header />
      <div className="Context">
        <h3>Update Questionnaire</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Question:
            <input
              type="text"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestionnaire;
