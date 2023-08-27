import React from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = () => {};
  return (
    <div>
      <Message
        attached
        header="Welcome back to our site!"
        content="Fill out the form below to login into your account"
      />
      <Form
        // onSubmit={onFormSubmit}
        className="attached left aligned fluid segment"
      >
        <Form.Group widths="equal"></Form.Group>
        <Form.Input
          name="email"
          label="Email"
          placeholder="Email"
          type="text"
          // value={email}
          // onChange={handleEmailChange}
        />
        <Form.Input
          name="password"
          label="Password"
          type="password"
          // value={password}
          // onChange={handlePasswordChange}
        />

        {/* <Form.Checkbox inline label="I agree to the terms and conditions" /> */}
        <Button
          type="submit"
          color="blue"
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
