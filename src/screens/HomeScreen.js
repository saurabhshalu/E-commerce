import React from "react";
import Product from "../components/Product";

const products = [
  { id: 1, name: "Item1", description: "this is item 1", price: 110 },
  { id: 2, name: "Item2", description: "this is item 2", price: 105 },
  { id: 3, name: "Item3", description: "this is item 3", price: 101 },
  { id: 4, name: "Item4", description: "this is item 4", price: 100 },
  { id: 5, name: "Item5", description: "this is item 5", price: 110 },
  { id: 6, name: "Item6", description: "this is item 6", price: 105 },
  { id: 7, name: "Item7", description: "this is item 7", price: 101 },
  { id: 8, name: "Item8", description: "this is item 8", price: 100 },
  { id: 9, name: "Item9", description: "this is item 9", price: 110 },
  { id: 10, name: "Item10", description: "this is item 10", price: 105 },
  { id: 11, name: "Item11", description: "this is item 11", price: 101 },
  { id: 12, name: "Item12", description: "this is item 12", price: 100 },
];

const HomeScreen = () => {
  return (
    <div>
      <h1>Latest Products</h1>
      <div className="flex flex-wrap justify-around">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
