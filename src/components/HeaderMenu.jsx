import React from "react";
import { Input, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
class HeaderMenu extends React.Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Link to="/">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
        </Link>

        <Link to="/login">
          <Menu.Item
            name="log in"
            active={activeItem === "log in"}
            onClick={this.handleItemClick}
          />
        </Link>

        <Link to="/signup">
          <Menu.Item
            name="sign up"
            active={activeItem === "sign up"}
            onClick={this.handleItemClick}
          />
        </Link>

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
