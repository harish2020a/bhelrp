import React from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const DUMMY_TEMPLATES = [
    {
      code: 100,
      template: "Application",
      message: "Applied",
    },
    {
      code: 101,
      template: "Allocation",
      message: "Allocated",
    },
    {
      code: 102,
      template: "Deletion",
      message: "Deleted",
    },
  ];
  return (
    <React.Fragment>
      <Form templates={DUMMY_TEMPLATES}/>
    </React.Fragment>
  );
}

export default App;
