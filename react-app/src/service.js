import { base } from "./api";
import axiosInstance from "./axios";

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance({
      method: "get",
      url: base + "/categories",
    });

    return data;
  } catch (error) {
    console.log("not successful");
  }
};
