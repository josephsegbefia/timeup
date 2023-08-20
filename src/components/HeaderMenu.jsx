import React from "react";
import { Input, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
class HeaderMenu extends React.Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item
          as={NavLink}
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          as={NavLink}
          to="/login"
          name="log in"
          active={activeItem === "log in"}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          as={NavLink}
          to="/signup"
          name="sign up"
          active={activeItem === "sign up"}
          onClick={this.handleItemClick}
        />

        <Menu.Menu position="right">
          {/* <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item> */}
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default HeaderMenu;
