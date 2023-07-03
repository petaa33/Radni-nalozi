import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Input,
} from "reactstrap";
import { useWarrant } from "../context/WarrantContext";

const BaseDropdown = ({ index, assetKey, useInput, disabled }) => {
  const { setWarrant, assets, isLoading } = useWarrant();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("Click");
  const [searchInput, setSearchInput] = useState("");
  const [itemsArr, setItemsArr] = useState([]);

  const loadItems = async () => {
    const newItems = await assets[index].filter((item) => {
      return item.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    setItemsArr(newItems);
  };

  useEffect(() => {
    if (!isLoading) {
      loadItems();
    }

    return () => {
      setItemsArr([]);
    };
  }, [searchInput, isLoading]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleClick = (item) => {
    setPlaceholder(`${item.id} - ${item.name}`);

    switch (index) {
      case 0:
        return setWarrant((prevState) => ({
          ...prevState,
          [assetKey]: {
            id: item.id,
            name: item.name,
            location: item.location,
          },
        }));
      case 1:
        return setWarrant((prevState) => ({
          ...prevState,
          [assetKey]: {
            id: item.id,
            name: item.name,
            measure: item.measure,
          },
        }));
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} disabled={disabled}>
        <DropdownToggle
          caret
          style={{
            background: "transparent",
            color: "#14C38E",
            borderBottom: "2px solid #14C38E",
            borderLeft: "none",
            borderTop: "none",
            borderRight: "none",
          }}
        >
          {placeholder}
        </DropdownToggle>
        <DropdownMenu
          style={{
            backgroundColor: "#14C38E",
            maxHeight: "400px",
            overflow: "hidden",
            overflowY: "visible",
            zIndex: 5,
          }}
        >
          {!isLoading && itemsArr.map((item) => {
            return (
              <DropdownItem
                key={item.id}
                onClick={() => handleClick(item)}
                style={{ color: "white" }}
              >
                {item.id} - {item.name} {item.measure && "- " + item.measure}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>

      {useInput && (
        <FormGroup>
          <Input
            placeholder="Traži ime materijala"
            type="text"
            style={{ marginLeft: "5px" }}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setDropdownOpen(true);
            }}
          />
        </FormGroup>
      )}
    </div>
  );
};

export default BaseDropdown;
