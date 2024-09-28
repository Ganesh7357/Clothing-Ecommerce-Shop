import React, { useEffect, useState } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import Helper from "../lip/Helper";
import ApiUrl from "../lip/ApiUrl";

// export const landingLoader = async () => {
//   // const response = await axios(
//   //   `http://localhost:8080/products?_page=1&_limit=8`
//   // );

//   try {
//     Helper.makeRequest({ url: ApiUrl.ProductList, method: 'GET' })
//       .then((response) => {
//         console.log('response=++++++++++++++===>', response)
//         const data = response?.products;
//         return { products: data };
//       })
//   } catch (err) {
//     console.log('err====>', err)
//   }


// };

export const landingLoader = async () => {
  try {
    const response = await Helper.makeRequest({ url: ApiUrl.ProductList, method: 'GET' });
    console.log('response=++++++++++++++===>', response);
    const data = response?.products;
    return { products: data || [] }; // Return products or an empty array if no products found
  } catch (err) {
    console.log('err====>', err);
    return { products: [] }; // Return an empty array in case of an error
  }
};


const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();
  const [isData, setData] = useState([])

  // useEffect(() => {
  //   // ProductList()
  //   console.log('==============products=====', products)
  // }, [])

  // const ProductList = async (e) => {
  //   // e.preventDefault();
  //   try {
  //     Helper.makeRequest({ url: ApiUrl.ProductList, method: 'GET' })
  //       .then((response) => {
  //         console.log('response=++++++++++++++===>', response)
  //         setData(response?.products)
  //       })
  //   } catch (err) {
  //     console.log('err====>', err)
  //   }
  // }

  return (
    <main>
      <Hero />
      {/* <Stats /> */}

      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductElement
              key={product._id}
              id={product._id}
              title={product.name}
              image={product.imageUrl}
              rating={product.rating}
              // price={product.price.current.value}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
