import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import ScrollAnimation from 'react-animate-on-scroll';

const ProductElement = ({ id, title, image, rating, price, brandName }) => {
  const product = {
    id, title, image, rating, price, brandName, amount: 1
  };
  return (
    <div className="max-w-2xl animate__animated animate__bounceInLeft">
      <div className="shadow-md rounded-lg max-w-sm bg-base-100">
        <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            className="rounded-t-lg p-8"
            // src={`https://${image}`}
            // src={`https://bagruhastkala.com/cdn/shop/files/IMG-20231209-WA0148.jpg?v=1702108028&width=1080`}
            src={`https://bagruhastkala.com/cdn/shop/files/IMG-20231209-WA0080.jpg?v=1702109217&width=720`}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
            <h3 className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
              {title}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-accent-content">₹{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
