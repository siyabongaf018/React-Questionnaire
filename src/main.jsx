import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from './components/DashBoard.jsx';
import Questionnaire from './components/Questionnaire.jsx';
import Create from './components/Create.jsx';
import ListOfQuestionnaires from './components/ListOfQuestionnaires.jsx';
import EditQuestionnaire from './components/EditQuestionnaire.jsx';
import QuestionnairesForUser from './components/QuestionnairesForUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Create />,
    
  },
  {
    path: "/dashBoard",
    element: <DashBoard />,
    
  },
  {
    path: "/questionnaire/:id",
    element: <Questionnaire />,
    
  },
  ,
  {
    path: "/listOfQuestionnaires",
    element: <ListOfQuestionnaires />,
    
  },
  {
    path: "/create",
    element: <Create />,
    
  },
  ,
  {
    path: "/editQuestionnaire/:id",
    element: <EditQuestionnaire />,
    
  },
  {
    path: "/QuestionnairesForUser",
    element: <QuestionnairesForUser />,
    
  },
  

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} /> 

  </React.StrictMode>,
)
