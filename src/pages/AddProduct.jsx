import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import config from "../lip/config";
import ApiUrl from "../lip/ApiUrl";
import Helper from "../lip/Helper";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [gender, setgender] = useState("");
  const [category, setcategory] = useState("");
  const [availableSizes, setavailableSizes] = useState("");
  const [rating, setrating] = useState("");
  const [brandName, setbrandName] = useState("");
  const [price, setprice] = useState("");
  const [productCode, setproductCode] = useState("");
  const [productImage, setproductImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('isInStock', true);
    formData.append('gender', gender);
    formData.append('category', category);
    formData.append('availableSizes', availableSizes); // Convert array to JSON string
    formData.append('rating', parseInt(rating));
    formData.append('productionDate', new Date());
    formData.append('price', parseInt(price)); // Convert object to JSON string
    formData.append('brandName', brandName);
    formData.append('productCode', productCode);
    // formData.append('imageUrl', imageUrl);
    // formData.append('additionalImageUrls', JSON.stringify(additionalImageUrls)); // Convert array to JSON string
    if (productImage) {
      formData.append('productImage', productImage); // Append file
    }
    console.log('formData===>', formData)
    console.log('productImage===>', productImage)

    await Helper.makeRequest({ url: ApiUrl.AddProduct, method: 'POSTUPLOAD', data: formData })
      .then((res) => {
        if (res.success) {
          console.log("res++++++++++++++", res)
          toast.success(res.message);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error("Failed: " + err.message);
      });
  };
  return (
    <>
      <SectionTitle title="AddProduct" path="Home | Add Product" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Product Image
              </label>
              <input
                type="file"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={productImage}
                onChange={(e) => setproductImage(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Name
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Description
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Gender
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Category
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                AvailableSizes
              </label>
              <input
                type="number"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={availableSizes}
                onChange={(e) => setavailableSizes(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Rating
              </label>
              <input
                type="number"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={rating}
                onChange={(e) => setrating(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Price
              </label>
              <input
                type="number"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                BrandName
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={brandName}
                onChange={(e) => setbrandName(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                ProductCode
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={productCode}
                onChange={(e) => setproductCode(e.target.value)}
                required={true}
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Submit</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
