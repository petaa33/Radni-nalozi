import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const BaseUnitDropdown = ({ setUnit }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleItem = (name) => {
    setUnit(name);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        style={{
          background: "transparent",
          color: "indigo",
          borderBottom: "2px solid indigo",
          borderLeft: "none",
          borderTop: "none",
          borderRight: "none",
        }}
      >
        Mj. jedinice
      </DropdownToggle>
      <DropdownMenu
        style={{
          backgroundColor: "indigo",
          color: "white",
          maxHeight: "400px",
          overflow: "hidden",
          overflowY: "visible",
          zIndex: 5,
        }}
      >
        <DropdownItem style={{color: "white"}} onClick={() => handleItem("m")}>m</DropdownItem>
        <DropdownItem style={{color: "white"}} onClick={() => handleItem("m2")}>m2</DropdownItem>
        <DropdownItem style={{color: "white"}} onClick={() => handleItem("m3")}>m3</DropdownItem>
        <DropdownItem style={{color: "white"}} onClick={() => handleItem("kom")}>kom</DropdownItem>
        <DropdownItem style={{color: "white"}} onClick={() => handleItem("kg")}>kg</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default BaseUnitDropdown;
