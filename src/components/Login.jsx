import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import classes from "./Login.module.css";
import Card from "./UI/Card";

const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val === "harish" };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: prevState.value, isValid: prevState.isValid };
  }
  return { value: "", isValid: false };
};

const pwdReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: prevState.value, isValid: prevState.isValid };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [pwdState, dispatchPwd] = useReducer(pwdReducer, {
    value: "",
    isValid: null,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: emailIsValid } = emailState;
  const { isValid: pwdIsValid } = pwdState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && pwdIsValid);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, pwdIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPwd({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPwd({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailState.value, pwdState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <div className={classes.body}>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes["form-field"]}>
            <label className={classes.label} htmlFor="username">
              Username:{" "}
              <input
                className={classes.input}
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
              />
            </label>
          </div>
          <div className={classes["form-field"]}>
            <label className={classes.label} htmlFor="password">
              Password:{" "}
              <input
                className={classes.input}
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
              />
            </label>
          </div>
          <button
            className={classes.btn}
            type="submit"
            disabled={!formIsValid}
            onClick={props.onLogin}
          >
            Log in
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
