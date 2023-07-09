import React from "react";
import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import Filter from "./Filter";
import "./style.css";

const Home = () => {
  const {
    state: { products },
    filterState: { byStock, byFastDelivery, byRating, sort, searchQuery},
  } = CartState();

  //  console.log(products);

  const transformItem = () => {
    let sortedProducts = products;

    if(sort){
      sortedProducts = sortedProducts.sort((a,b) => (
        sort === "lowToHigh" ? (a.productPrice-b.productPrice) : (b.productPrice-a.productPrice)
      ))
    }

    if(!byStock){
      sortedProducts = sortedProducts.filter((item) => item.inStock);
    }

    if(byFastDelivery){
      sortedProducts = sortedProducts.filter((item) => item.fastDelivery);
    }

    if(byRating){
      sortedProducts = sortedProducts.filter((item) => item.rating >= byRating);
    }

    if(searchQuery){
      sortedProducts = sortedProducts.filter((item) => item.productName.toLowerCase().includes(searchQuery));
    }


    return sortedProducts;
  }

  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {transformItem().map((item) => {
          return <SingleProduct key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
