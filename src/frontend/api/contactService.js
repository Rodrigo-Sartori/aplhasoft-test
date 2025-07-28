import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "11cb8c901a3b.ngrok-free.app",
});

export const getContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};

export const getContactById = async (id) => {
  const response = await api.get(`/contacts/${id}`);
  return response.data;
};
