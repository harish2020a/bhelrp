import React, { useState, useRef } from "react";
import "./Form.css";

const Form = (props) => {
  const [templateEntry, setTemplate] = useState("");
  const contacts = useRef();

  const templateHandler = (event) => {
    for (let mes of props.templates) {
      if (mes.code == event.target.value) {
        setTemplate(mes.message);
        return;
      }
    }
  };

  const messageChanger = (event) => {
    setTemplate(event.target.value);
    console.log("hola");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(contacts.current.value.split("\n"));
    event.resetFields();
  };

  return (
    <form id="form" onSubmit={submitHandler}>
      <label for="company">Company Name</label>
      <select name="company" id="company">
        <option value="BHELRP">BHELRP</option>
      </select>
      <label for="template">Template Name</label>
      <select name="template" id="template" onChange={templateHandler} required>
        <option value="none" selected disabled hidden>
          Select a Template
        </option>
        {props.templates.map((record) => {
          return <option value={record.code}>{record.template}</option>;
        })}
      </select>
      <label for="contact">Contact Details</label>
      <textarea
        rows="20"
        cols="50"
        name="contact"
        id="contact"
        ref={contacts}
        required
        placeholder="Enter contact details separated by a new line"
      ></textarea>
      <label for="message">Message</label>
      <textarea
        rows="60"
        cols="80"
        name="message"
        id="message"
        value={templateEntry}
        onChange={messageChanger}
        required
      ></textarea>
      <button name="button" id="button">
        Send
      </button>
    </form>
  );
};

export default Form;
