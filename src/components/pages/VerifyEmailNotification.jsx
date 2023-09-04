import React from "react";
import { Link } from "react-router-dom";
import { Message, Button } from "semantic-ui-react";
const VerifyEmailNotification = () => {
  return (
    <div>
      <Message warning>
        <p>
          A verification email has been sent to your email. Please verify your
          account, and then sign in to use the app
        </p>
        <Link to="/login">
          <Button positive>Login</Button>
        </Link>
      </Message>
    </div>
  );
};

export default VerifyEmailNotification;
