import { API } from "@/axios";

export const GetProduct = async () => {
  try {
    const res = await API.get("/products");
    return res?.data;
  } catch (error) {}
};
