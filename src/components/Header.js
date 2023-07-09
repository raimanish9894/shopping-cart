import React from "react";
import {
  Badge,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
  Button
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    filterDispatch
  } = CartState();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80, padding: 10 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">MR Mobile Store</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: "20vw" }}
            placeholder="...search product"
            className="m-auto"
            onChange={(e) => filterDispatch({
              type: "FILTER_BY_SEARCH",
              payload: e.target.value
            })}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle>
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((c) => {
                    return(
                        <span className="cartitem" key={c.id}>
                      <img
                        src={c.imageUrl}
                        alt={c.productName}
                        className="cartItemImg"
                      />
                      <div className="cartItemDetail">
                        <span>{c.productName}</span>
                        <span>₹ {c.productPrice}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: c,
                          })
                        }
                      />
                    </span>
                    )
                  })}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
