import { API } from "@/axios";

export const GetProduct = async (data: any) => {
  const [_, color, size] = data.queryKey;
  try {
    const res = await API.get(`/products?color=${color}&size=${size}`);
    return res?.data;
  } catch (error) {}
};
