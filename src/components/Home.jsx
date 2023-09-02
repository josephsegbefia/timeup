import React from "react";
import { Message, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome to the App</h2>
        <Message>
          <Message.Header>App Features</Message.Header>
          <p>
            This is a simple web application built with ReactJS, ExpressJS,
            NodeJS, & MongoDB to help you keep track of how much time u spend on
            an activity. Styled with semantic-ui.
          </p>
          <br />
          <Message.List>
            <Message.Item>Sign Up for a user account</Message.Item>
            <Message.Item>Log in to existing accounts</Message.Item>
            <Message.Item>Create a timer</Message.Item>
            <Message.Item>Update a timer</Message.Item>
            <Message.Item>Edit a timer</Message.Item>
            <Message.Item>Delete a timer</Message.Item>
          </Message.List>
        </Message>

        <Link to="/login">
          <Button animated positive>
            <Button.Content visible>Log In</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Link>

        <Link to="/signup">
          <Button animated positive>
            <Button.Content visible>Sign Up</Button.Content>
            <Button.Content hidden>
              <Icon name="signup" />
            </Button.Content>
          </Button>
        </Link>
      </div>
    );
  }
}

export default Home;
