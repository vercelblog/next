"use client"

import { addProduct,getProd,deleteProduct } from '../../api/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const imageHelp = process.env.NEXT_PUBLIC_IMG;
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productLink: "",
    productAbout: "",
    logo: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await getProd();
      setProducts(res.data.products || []);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const imageUpload = async (file) => {
    if (!file) return null;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'speedblog');
    formData.append('folder', 'blogs');

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${imageHelp}/image/upload`, // ✅ fixed cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setUploading(false);

      if (data.secure_url) {
        setNewProduct((prev) => ({ ...prev, logo: data.secure_url })); // ✅ save logo
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!newProduct.productName || !newProduct.productLink || !newProduct.logo) {
        return alert("Missing fields or logo");
      }
      const res = await addProduct(newProduct);
      console.log(res);
      alert("Product added!");
      setNewProduct({ productName: "", productLink: "", productAbout: "", logo: "" });
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between mb-3'>
        <h2 className="font-bold text-lg">All Products</h2>
        <h2 className="font-bold text-lg">Add Product</h2>
      </div>

      {/* Add Form */}
      <div className='border p-2 mb-3 space-y-2'>
        <input name='productName' value={newProduct.productName} onChange={handleChange} className='w-full border p-1 rounded' placeholder='Enter name' />
        <input name='productAbout' value={newProduct.productAbout} onChange={handleChange} className='w-full border p-1 rounded' placeholder='Enter about' />
        <input name='productLink' value={newProduct.productLink} onChange={handleChange} className='w-full border p-1 rounded' placeholder='Enter link' />
        
        <input type="file" onChange={(e) => imageUpload(e.target.files[0])} />
        {uploading && <p className="text-sm text-gray-600">Uploading...</p>}
        {newProduct.logo && <img src={newProduct.logo} alt="preview" className="w-20 h-20 object-cover rounded" />}

        <button onClick={handleSubmit} className='bg-green-600 text-white px-4 py-1 rounded w-full'>
          Submit
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-2">
        {products.map((item) => (
          <div key={item._id} className='border flex justify-between items-center p-2 rounded'>
            <div className='flex items-center gap-3'>
              <img src={item.logo} alt="" className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="font-semibold">{item.productName}</p>
                <p className="text-sm text-gray-600">{item.productAbout}</p>
              </div>
            </div>
            <button className='text-red-500' onClick={() => deleteProduct(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
