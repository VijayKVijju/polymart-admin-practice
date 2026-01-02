import axios from "axios";

const API_URL = "http://localhost:5005/api/listings";

export const fetchListings = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};