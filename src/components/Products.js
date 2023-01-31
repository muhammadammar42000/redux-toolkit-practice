import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../api/axios";
import { add } from "../store/cartSlice";
import { fetchProducts, STATUSES } from "../store/productSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  // const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());

    // const fetchProducts = async () => {
    //   try {
    //     const res = await instance.get("products");
    //     const data = await res.data;
    //     setProducts(data);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

    // fetchProducts();
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading ...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something Went Wrong ... :( </h2>
  }
  return (
    <div className="productsWrapper">
      {products?.map((product) => {
        return (
          <div className="card" key={product.id}>
            <img src={product.image} alt="product image" />
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
            <button onClick={() => handleAdd(product)} className="btn">
              Add to cart
            </button>
          </div>
        );
      })}
    </div>
  );
}
