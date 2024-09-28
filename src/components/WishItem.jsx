import React from "react";
import { FaHeartCrack } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import axios from "axios";
import { store } from "../store";
import { toast } from "react-toastify";
import Helper from "../lip/Helper";
import ApiUrl from "../lip/ApiUrl";

const WishItem = ({ item, counter }) => {
    const dispatch = useDispatch();

    const removeFromWishlistHandler = async (product) => {
      try {
        console.log(product,'+++++++++1234567890+++')
        const wishItemsResponse = await Helper.makeRequest({ url: ApiUrl.wishlistRemove + product, method: 'DELETE' });
        console.log('wishItemsResponse ================>: ', wishItemsResponse);
        if(wishItemsResponse.success){
          toast.success("Product removed from the wishlist!");
        }

      } catch (err) {
        console.log('Error fetching data: ', err);
      }
      // const getResponse = await axios.get(
      //   `http://localhost:8080/user/${localStorage.getItem("id")}`
      // );
      // const userObj = getResponse.data;
  
      // userObj.userWishlist = userObj.userWishlist || [];
  
      // const newWishlist = userObj.userWishlist.filter(item => product.id !== item.id);
  
      // userObj.userWishlist = newWishlist;
  
      // const postResponse = await axios.put(
      //   `http://localhost:8080/user/${localStorage.getItem("id")}`,
      //   userObj
      // );
  
      // // Dispatch the addToWishlist action with the product data
      // store.dispatch(removeFromWishlist({ userObj }));
      // toast.success("Product removed from the wishlist!");
  
    }
  return (
    <tr className="hover cursor-pointer">
      <th className="text-accent-content">{ counter + 1 }</th>
      <td className="text-accent-content">{ item.title }</td>
      <td className="text-accent-content">{ item.selectedSize }</td>
      <td>
        <button className="btn btn-xs btn-error text-sm" onClick={() => removeFromWishlistHandler(item._id)}>
          <FaHeartCrack />
          remove from the wishlist
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
