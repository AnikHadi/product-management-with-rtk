import React from "react";
import HomePageHeader from "../HomePage/HomePageHeader";
import ProductList from "../HomePage/ProductList";

const Home = () => {
  return (
    <div>
      <HomePageHeader />
      <hr className="my-4" />
      <ProductList />
      <br />
      <hr />
    </div>
  );
};

export default Home;
