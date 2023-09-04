import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { newTimer, generateUniqueId } from "./helpers";
import EditableTimerList from "./components/EditableTimerList";
import ToggleableTimerForm from "./components/ToggleableTimerForm";
import { getTimers } from "./client";
import HeaderMenu from "./components/HeaderMenu";
import Home from "./components/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import VerifyEmailNotification from "./components/pages/VerifyEmailNotification";
import IsPrivate from "./components/IsPrivate";
import { AuthContext } from "./context/auth.context";
import { Grid, Image } from "semantic-ui-react";

import axios from "axios";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";
import PasswordResetForm from "./auth/PasswordResetForm";

const API_URL = "https://timeapp-w9z5.onrender.com";

function App() {
  const [timers, setTimers] = useState([]);
  const [rerender, setRerender] = useState(false);

  const { user } = useContext(AuthContext);
  let { userId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  let user_id;
  if (user) {
    user_id = user._id;
    console.log("What I want to see:", user_id);
  }

  const navigate = useNavigate();

  const createTimer = (timer) => {
    const t = newTimer(timer);
    // setTimers([...timers, t]);

    const requestBody = { user, title: t.title, project: t.project };

    axios
      .post(`${API_URL}/api/timers`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // setTimers([...timers, t]);
    // setRerender(!rerender);

    axios
      .get(`${API_URL}/api/${userId}/timers`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        console.log(response.data);
        setTimers(response.data);
        // setRerender(!rerender);
      })
      .catch((error) => {
        console.log(error);
      });
    setRerender(!rerender);
  };

  const updateTimer = (attrs) => {
    let timerId = attrs.id;
    console.log("TimerId", timerId);
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer._id === attrs.id
          ? { ...timer, title: attrs.title, project: attrs.project }
          : timer
      )
    );

    axios
      .post(
        `${API_URL}/api/${user_id}/timers/${timerId}/edit`,
        { title: attrs.title, project: attrs.project },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTimer = (timerId) => {
    axios
      .delete(`${API_URL}/api/timers/${timerId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}` // Include your authentication token if needed
        }
      })
      .then((response) => {
        // Handle success, e.g., remove the deleted timer from the UI
        console.log("Timer deleted successfully", response.data);
        // You may want to update your component state or UI here
        // Example: remove the deleted timer from a list of timers
        const updatedTimers = timers.filter((timer) => timer._id !== timerId);
        setTimers(updatedTimers);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message to the user
        console.error("Error deleting timer:", error);
      });
  };

  const startTimer = (timerId) => {
    const now = Date.now();
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer._id === timerId ? { ...timer, runningSince: now } : timer
      )
    );
    axios
      .post(
        `${API_URL}/api/users/${user_id}/timers/${timerId}/start`,
        {
          start: now
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stopTimer = (timerId) => {
    const now = Date.now();
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer._id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null
          });
        } else {
          return timer;
        }
      })
    );

    axios
      .post(
        `${API_URL}/api/users/${user_id}/timers/${timerId}/stop`,
        { stop: now },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (user) {
    userId = user._id;
    console.log(userId);
  }
  const getAllTimers = () => {
    if (user) {
      axios
        .get(`${API_URL}/api/${userId}/timers`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
          console.log(response.data);
          setTimers(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("/");
        });
    }
  };

  useEffect(() => {
    getAllTimers();
  }, [user, rerender]);

  // console.log(timers);
  return (
    <div>
      <HeaderMenu />
      <br />
      <br />
      <div className="ui column centered grid">
        <div className="column"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path={"/:userId/timers"}
            element={
              <IsPrivate>
                <EditableTimerList
                  timers={timers}
                  onFormSubmit={updateTimer}
                  onTrashClick={deleteTimer}
                  onStartClick={startTimer}
                  onStopClick={stopTimer}
                  onCreateFormSubmit={createTimer}
                />
              </IsPrivate>
            }
          />
          <Route
            path="/verification-notification"
            element={<VerifyEmailNotification />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/password-reset" element={<PasswordResetForm />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route
            path="/timers"
            element={
              <ToggleableTimerForm
                // isOpen={true}
                onFormSubmit={handleCreateFormSubmit}
              />
            }
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
