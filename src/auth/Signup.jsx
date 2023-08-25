import React from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";

const API_URL = "http://localhost:5005";
class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  onInputChange = ({ name, value }) => {
    const fields = Object.assign({}, this.state.fields);

    fields[name] = value;
    this.setState({ fields });
  };
  render() {
    return (
      <div>
        {" "}
        <Message
          attached
          header="Welcome to our site!"
          content="Fill out the form below to sign-up for a new account"
        />
        <Form className="attached left aligned fluid segment">
          <Form.Group widths="equal">
            <Form.Input
              name="firstName"
              fluid
              label="First Name"
              placeholder="First Name"
              type="text"
              value={this.state.fields.firstName}
              onChange={this.onInputChange}
            />
            <Form.Input
              name="lastName"
              fluid
              label="Last Name"
              placeholder="Last Name"
              type="text"
              value={this.state.fields.lastName}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Input
            name="email"
            label="Email"
            placeholder="Email"
            type="text"
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />
          <Form.Input
            name="password"
            label="Password"
            type="password"
            value={this.state.fields.password}
            onChange={this.onInputChange}
          />
          {/* <Form.Checkbox inline label="I agree to the terms and conditions" /> */}
          <Button type="submit" color="blue">
            Submit
          </Button>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
          Already signed up?&nbsp;<a href="#">Login here</a>&nbsp;instead.
        </Message>
      </div>
    );
  }
}

export default Signup;
