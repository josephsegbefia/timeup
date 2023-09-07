import React, { useState } from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Loader, Dimmer } from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = "https://timeapp-w9z5.onrender.com";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const checkFields = () => {
    return (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirm ||
      password !== passwordConfirm
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    setSigningUp(true);

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!passwordRegex.test(password)) {
      toast.error("Password does not meet the requirements");
      setSigningUp(false);
      return;
    }

    const requestBody = { firstName, lastName, email, password };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        toast.success("Sign up successful. Redirecting to log in page", {
          position: toast.POSITION.TOP_RIGHT
        });

        setTimeout(() => {
          navigate("/verification-notification");
        }, 2000);
      })
      .catch((err) => {
        setSigningUp(false);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  if (signingUp) {
    return (
      <div>
        <Dimmer active inverted>
          <Loader inverted>Creating Account. Please Wait...</Loader>
        </Dimmer>
      </div>
    );
  }

  return (
    <div>
      <Message
        attached
        header="Welcome to our site!"
        content="Fill out the form below to sign-up for a new account"
      />
      <ToastContainer />
      <Form
        onSubmit={onFormSubmit}
        className="attached left aligned fluid segment"
      >
        <Form.Group widths="equal">
          <Form.Input
            name="firstName"
            fluid
            label="First Name"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <Form.Input
            name="lastName"
            fluid
            label="Last Name"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </Form.Group>
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
        <small>
          Password must have:
          <ul>
            <li>At least 6 characters</li>
            <li>At least one number</li>
            <li>One lowercase</li>
            <li>One uppercase letter</li>
          </ul>
        </small>
        <Form.Input
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          value={passwordConfirm}
          placeholder="Make sure passwords match to activate submit button"
          onChange={handlePasswordConfirmChange}
        />
        <Button type="submit" color="blue" disabled={checkFields()}>
          Submit
        </Button>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Already signed up?&nbsp;<Link to="/login">Login here</Link>
        &nbsp;instead.
      </Message>
    </div>
  );
};

export default Signup;
