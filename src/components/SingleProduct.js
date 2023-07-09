import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const SingleProduct = ({ item }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  console.log(cart);

  return (
    <div className="products">
      <Card>
        <Card.Img
          variant="top"
          src={item.imageUrl}
          alt={item.productName}
          style={{ width: "100%", height: "300px" }}
        />
        <Card.Body>
          <Card.Title>{item.productName}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {item.productPrice}</span>
            {item.fastDelivery ? (
              <div>1 Day Delivery</div>
            ) : (
              <div>4 Day Delivery</div>
            )}
            <Rating rating={item.rating} />
            <span >
            {cart.some((p) => p.id === item.id) ? (
              <Button onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item,
                  });
                }} variant="danger">Remove from Cart</Button>
            ) : (
              <Button
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: item,
                  });
                }}
                disabled={!item.inStock}
              >
                {!item.inStock ? "Out of Stock" : "Add to Cart"}
              </Button>
            )}
            </span>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
