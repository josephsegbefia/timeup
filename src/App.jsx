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
import IsPrivate from "./components/IsPrivate";
import { AuthContext } from "./context/auth.context";
import { Grid, Image } from "semantic-ui-react";

import axios from "axios";

const API_URL = "http://localhost:5005";

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
    // console.log("Expectation:", requestBody);

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

    setTimers([...timers, t]);
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
    setTimers((prevTimers) => prevTimers.filter((t) => t.id !== timerId));
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
  }, [user]);

  console.log(timers);
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

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { newTimer, generateUniqueId } from "./helpers";
// import EditableTimerList from "./components/EditableTimerList";
// import ToggleableTimerForm from "./components/ToggleableTimerForm";
// import { getTimers } from "./client";
// import HeaderMenu from "./components/HeaderMenu";
// import Home from "./components/Home";
// import Login from "./auth/Login";
// import Signup from "./auth/Signup";
// import IsPrivate from "./components/IsPrivate";

// class App extends React.Component {
//   state = {
//     timers: [
//       {
//         title: "Practice squat",
//         project: "Gym Chores",
//         id: generateUniqueId(),
//         elapsed: 5456099,
//         runningSince: Date.now()
//       },
//       {
//         title: "Bake squash",
//         project: "Kitchen Chores",
//         id: generateUniqueId(),
//         elapsed: 1273998,
//         runningSince: null
//       }
//     ]
//   };

//   handleCreateFormSubmit = (timer) => {
//     this.createTimer(timer);
//   };

//   handleEditFormSubmit = (attrs) => {
//     this.updateTimer(attrs);
//   };

//   handleTrashClick = (timerId) => {
//     this.deleteTimer(timerId);
//   };
//   createTimer = (timer) => {
//     const t = newTimer(timer);
//     this.setState({
//       timers: this.state.timers.concat(t)
//     });
//   };

//   handleStartClick = (timerId) => {
//     this.startTimer(timerId);
//   };

//   handleStopClick = (timerId) => {
//     this.stopTimer(timerId);
//   };

//   startTimer = (timerId) => {
//     const now = Date.now();

//     this.setState({
//       timers: this.state.timers.map((timer) => {
//         if (timer.id === timerId) {
//           return Object.assign({}, timer, {
//             runningSince: now
//           });
//         } else {
//           return timer;
//         }
//       })
//     });
//   };

//   stopTimer = (timerId) => {
//     const now = Date.now();

//     this.setState({
//       timers: this.state.timers.map((timer) => {
//         if (timer.id === timerId) {
//           const lastElapsed = now - timer.runningSince;
//           return Object.assign({}, timer, {
//             elapsed: timer.elapsed + lastElapsed,
//             runningSince: null
//           });
//         } else {
//           return timer;
//         }
//       })
//     });
//   };

//   updateTimer = (attrs) => {
//     this.setState({
//       timers: this.state.timers.map((timer) => {
//         if (timer.id === attrs.id) {
//           return Object.assign({}, timer, {
//             title: attrs.title,
//             project: attrs.project
//           });
//         } else {
//           return timer;
//         }
//       })
//     });
//   };

//   deleteTimer = (timerId) => {
//     this.setState({
//       timers: this.state.timers.filter((t) => t.id !== timerId)
//     });
//   };
//   render() {
//     return (
//       <div>
//         <HeaderMenu />
//         <br />
//         <br />
//         <div className="ui column centered grid">
//           <div className="column"></div>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/timers"
//               element={
//                 <IsPrivate>
//                   <EditableTimerList
//                     timers={this.state.timers}
//                     onFormSubmit={this.handleEditFormSubmit}
//                     onTrashClick={this.handleTrashClick}
//                     onStartClick={this.handleStartClick}
//                     onStopClick={this.handleStopClick}
//                     onCreateFormSubmit={this.handleCreateFormSubmit}
//                   />
//                 </IsPrivate>
//               }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             {/* <Route
//               path="/timers"
//               element={
//                 <ToggleableTimerForm
//                   // isOpen={true}
//                   onFormSubmit={this.handleCreateFormSubmit}
//                 />
//               }
//             /> */}
//           </Routes>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
