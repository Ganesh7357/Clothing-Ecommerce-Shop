import React from "react";
import SingleReview from "./SingleReview";
import RatingPercentage from "./RatingPercentage";
import { nanoid } from "nanoid";
import AddReview from "./AddReview";

const SingleProductReviews = ({ rating, productData, totalReviewCount,params }) => {
  console.log(params,'+++++++++++++=iddddddddddddd')
  return (
    <div className="product-reviews max-w-7xl mt-10 mx-auto">
      <RatingPercentage rating={rating} productData={productData} totalReviewCount={totalReviewCount} />

      <div className="product-reviews-comments mt-20 px-10">
        <h2 className="text-4xl text-accent-content text-center mb-5 max-sm:text-2xl">
          Reviews
        </h2>
        {productData.map((item) => (
          <SingleReview key={nanoid()} reviewObj={item} />
        ))}
        {totalReviewCount > 3 && (
          <button className="btn bg-blue-600 hover:bg-blue-500 w-full text-white">
            Load more reviews
          </button>
        )}
        <AddReview params={params} />
      </div>
    </div>
  );
};

export default SingleProductReviews;