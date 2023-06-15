import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Login from "./components/Login";

function App() {
  useEffect(() => {
    const logCheck = localStorage.getItem("isLoggedIn");
    if (logCheck === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const DUMMY_TEMPLATES = [
    {
      code: 100,
      template: "Short email to Gauge Interest",
      message:
        "Hi <First-name>,\nYou probably get this often, but your background caught my eye.\nI'm a recruiter at {your_company_name}. I’m reaching out because I think that with your experience in X, you would be a great fit for one of our client'’'s open roles for {position_name}\nAre you open to a chat?\nThanks,\n<Signature>",
    },
    {
      code: 101,
      template: "Connect with a salesperson",
      message:
        "Sub: Hey <first-name>, loved your blog\nHey <First-name>,\nI recently stumbled on your blog about creating engaging sales emails with GIFs and visual elements to get better responses. I have to say – absolutely loved it. I have been using GIFs(cause who doesn’t love them) in my emails and getting incredible results. Your efforts must have led to tremendous results at {candidate_company_name}.",
    },
    {
      code: 102,
      template: "Recruiting a developer",
      message:
        "Sub: NYC front-end dev opportunity\nHello <First-name>,\nI came across your Stackoverflow / Github profile whilst researching for Frontend experts and was very impressed with your work at <CandidateCompanyName>. I am currently working with a great B2C startup in NYC to help them expand their stellar engineering team.",
    },
    {
      code: 103,
      template: "Recruiting a designer",
      message:
        "Subject: Yoga and design\nHey <first-name>,\nI came across your medium post about how yoga and meditation have helped you in your creative process. I am thoroughly impressed with your commitment to design and your out-of-the-box thought process. Your work at {current_company_name} is really impressive.",
    },
    {
      code: 104,
      template: "Recruiting a Machine Learning Engineer",
      message:
        "Hi <First-name>,\nYou probably get this often, but your background caught my eye.\nI'm a recruiter at {your_company_name}. I'm reaching out because I think that with your experience in X, you would be a great fit for one of our client's open roles for {position_name}\nAre you open to a chat?\nThanks,\n<Signature>",
    },
  ];

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = (email, pwd) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    console.log(email, pwd);
  };

  return (
    <React.Fragment>
      {isLoggedIn && (
        <Form templates={DUMMY_TEMPLATES} onLogout={logoutHandler} />
      )}
      {!isLoggedIn && <Login onLogin={loginHandler} />}
    </React.Fragment>
  );
}

export default App;
