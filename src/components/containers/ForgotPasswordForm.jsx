import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://timeapp-w9z5.onrender.com";
const ForgotPasswordForm = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email };
    axios
      .post(`${API_URL}/auth/password-reset-email`, requestBody)
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });

    setEmail("");
  };

  const checkFields = () => {
    if (!email) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <Message
        attached
        // header="Welcome back to our site!"
        content="Provide your email below to reset your password!"
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
        <Button type="submit" color="blue" disabled={checkFields()}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
