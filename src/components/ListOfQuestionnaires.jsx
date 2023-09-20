import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Questions from "./Questions";

const ListOfQuestionnaires = ({questionnaires,onDeleteMember}) => {

  return (
    <div>
      
        <div>

          
          <h2>{questionnaires.legnth === 0 && "No "} Available Questionnaires</h2>
          { 
          questionnaires.map((questions, index)=>(
            <Questions key= {index} questions={questions} onDeleteMember={onDeleteMember} />
          ))}

        </div>
      
    </div>
  );
};

export default ListOfQuestionnaires;
