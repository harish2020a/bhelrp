import React, { useState, useRef } from "react";
import classes from "./Form.module.css";
import readXlsxFile from "read-excel-file";

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
  };

  const checkDuplicateHandler = () => {
    setCheckDuplicate(!checkDuplicate);
    if (!checkDuplicate) {
      contacts.current.value =
        [...new Set(contacts.current.value.split("\n"))].join("\n") + "\n";
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
      contacts.current.value = arr.join("\n") + "\n";
    }
  };

  const fileHandler = (event) => {
    let file = event.target.files[0];
    let fileExtension = file.name.split(".").pop();
    if (fileExtension === "csv" || fileExtension === "txt") {
      const fr = new FileReader();
      fr.onload = function () {
        contacts.current.value += fr.result + "\n";
      };
      fr.readAsText(file);
    } else {
      readXlsxFile(file).then((rows) => {
        rows.forEach((row) => {
          row.forEach((entry) => {
            contacts.current.value += entry + "\n";
          });
        });
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    checkDuplicateHandler();
    checkInvalidHandler();
    console.log({
      contacts: contacts.current.value.split("\n").filter((num) => {
        return num.trim().length > 0;
      }),
      message: templateEntry,
    });
  };

  return (
    <div className={classes.arbitrary}>
      <button
        className={classes.button}
        style={{ float: "right" }}
        onClick={props.onLogout}
      >
        Log Out
      </button>
      <form id="form" onSubmit={submitHandler}>
        <label className={classes.label} htmlFor="company">
          Company Name:{" "}
          <select className={classes.select} name="company" id="company">
            <option value="BHELRP">BHELRP</option>
          </select>
        </label>

        <label className={classes.label} htmlFor="contact">
          Contact Details:{" "}
        </label>
        <textarea
          className={classes.textarea}
          rows="20"
          cols="50"
          name="contact"
          id="contact"
          ref={contacts}
          required
          placeholder="Enter contact details separated by a new line"
        ></textarea>
        <label
          className={`${classes.label} ${classes.checkbox}`}
          htmlFor="removeDuplicates"
        >
          <input
            className={classes.inputcheck}
            type="checkbox"
            id="removeDuplicates"
            name="removeDuplicates"
            onChange={checkDuplicateHandler}
            checked={checkDuplicate}
          />
          Remove Duplicates&emsp;
        </label>

        <label
          className={`${classes.label} ${classes.checkbox}`}
          htmlFor="removeInvalid"
        >
          <input
            className={classes.inputcheck}
            type="checkbox"
            id="removeInvalid"
            name="removeInvalid"
            onChange={checkInvalidHandler}
            checked={checkInvalid}
          />
          Remove Invalid&emsp;
        </label>
        <label className={`${classes.label} ${classes.link}`} htmlFor="file">
          Text/Excel(Contacts)
          <input
            type="file"
            id="file"
            className={classes.file}
            onChange={fileHandler}
          ></input>
        </label>

        <label className={classes.label} htmlFor="message">
          Message:{" "}
        </label>
        <textarea
          className={classes.textarea}
          rows="60"
          cols="80"
          name="message"
          id="message"
          value={templateEntry}
          onChange={messageChanger}
          required
          placeholder="Enter the message to be sent"
        ></textarea>
        <label className={classes.label} htmlFor="template">
          Template Name:{" "}
          <select
            className={classes.select}
            name="template"
            id="template"
            onChange={templateHandler}
            defaultValue="none"
            required
          >
            <option value="none" disabled hidden>
              Select a Template
            </option>
            {props.templates.map((record) => {
              return (
                <option key={record.code} value={record.code}>
                  {record.template}
                </option>
              );
            })}
          </select>
        </label>
        <button
          className={classes.button}
          type="submit"
          name="button"
          id="button"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Form;
