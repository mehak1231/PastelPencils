import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Notebook", // Default category
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/products/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });      
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Notebook",
        });
        setImage(null);
        toast.success(response.data.message || "Product added successfully!");
      } else {
        toast.error(response.data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div className="add-img-upload flex-col">
          <p>Upload Product Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        {/* Category and Price */}
        <div className="add-category-price">
          {/* Category */}
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="New Arrival">New Arrival</option>
              <option value="Pen">Pen</option>
              <option value="Eraser">Eraser</option>
              <option value="Sharpner">Sharpner</option>
              <option value="Cutter">Cutter</option>
              <option value="Notepad">Notepad</option>
              <option value="Stapler">Stapler</option>
              <option value="Highlighter">Highlighter</option>
              <option value="Calculator">Calculator</option>
              <option value="Bookmark">Bookmark</option>
              <option value="Diary">Diary</option>
            </select>
          </div>

          {/* Price */}
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Enter price in USD"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;