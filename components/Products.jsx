"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProd } from "../app/api/api"; // ✅ keep your existing API import

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    allProduct();
  }, []);

  const allProduct = async () => {
    try {
      const res = await getProd(); // ✅ fixed function name
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="text-center border-b border-gray-200 p-2 mb-3 text-gray-800 font-semibold">
        Trending Products
      </div>

      {products.length > 0 ? (
        products.map((item) => (
          <Link
            key={item._id}
            href={item.productLink || "#"}
            target="_blank"
            className="block"
          >
            <div className="bg-white flex items-center gap-4 p-2 mb-2 w-full   border-gray-300 border-b hover:shadow-md transition">
              <div>
                <img
                  className="rounded-md w-10 h-10 object-cover"
                  src={item.logo}
                  alt={item.productName}
                />
              </div>
              <div>
                <p className="text-sm font-medium">{item.productName}</p>
                <p className="text-xs text-gray-600">{item.productAbout}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default Products;
