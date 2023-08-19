import React from "react";
import uuid from "react-uuid";
import { newTimer } from "./helpers";
import EditableTimerList from "./components/EditableTimerList";
import ToggleableTimerForm from "./components/ToggleableTimerForm";

class App extends React.Component {
  state = {
    timers: [
      {
        title: "Practice Squat",
        project: "Gym Chores",
        id: uuid(),
        elapsed: 5456099,
        runningSince: Date.now()
      },
      {
        title: "Practice Kung Fu",
        project: "Self Defence Chores",
        id: uuid(),
        elapsed: 9457099,
        runningSince: Date.now()
      }
    ]
  };

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };

  createTimer = (timer) => {
    const t = newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t)
    });
  };
  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList timers={this.state.timers} />
          <ToggleableTimerForm
            // isOpen={true}
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}

export default App;
