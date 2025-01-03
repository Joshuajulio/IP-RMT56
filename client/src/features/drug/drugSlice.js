import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../helpers/http-client";
import Swal from "sweetalert2";

const drugSlice = createSlice({
  name: "drugs",
  initialState: {
    list: [],
    searchQuery: localStorage.getItem("searchQuery") || "",
    page: localStorage.getItem("page") || 1,
    count: 0,
  },
  reducers: {
    setDrugs: (state, action) => {
      state.list = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export default drugSlice.reducer;
export const { setDrugs, setSearchQuery, setPage, setCount } =
  drugSlice.actions;

export const fetchDrugs = (searchQuery, page) => {
  return async (dispatchAction) => {
    try {
      const response = await api.get("/ip/drugs", {
        params: {
          q: searchQuery,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatchAction(setDrugs(response.data.data));
      dispatchAction(setCount(response.data.totalPage));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch drugs",
        text: `${error.response.data.message}`,
      });
    }
  };
};
