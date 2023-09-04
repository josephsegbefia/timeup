import React, { useState, useEffect } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
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
          type="email"
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
