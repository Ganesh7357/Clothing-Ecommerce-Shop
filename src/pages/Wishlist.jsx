import React, { useState, useEffect } from "react";
import { SectionTitle, WishItem } from "../components";
import { useDispatch } from "react-redux";
import Helper from "../lip/Helper";
import ApiUrl from "../lip/ApiUrl";

const Wishlist = () => {
  const [wishItems, setWishItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishItems = async () => {
      let UserId = localStorage.getItem('userData');
      console.log(UserId,'=++++++++++++++++++++++++++++   userId')
      try {
        const wishItemsResponse = await Helper.makeRequest({ url: ApiUrl.wishlistList + UserId, method: 'GET' });
        console.log('wishItemsResponse ================>: ', wishItemsResponse);
        setWishItems(wishItemsResponse.wishlistItems); // Assuming the response data is in wishItemsResponse.data
      } catch (err) {
        console.log('Error fetching data: ', err);
      }
    };

    fetchWishItems();
  }, [dispatch]);

  return (
    <>
      <SectionTitle title="Wishlist" path="Home | Wishlist" />
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="text-accent-content">Name</th>
                <th className="text-accent-content">Size</th>
                <th className="text-accent-content">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishItems ? wishItems.map((item, index) => (
                <WishItem item={item} key={index} counter={index} />
              )):'' }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
