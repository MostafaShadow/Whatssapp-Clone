import React from "react";
import { useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";

export default function SimpleMenus() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
      style={{zIndex:999999}}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Contact info</MenuItem>
        <MenuItem onClick={handleClose}>Select message</MenuItem>
        <MenuItem onClick={handleClose}>Mute notifications</MenuItem>
        <MenuItem onClick={handleClose}>Clear message</MenuItem>
        <MenuItem onClick={handleClose}>Delete chat</MenuItem>
      </Menu>
    </>
  );
}


