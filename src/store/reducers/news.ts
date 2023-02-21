import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { PAGE_SIZE } from "../../utils/constants";
import { RootState } from "../hooks";

interface IState {
  news: any;
  loader: boolean;
}
interface IAllNews {
  data: INews[];
  config: any;
  headers: any;
  request: any;
  status: any;
  statusText: any;
}

const initialState: IState = { loader: false, news: [] };

export const getAllNews = createAsyncThunk(
  "news/getAllNews",
  async (page: number) => {
    const response: AxiosResponse<IAllNews> = await axios.get(
      `https://mockend.com/OlegKryvak/test-news/news?offset=${
        page * PAGE_SIZE - PAGE_SIZE
      }&limit=12`
    );
    return response.data;
  }
);
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id: number) => {
    const response: AxiosResponse<IAllNews> = await axios.delete(
      `https://mockend.com/OlegKryvak/test-news/news/:${id}`
    );
    return { data: response.data, id };
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews: (state) => {
      state.news = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllNews.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getAllNews.fulfilled, (state, action) => {
      state.news = state.news.concat(action.payload);
      state.loader = false;
    });
    builder.addCase(deleteNews.pending, () => {
    });
    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.news = state.news.filter(
        (item: INews) => item.id !== action.payload.id
      );
    });
  },
});

export const { clearNews } = newsSlice.actions;
export const newsSelector = (state: RootState) => state.news;
export default newsSlice.reducer;
