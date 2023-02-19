import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { API_KEY } from "../../utils/constants";
import { RootState } from "../hooks";

interface IState {
  news: any;
  loader: boolean;
}
interface IAllNews {
  status: string;
  totalResults: number;
  articles: Array<any>;
}

const initialState: IState = { loader: false, news: [] };

export const getAllNews = createAsyncThunk("news/getAllNews", async () => {
  const response: AxiosResponse<IAllNews> = await axios.get(
    `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${API_KEY}&pageSize=12&page=1`
  );
  return response.data.articles;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllNews.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getAllNews.fulfilled, (state, action) => {
      console.log(action.payload);
      state.news = [...action.payload];
      state.loader = false;
    });
  },
});

export const { setLoader } = newsSlice.actions;
export const newsSelector = (state: RootState) => state.news;
export default newsSlice.reducer;
