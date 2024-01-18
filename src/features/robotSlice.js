import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  robots: [],
  searchField: "",
  status: "",
};

export const fetchRobots = createAsyncThunk("getUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export const robotSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    searchRobot: (state, action) => {
      state.searchField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRobots.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchRobots.fulfilled, (state, action) => {
        state.robots = action.payload;
        state.status = "succeed";
      })
      .addCase(fetchRobots.rejected, (state, action) => {
        state.status = "succeeded";
      });
  },
});

export const { searchRobot } = robotSlice.actions;
export default robotSlice.reducer;
