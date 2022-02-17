import { Box, Button, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Detail from "components/user/orderDetail";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getOrder } from "redux/orderRedux";
import { orderSelector } from "redux/selectors";
import { useStyles } from "./styles";

export default function OrderDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);
  const { order } = useSelector(orderSelector);
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <ShoppingCartIcon className={classes.icon} />
          <Typography className={classes.title}>Order Details</Typography>
        </Box>
        <Link to={"/orders"}>
          <Button color="primary" variant="outlined">
            Back to Order List
          </Button>
        </Link>
      </Box>
      <Box>
        <Detail />
      </Box>
    </div>
  );
}
