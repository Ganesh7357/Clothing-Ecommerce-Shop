import React, { useState } from "react";
import { Form } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import ApiUrl from "../lip/ApiUrl";
import Helper from "../lip/Helper";
const AddReview = (params) => {
    const { id } = params.params;
console.log(id,'id======id=========++++++++++++++')

    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [location, setlocation] = useState("");
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("2");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            productId:id,
            username:name,
            userImage:`/src/assets/user profile photo ${Math.floor(Math.random() * 10)}.jpg`,
            location:location,
            reviewTitle:title,
            reviewText:description,
            date:new Date(),
            rating:rating
        }
console.log(data,'data=++++++++++++++++++++++++')
        await Helper.makeRequest({ url: ApiUrl.ReviewsAdd , method: 'POST', data: data })
            .then((res) => {
                console.log("res++++++++++++++", res)
                if (res.success) {
                    toast.success(res.message);
                }
            })
            .catch((err) => {
                toast.error("Failed: " + err.message);
            });
    };

    return (
        <>
            <div className="isolate px-6 lg:px-8 ">
                <Form
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="mx-auto px-3 py-2 mt-16 max-w-xl sm:mt-20 bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200"
                >
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                Name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="location"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                location
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                    value={location}
                                    onChange={(e) => setlocation(e.target.value)}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="title"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                Give your review a title
                            </label>
                            <div className="relative mt-2.5">
                                <input
                                    type="text"
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                Write your comments here
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    type="text"
                                    name="message"
                                    id="message"
                                    rows="4"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 border-0">
                        <button
                            type="submit"
                            className="block w-full border-0 rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Review
                        </button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default AddReview;
