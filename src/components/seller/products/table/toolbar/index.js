import {
  Box,
  Button,
  FormControl,
  InputBase,
  Menu,
  MenuItem,
  Select,
  Toolbar,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { STATUS, STATUSES } from "constants/index";
import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { MenuProps, useToolbarStyles } from "./styles";

export default function TableToolbar(props) {
  const {
    searched = "",
    setSearched,
    status = STATUS,
    keyUp,
    cancelSearch,
    handleChangeDropdown,
    handleExportResources,
    handleSettingsDialog,
  } = props;
  const classes = useToolbarStyles();

  // handle menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const { categoryName } = useParams();

  return (
    <Toolbar className={classes.root}>
      <Box className={classes.leftToolbar}>
        <SearchBar
          value={searched}
          className={classes.searchbar}
          onCancelSearch={cancelSearch}
          onKeyUp={keyUp}
          onChange={(newValue) => setSearched(newValue)}
        />
        <FormControl variant="outlined" className={classes.selectInput}>
          <Select
            value={status}
            name={"status"}
            displayEmpty
            MenuProps={MenuProps}
            input={<InputBase classes={{ input: classes.input }} />}
            onChange={handleChangeDropdown}
          >
            {STATUSES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button
          onClick={handleClick}
          variant="outlined"
          endIcon={<ArrowDropDownIcon />}
          className={classes.moreBtn}
        >
          More
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          elevation={5}
        >
          <MenuItem>
            <Button
              component="span"
              onClick={() => {
                handleSettingsDialog();
                handleClose();
              }}
            >
              Settings
            </Button>
          </MenuItem>

          <MenuItem>
            <Button component="span" onClick={handleExportResources}>
              Export
            </Button>
          </MenuItem>
        </Menu>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => history.push(`/shop/add-product/${categoryName}`)}
        >
          New Product
        </Button>
      </Box>
    </Toolbar>
  );
}
