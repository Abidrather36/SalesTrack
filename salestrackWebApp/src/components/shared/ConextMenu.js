import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Margin } from "@mui/icons-material";

const ThreeDotMenu = ({ options, handleEdit, handleDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "blue" }} 
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.title}
            onClick={() => {
              if (option.title === "Edit") {
                handleEdit(); 
              } else if (option.title === "Delete") {
                handleDelete(); 
              }
              handleClose();
            }}
          >
          <div style={{marginRight:"10px"}}>
          {option.icon} 

          </div>
            {option.title} 
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ThreeDotMenu;
