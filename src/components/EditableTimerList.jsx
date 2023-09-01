import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditableTimer from "./EditableTimer";
import ToggleableTimerForm from "./ToggleableTimerForm";
import { Grid } from "semantic-ui-react";

function EditableTimerList(props) {
  const timers = props.timers.map((timer, index) => (
    <Grid.Column key={timer._id} mobile={32} tablet={32} computer={8}>
      <EditableTimer
        key={index}
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
    </Grid.Column>
  ));

  return (
    <div id="timers">
      <Grid>
        {/* Use a 4-column grid, doubling means it will automatically wrap to the next row on smaller screens */}
        {timers}
      </Grid>
      <ToggleableTimerForm onFormSubmit={props.onCreateFormSubmit} />
    </div>
  );
}

export default EditableTimerList;
