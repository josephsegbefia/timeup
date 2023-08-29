import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditableTimer from "./EditableTimer";
import ToggleableTimerForm from "./ToggleableTimerForm";
// import { AuthContext } from "./context/auth.context";

function EditableTimerList(props) {
  const timers = props.timers.map((timer) => (
    <EditableTimer
      key={timer._id}
      id={timer._id}
      title={timer.title}
      project={timer.project}
      elapsed={timer.elapsed}
      runningSince={timer.runningSince}
      onFormSubmit={props.onFormSubmit}
      onTrashClick={props.onTrashClick}
      onStartClick={props.onStartClick}
      onStopClick={props.onStopClick}
    />
  ));

  return (
    <div id="timers">
      {timers} <ToggleableTimerForm onFormSubmit={props.onCreateFormSubmit} />
    </div>
  );
}

export default EditableTimerList;
