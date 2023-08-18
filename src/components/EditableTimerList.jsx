import React from "react";
import EditableTimer from "./EditableTimer";

class EditableTimerList extends React.Component {
  render() {
    return (
      <div id="timers">
        <EditableTimer
          title="Learn React"
          project="Web Domination"
          elapsed="8986300"
          runningSince={null}
          editFormOpen={false}
        />
        <EditableTimer
          title="Learn Express"
          project="Web Domination"
          elapsed="8986323"
          runningSince={null}
          editFormOpen={true}
        />
      </div>
    );
  }
}

export default EditableTimerList;
