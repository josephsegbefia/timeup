import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = "http://localhost:5005";
const PasswordResetForm = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const passwordResetToken = searchParams.get("passwordResetToken");
  const checkFields = () => {
    if (!password || !passwordConfirm || password !== passwordConfirm) {
      return true;
    }
    return false;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { passwordResetToken, password };
    axios
      .post(`${API_URL}/auth/password-reset`, requestBody)
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        // toast.error(error.response.error.messag);
        // console.log(error.response.data.message);
        setError(true);
        toast.error(error.response.data.message);
      });

    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <div>
      <Message
        attached
        header="Password Reset"
        content="Provide new matching passwords"
      />
      <ToastContainer />
      <Form
        onSubmit={onFormSubmit}
        className="attached left aligned fluid segment"
      >
        <Form.Input
          name="password"
          label="Brand New Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Form.Input
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          value={passwordConfirm}
          placeholder="Make sure passwords match to activate submit button"
          onChange={handlePasswordConfirmChange}
        />

        <Button
          type="submit"
          color="blue"
          disabled={checkFields()}
          // disabled={checkFields()}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PasswordResetForm;
