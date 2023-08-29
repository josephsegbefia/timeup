import React, { useContext } from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkFields = () => {
    if (!email || !password) {
      return true;
    }
    return false;
  };
  const onFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log(response.data);
        toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT
        });
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/timers");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };
  return (
    <div>
      <Message
        attached
        header="Welcome back to our site!"
        content="Fill out the form below to login into your account"
      />
      <ToastContainer />
      <Form
        onSubmit={onFormSubmit}
        className="attached left aligned fluid segment"
      >
        <Form.Group widths="equal"></Form.Group>
        <Form.Input
          name="email"
          label="Email"
          placeholder="Email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <Form.Input
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        {/* <Form.Checkbox inline label="I agree to the terms and conditions" /> */}
        <Button
          type="submit"
          color="blue"
          disabled={checkFields()}
          // disabled={checkFields()}
        >
          Submit
        </Button>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Forgot Password?&nbsp;<a href="#">Click Here</a>&nbsp;
      </Message>
    </div>
  );
};

export default Login;
