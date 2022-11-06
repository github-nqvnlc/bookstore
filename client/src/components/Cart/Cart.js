import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../store/actions";
import Drawer from '@mui/material/Drawer';
import { Button, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CounterInput from "react-counter-input";
import { NumericFormat } from 'react-number-format';
import FlatList from 'flatlist-react';
import CartItem from './CartItem';

const Cart = (props) => {
  const [deliveryOption, setDeliveryOption] = React.useState();

  let TotalCart = 0;
  let TransportFee = 10000;
  let VAT = 5000;
  Object.keys(props.Carts).forEach(function (item) {
    TotalCart += props.Carts[item].quantity * (Math.round((props.Carts[item].price - props.Carts[item].price * props.Carts[item].discount) / 1000) * 1000) + TransportFee + VAT;
  });
  function TotalPrice(price, tonggia) {
    return (price * tonggia)
  }
  return (
    <Drawer
      anchor={"right"}
      open={props.isOpen}
      onClose={() => props.isClose()}
    >
      <Box
        sx={{
          minWidth: "300px",
          width: { sm: "500px", xs: "100vw" },
        }}
      >
        <Stack
          sx={{
            p: { sm: "1em", xs: "0.5em" },
          }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" color="success">Your cart</Typography>
          <IconButton onClick={() => props.isClose()} size="large" color="success">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />

        <Box
          sx={{
            width: "100%",
          }}
        >
          <List sx={{ height: "50vh" }}>
            {props.Carts?.map((item, index) => {
              let priceDiscounted = Math.round((item.price - item.price * item.discount) / 1000) * 1000;
              let priceMain = Math.round(item.price)
              return (
                <CartItem
                  key={index}
                  book={item}
                  priceMain={TotalPrice(priceMain, item.quantity)}
                  priceDiscounted={TotalPrice(priceDiscounted, item.quantity)}
                  deleteCart={() => props.DeleteCart(item)}
                  increase={() => props.IncreaseQuantity(index)}
                  decrease={() => props.DecreaseQuantity(index)}
                />
              )
            })}
          </List>
        </Box>

        <Box sx={{
          width: "100%",
          p: { sm: "1em", xs: "0.5em" },
          position: "absolute",
          bottom: 0,
          right: 0,
        }}>
          <Divider sx={{ mb: "1em" }} />
          <Box sx={{ width: "100%", mb: "1em", }}>
            <Stack sx={{ width: "100%", }} direction="row" justifyContent="space-between" spacing={1} alignItems={{ sm: "flex-end", xs: "flex-end" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  
                }}
              >
                Delivery options:
              </Typography>
              <FormControl disabled={props.numberCart > 0 ? false : true} size="small" color='success' sx={{ m: 1, width: "200px", heigh: "20px" }}>
                <InputLabel sx={{fontSize: "14px"}} id="demo-simple-select-standard-label">Options</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={props.numberCart > 0 ? 0 : deliveryOption}
                  onChange={(event) => { setDeliveryOption(event.target.value) }}
                  label="Options"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>


          <Stack sx={{ width: "100%", }} direction="row" justifyContent="space-between"  spacing={1} alignItems={{ sm: "center", xs: "flex-end" }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400
              }}
            >
              Transport fee:
            </Typography>
            <NumericFormat
              value={props.numberCart > 0 ? TransportFee : 0 }
              thousandsGroupStyle="thousands"
              thousandSeparator=","
              suffix={" VND"}
              displayType="text"
              renderText={(value) => (
                <Typography
                  color="error"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400
                  }}
                >
                  {value}
                </Typography>
              )}
            />
          </Stack>
          <Stack sx={{ width: "100%", }} direction="row" justifyContent="space-between"  spacing={1} alignItems={{ sm: "center", xs: "flex-end" }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400
              }}
            >
              VAT:
            </Typography>
            <NumericFormat
              value={props.numberCart > 0 ? VAT : 0 }
              thousandsGroupStyle="thousands"
              thousandSeparator=","
              suffix={" VND"}
              displayType="text"
              renderText={(value) => (
                <Typography
                  color="error"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400
                  }}
                >
                  {value}
                </Typography>
              )}
            />
          </Stack>
          <Stack sx={{ width: "100%", mb: "2em" }} direction={{ sm: "row", xs: "column" }} justifyContent="space-between" alignItems={{ sm: "center", xs: "flex-end" }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                mt: "1em",
                textTransform: "uppercase",
              }}
            >
              Total to pay
            </Typography>
            <NumericFormat
              value={TotalCart}
              thousandsGroupStyle="thousands"
              thousandSeparator=","
              suffix={" VND"}
              displayType="text"
              renderText={(value) => (
                <Typography
                  color="error"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700
                  }}
                >
                  {value}
                </Typography>
              )}
            />
          </Stack>

          <Stack
            sx={{
              width: "100%",
            }}
            direction="row"
            justifyContent="flex-end"
            alignItem="flex-end"
          >
            <Button
              sx={{
                width: "200px"
              }}
              color="success" variant="contained"
              disabled={props.numberCart > 0 ? false : true}
            >
              Payment
            </Button>
          </Stack>

        </Box>
      </Box>
    </Drawer>
  )
}


const mapStateToProps = (state) => ({
  Carts: state.cart.Carts,
  numberCart: state.cart.numberCart,
})

const mapDispatchToProps = (dispatch) => {
  return {
    removeToCart: (book) => dispatch(actions.removeToCart(book)),
    IncreaseQuantity: (book) => dispatch(actions.IncreaseQuantity(book)),
    DecreaseQuantity: (book) => dispatch(actions.DecreaseQuantity(book)),
    DeleteCart: (book) => dispatch(actions.DeleteCart(book)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)