import React from "react";
import { Input, Menu, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HeaderMenu() {
  const [activeItem, setActiveItem] = useState("");

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu secondary>
      <Menu.Item
        as={NavLink}
        to="/"
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      {!isLoggedIn && (
        <>
          <Menu.Item
            as={NavLink}
            to="/login"
            name="log in"
            active={activeItem === "log in"}
            onClick={handleItemClick}
          />

          <Menu.Item
            as={NavLink}
            to="/signup"
            name="sign up"
            active={activeItem === "sign up"}
            onClick={handleItemClick}
          />
        </>
      )}

      {isLoggedIn && (
        <>
          <Menu.Item
            as={NavLink}
            to="/timers"
            name="timers"
            active={activeItem === "timers"}
            onClick={handleItemClick}
          />

          <Menu.Menu position="right ">
            {user && (
              <Menu.Item
                name={`${user.firstName} ${user.lastName}`}
                style={{ color: "green" }}
              />
            )}
            <Menu.Item
              name="log out"
              active={activeItem === "log out"}
              onClick={logOutUser}
            />
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
}
// class HeaderMenu extends React.Component {
//   state = { activeItem: "home" };

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name });

//   render() {
//     const { activeItem } = this.state;

//     return (
//       <Menu secondary>
//         <Menu.Item
//           as={NavLink}
//           to="/"
//           name="home"
//           active={activeItem === "home"}
//           onClick={this.handleItemClick}
//         />

//         <Menu.Item
//           as={NavLink}
//           to="/login"
//           name="log in"
//           active={activeItem === "log in"}
//           onClick={this.handleItemClick}
//         />

//         <Menu.Item
//           as={NavLink}
//           to="/signup"
//           name="sign up"
//           active={activeItem === "sign up"}
//           onClick={this.handleItemClick}
//         />

//         <Menu.Menu position="right">
//           {/* <Menu.Item>
//             <Input icon="search" placeholder="Search..." />
//           </Menu.Item> */}
//           <Menu.Item
//             name="logout"
//             active={activeItem === "logout"}
//             onClick={this.handleItemClick}
//           />
//         </Menu.Menu>
//       </Menu>
//     );
//   }
// }

export default HeaderMenu;
