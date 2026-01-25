import axiosClient from "./axiosClient";

export const getOrders = () => {
  return axiosClient.get("/orders");
};
