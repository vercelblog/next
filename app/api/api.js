import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // important for sending cookies (JWT)
});

// 🟢 Add Product
export const addProduct = async (data) => {
  return await api.post("/product", data);
};


export const deleteComment = async (id) => {
  return await api.delete(`/comment/${id}`);
};


export const getComments = async () => {
  return await api.get("/comment");
};

// 🟣 Get All Products
export const getProd = async () => {
  return await api.get("/product");
};

export const deleteProduct = (id) => api.delete(`/product/${id}`);


export default api;
