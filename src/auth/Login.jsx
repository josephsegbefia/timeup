import React, { useContext } from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Loader, Dimmer } from "semantic-ui-react";

const API_URL = "https://timeapp-w9z5.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

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
    setLoggingIn(true);

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        setLoggingIn(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };
  if (loggingIn) {
    return (
      <div>
        <Dimmer active inverted>
          <Loader inverted>Logging In. Please Wait...</Loader>;
        </Dimmer>
      </div>
    );
  }
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
        <Form.Input
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
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
        Forgot Password?&nbsp;<a href="/forgot-password">Click Here</a>&nbsp;
      </Message>
    </div>
  );
};

export default Login;
