import axios from "axios";

const ACCESS_KEY = "t2mRZ-sriFWZZ4OIF1eZzw6Iw1sByvzNVsc0cr3X7T4";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchSearch = async ({ searchData, page = 1 }) => {
  try {
    const response = await axios.get(
      `/search/photos?query=${searchData}&client_id=${ACCESS_KEY}&page=${page}&per_page=15`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data from Unsplash API:", error);
    throw error;
  }
};
