import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { alpha, lighten, makeStyles } from "@material-ui/core/styles";

import DeleteIcon from "@material-ui/icons/Delete";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import { LoadingTable } from "components/common/LoadingTable";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cartSelector } from "redux/selectors";
import { getCartItemsShop, getOrderPrice } from "utils/helpers";
import CartItem from "./cartItem";

const headCells = [
  { id: "version", numeric: true, disablePadding: false, label: "" },
  { id: "price", numeric: true, disablePadding: false, label: "" },
  { id: "carbs", numeric: true, disablePadding: false, label: "" },
  { id: "total", numeric: true, disablePadding: false, label: "" },
];

function EnhancedTableHead(props) {
  const {
    id,
    name,
    classes,
    onSelectAllClick,
    numSelected,
    rowCount,
    isLoading,
  } = props;

  return isLoading ? (
    <>
      <TableRow height={70}>
        <TableCell width={"5%"} key={"000"}>
          <Skeleton />
        </TableCell>
        <TableCell width={"35%"} key={"00"}>
          <Skeleton />
        </TableCell>
        <TableCell width={"15%"} key={"11"}>
          <Skeleton />
        </TableCell>
        <TableCell width={"10%"} key={"22"}>
          <Skeleton />
        </TableCell>
        <TableCell width={"20%"} key={"33"}>
          <Skeleton />
        </TableCell>
        <TableCell width={"10%"} key={"44"}>
          <Skeleton />
        </TableCell>
      </TableRow>
    </>
  ) : (
    <TableHead className={classes.row}>
      <TableRow>
        <TableCell align="center" width="5%">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        <TableCell key={"1"} align={"left"} width={"35%"}>
          <Box display="flex" alignItems="center">
            <StorefrontIcon style={{ marginRight: 16 }} />
            {name}
          </Box>
        </TableCell>

        <TableCell width={"15%"} key={"11"}></TableCell>
        <TableCell width={"10%"} key={"22"}></TableCell>
        <TableCell width={"20%"} key={"33"}></TableCell>
        <TableCell width={"10%"} key={"44"}></TableCell>
        <TableCell width={"5%"} key={"55"}></TableCell>
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    marginRight: 16,
    marginLeft: 16,
    color: "rgb(210, 63, 87)",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { id, numSelected, data, selected } = props;
  console.log(id);
  const history = useHistory();
  console.log(data);
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          style={{ width: "100%" }}
        >
          <Box display="flex" alignItems="center">
            <Typography color="inherit" variant="subtitle1">
              Total {numSelected} items:
            </Typography>
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
            >
              {getOrderPrice(data, selected)} VND
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                id &&
                history.push({
                  pathname: `/checkout`,
                  state: {
                    shopId: id,
                  },
                })
              }
            >
              Check Out
            </Button>
          </Box>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <></>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },

  row: {
    "& .MuiTableCell-root": {
      // padding: "8px 0px",
    },
  },
  tableRowRoot: {
    "&$tableRowSelected, &$tableRowSelected:hover": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      ),
    },
  },
  tableRowSelected: {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  },

  qtyBtn: {
    minWidth: 20,
    padding: 5,
  },

  price: {
    color: "rgb(210, 63, 87)",
  },
}));

export default function EnhancedTable(props) {
  const { item } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(getCartItemsShop(item.products));
  }, [item]);
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const { isLoading } = useSelector(cartSelector);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data?.map((n) => n.version.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {selected.length > 0 && (
          <EnhancedTableToolbar
            id={item.id}
            numSelected={selected.length}
            data={data}
            selected={selected}
          />
        )}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              name={item?.name}
              id={item?.id}
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
              isLoading={isLoading}
            />

            <TableBody className={classes.row}>
              {isLoading ? (
                <LoadingTable colsNumber={6} />
              ) : (
                data?.map((row, index) => {
                  const isItemSelected = isSelected(row.version.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <CartItem
                      key={index}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      classes={classes}
                      handleClick={handleClick}
                      row={row}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
