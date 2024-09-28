import axios from "axios";
import React, { useState } from "react";
import {
  QuantityInput,
  SectionTitle,
  SelectSize,
  SingleProductRating,
  SingleProductReviews,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

import { Link, useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  updateWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { store } from "../store";
import Helper from "../lip/Helper";
import ApiUrl from "../lip/ApiUrl";

export const singleProductLoader = async ({ params }) => {
  const { id } = params;

  try {
    // Fetch product details
    const productResponse = await Helper.makeRequest({ url: ApiUrl.ProductById + `${id}`, method: 'GET' });
    console.log('Product response: ', productResponse);
    const productData = productResponse?.product || [];

    // Fetch product reviews
    const reviewsResponse = await Helper.makeRequest({ url: ApiUrl.Reviewslist + `${id}`, method: 'GET' });
    console.log('Reviews response: ', reviewsResponse);
    const reviewsData = reviewsResponse?.reviews || [];
    const totalReviewCount = reviewsResponse?.totalReviewCount || [];

    return { productData, reviewsData, totalReviewCount, params };
  } catch (err) {
    console.log('Error fetching data: ', err);
    return { productData: [], reviewsData: [], totalReviewCount: [],params }; // Return empty arrays in case of an error
  }
};


const SingleProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const { wishItems } = useSelector((state) => state.wishlist);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [rating, setRating] = useState([
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ]);

  const { productData } = useLoaderData();
  const { reviewsData } = useLoaderData();
  const { totalReviewCount } = useLoaderData();
  const { params } = useLoaderData();

  let UserId = localStorage.getItem('userData');
  const product = {
    userId:UserId,
    title: productData?.name,
    image: productData?.imageUrl,
    rating: productData?.rating,
    price: productData?.price,
    brandName: productData?.brandName,
    amount: quantity,
    selectedSize: productData?.availableSizes,
    isInWishList:false,
  };

//   {
//     "userId":"665b4944fa7599c7683c28e4",
//     "title": "AAPE By A Bathing Ape baseball t-shirt in black",
//     "image": "images.asos-media.com/products/aape-by-a-bathing-ape-baseball-t-shirt-in-black/204453531-1-black",
//     "rating": 4,
//     "price": 69,
//     "brandName": "AAPE BY A BATHING APE®",
//     "amount": 1,
//     "selectedSize": "XS",
//     "isInWishList": true
// }

  for (let i = 0; i < productData?.rating; i++) {
    rating[i] = "full star";
  }

  const addToWishlistHandler = async () => {
  let UserId = localStorage.getItem('userData');

    try {
      let data = {
        userId:UserId,
        title: productData?.name,
        image: productData?.imageUrl ? productData?.imageUrl :'images.asos-media.com/products/aape-by-a-bathing-ape-baseball-t-shirt-in-black/204453531-1-black',
        rating: productData?.rating,
        price: productData?.price,
        brandName: productData?.brandName,
        amount: quantity,
        selectedSize: productData?.availableSizes.toString(),
        isInWishList:true,
      };
      const wishItemsResponse = await Helper.makeRequest({ url: ApiUrl.wishlistAdd, method: 'POST',data:data });
     console.log(wishItemsResponse,'===========wishItemsResponse')
     if(wishItemsResponse.success){
       toast.success("Product added to the wishlist!");
     }
    } catch (error) {
      console.error(error);
    }
  };

  // const removeFromWishlistHandler = async (product) => {
  //   const getResponse = await axios.get(
  //     `http://localhost:8080/user/${localStorage.getItem("id")}`
  //   );
  //   const userObj = getResponse.data;

  //   userObj.userWishlist = userObj.userWishlist || [];

  //   const newWishlist = userObj.userWishlist.filter(
  //     (item) => product.id !== item.id
  //   );

  //   userObj.userWishlist = newWishlist;

  //   const postResponse = await axios.put(
  //     `http://localhost:8080/user/${localStorage.getItem("id")}`,
  //     userObj
  //   );


  //   store.dispatch(removeFromWishlist({ userObj }));
  //   toast.success("Product removed from the wishlist!");
  // };

  return (
    <>
      <SectionTitle title="Product page" path="Home | Shop | Product page" />
      <div className="grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
        <div className="product-images flex flex-col justify-center max-lg:justify-start">
          <img
            // src={`https://${productData?.additionalImageUrls[currentImage]}`}
            src={`https://bagruhastkala.com/cdn/shop/files/IMG-20231209-WA0080.jpg?v=1702109217&width=720`}
            className="w-96 text-center border border-gray-600 cursor-pointer"
            alt={productData.name}
          />
          <div className="other-product-images mt-1 grid grid-cols-3 w-96 gap-y-1 gap-x-2 max-sm:grid-cols-2 max-sm:w-64">
            {/* {productData?.additionalImageUrls.map((imageObj, index) => ( */}
            <img
              // src={`https://${imageObj}`}
              src={`https://bagruhastkala.com/cdn/shop/files/IMG-20231209-WA0080.jpg?v=1702109217&width=720`}
              key={nanoid()}
              onClick={() => setCurrentImage(index)}
              alt={productData.name}
              className="w-32 border border-gray-600 cursor-pointer"
            />
            {/* ))} */}
          </div>
        </div>
        <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
          <h2 className="text-5xl max-sm:text-3xl text-accent-content">
            {productData?.name}
          </h2>
          <SingleProductRating rating={rating} productData={productData} totalReviewCount={totalReviewCount} />
          <p className="text-3xl text-error">
            ₹{productData?.price}
          </p>
          <div className="text-xl max-sm:text-lg text-accent-content">
            {productData?.description}
          </div>
          <div className="text-2xl">
            {/* <SelectSize
              sizeList={productData?.availableSizes}
              size={size}
              setSize={setSize}
            /> */}
          </div>
          <div>
            <label htmlFor="Quantity" className="sr-only">
              {" "}
              Quantity{" "}
            </label>

            <div className="flex items-center gap-1">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
          <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
            <button
              className="btn bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => {
                if (loginState) {
                  dispatch(addToCart(product));
                } else {
                  toast.error(
                    "You must be logged in to add products to the cart"
                  );
                }
              }}
            >
              <FaCartShopping className="text-xl mr-1" />
              Add to cart
            </button>

            {product?.isInWishList ? (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    removeFromWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to remove products from the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                Remove from wishlist
              </button>
            ) : (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    addToWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to add products to the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                Add to wishlist
              </button>
            )}
          </div>
          <div className="other-product-info flex flex-col gap-x-2">
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Brand: {productData?.brandName}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Gender: {productData?.gender}
            </div>
            <div
              className={
                productData?.isInStock
                  ? "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
                  : "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
              }
            >
              In Stock: {productData?.isInStock ? "Yes" : "No"}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              SKU: {productData?.productCode}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Category: {productData?.category}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Production Date:{" "}
              {productData?.productionDate?.substring(0, 10)}
            </div>
          </div>
        </div>
      </div>

      <SingleProductReviews rating={rating} productData={reviewsData} totalReviewCount={totalReviewCount} params={params} />
    </>
  );
};

export default SingleProduct;
