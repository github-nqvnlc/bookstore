import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Badge, IconButton, Stack, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CurrencyFormat from 'react-currency-format';

export default function ImgMediaCard(props) {
  const image64 = new Buffer(props.book.image, "base64").toString("binary");
  return (
    <Badge badgeContent={Math.floor(props.book.discount * 100) + "%"} color="error">
      <Card sx={{ maxWidth: 200 }}>
        <CardMedia
          component="img"
          alt={props.book.name}
          height="200"
          image={image64}
        />
        <CardContent sx={{ padding: "0.5em" }}>
          <Typography
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            gutterBottom variant="subtitle1" component="div">
            {props.book.name}
          </Typography>
          <Stack
            sx={{ width: "100%" }}
            direction={props.book.price <= 1000000 ? "row" : "column"}
            justifyContent={"center"}
            alignItems={props.book.price <= 1000000 ? "center" : "flex-end"}
            spacing={1}
          >
            <Typography
              sx={{
                fontWeight: 600,
              }}
              color="error" gutterBottom variant="h6" component="div">
              <CurrencyFormat
                value={
                  Math.round(
                    (props.book.price - props.book.price * props.book.discount) / 1000
                  ) * 1000
                }
                placeholder="xxx.xxx VND"
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
                renderText={(value) => (
                  <div className="price_discounted">{value}</div>
                )}
              />
            </Typography>
            <Typography
              sx={{
                textDecorationLine: "line-through",
              }}
              gutterBottom variant="caption" component="div">
              <CurrencyFormat
                value={props.book.price}
                placeholder="xxx.xxx VND"
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
                renderText={(value) => (
                  <div
                    style={
                      props.book.discount === 0
                        ? { display: "none" }
                        : { display: "block" }
                    }
                    className="price_main"
                  >
                    {value}
                  </div>
                )}
              />
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ marginTop: 0, paddingTop: 0 }}>
          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-end">
            <Tooltip title="Add to cart">
              <IconButton
                sx={{ margin: 0, }}
                color="success"
                variant="outlined"
                aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add to cart">
              <IconButton
                sx={{ margin: 0, }}
                color="success"
                variant="outlined"
                aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Buy now">
              <Button
                size="small"
                variant="contained"
                color='success'
              >Buy now</Button>
            </Tooltip>
          </Stack>
        </CardActions>
      </Card>
    </Badge>
  );
}
