import React, { useState } from "react";

function TimerForm(props) {
  const [title, setTitle] = useState(props.title || "");
  const [project, setProject] = useState(props.project || "");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleProjectChange = (e) => {
    setProject(e.target.value);
  };

  const handleSubmit = () => {
    props.onFormSubmit({
      id: props.id,
      title: title,
      project: project
    });
  };

  const submitText = props.id ? "Update" : "Create";

  return (
    <div className="ui centered card">
      <div className="content">
        <div className="ui form">
          <div className="field">
            <label>Title</label>
            <input type="text" value={title} onChange={handleTitleChange} />
          </div>
          <div className="field">
            <label>Project</label>
            <input type="text" value={project} onChange={handleProjectChange} />
          </div>
          <div className="ui two bottom attached buttons">
            <button className="ui basic blue button" onClick={handleSubmit}>
              {submitText}
            </button>
            <div className="ui basic red button" onClick={props.onFormClose}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerForm;
