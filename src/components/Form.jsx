import React, { useState, useRef } from "react";
import "./Form.css";

const Form = (props) => {
  const [templateEntry, setTemplate] = useState("");
  const [checkDuplicate, setCheckDuplicate] = useState(false);
  const [checkInvalid, setCheckInvalid] = useState(false);

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

  const checkDuplicateHandler = () => {
    setCheckDuplicate(!checkDuplicate);
    if (!checkDuplicate) {
      contacts.current.value = [
        ...new Set(contacts.current.value.split("\n")),
      ].join("\n");
    }
  };

  function phonenumber(inputtxt) {
    var phno = /^\d{10}$/;
    return phno.test(inputtxt);
  }

  const checkInvalidHandler = () => {
    setCheckInvalid(!checkInvalid);
    if (!checkInvalid) {
      let arr = contacts.current.value.split("\n");
      arr = arr.filter(phonenumber);
      contacts.current.value = arr.join("\n");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(contacts.current.value.split("\n"));
    event.resetFields();
  };

  return (
    <form id="form" onSubmit={submitHandler}>
      <label htmlFor="company">
        Company Name:{" "}
        <select name="company" id="company">
          <option value="BHELRP">BHELRP</option>
        </select>
      </label>

      <label htmlFor="template">
        Template Name:{" "}
        <select
          name="template"
          id="template"
          onChange={templateHandler}
          required
        >
          <option value="none" selected disabled hidden>
            Select a Template
          </option>
          {props.templates.map((record) => {
            return <option value={record.code}>{record.template}</option>;
          })}
        </select>
      </label>

      <label htmlFor="contact">Contact Details: </label>
      <textarea
        rows="20"
        cols="50"
        name="contact"
        id="contact"
        ref={contacts}
        required
        placeholder="Enter contact details separated by a new line"
      ></textarea>
      <label className="checkbox" htmlFor="removeDuplicates">
        <input
          type="checkbox"
          id="removeDuplicates"
          name="removeDuplicates"
          onChange={checkDuplicateHandler}
          checked={checkDuplicate}
        />
        Remove Duplicates&emsp;
      </label>

      <label className="checkbox" htmlFor="removeInvalid">
        <input
          type="checkbox"
          id="removeInvalid"
          name="removeInvalid"
          onChange={checkInvalidHandler}
          checked={checkInvalid}
        />
        Remove Invalid&emsp;
      </label>
      <label htmlFor="message">Message: </label>
      <textarea
        rows="60"
        cols="80"
        name="message"
        id="message"
        value={templateEntry}
        onChange={messageChanger}
        required
        placeholder="Enter the message to be sent"
      ></textarea>
      <button name="button" id="button">
        Send
      </button>
    </form>
  );
};

export default Form;
