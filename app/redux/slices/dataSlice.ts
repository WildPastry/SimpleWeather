import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { IData, IWeather } from "../../types/data.types";
import getWeather from "../../api/getWeather";

// Set initialState
const initialState: IData = {
  weather: {
    temp: 0,
    high: 0,
    low: 0,
    openWeatherId: "",
    desc: "",
    humidity: "",
    wind: 0,
    icon: "",
    sunset: "",
    sunrise: "",
    feelsLike: "",
    hourly: "",
    daily: "",
  },
  loading: true,
  error: false,
};

/*
 * Create dataSlice with combined actions and reducers
 * Including App data state
 */
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Loading and error reducers
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
  /*
   * Data reducers
   * Each of the data types includes 3 states:
   * Pending - waiting for response
   * Fulfilled - response successful
   * Rejected - response failed
   */
  extraReducers: (
    builder: ActionReducerMapBuilder<{
      weather: IWeather;
      loading: boolean;
      error: boolean;
    }>,
  ) => {
    builder
      // Weather
      .addCase(fetchWeatherFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeatherFromAPI.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// /**
//  * Fetch from the openWeather API
//  *
//  * @returns {Promise<string>} JSON
//  */
export const fetchWeatherFromAPI = createAsyncThunk(
  "fetchWeatherFromAPI",
  async () => {
    console.log('fetchWeatherFromAPI');
    const response = await getWeather();
    return response;
  },
);

// // Fetch weather data
// export const setData = () => async (dispatch: any) => {
//   console.log('setData');
//   try {
//     // Dispatch in parallel
//     await Promise.all([dispatch(fetchWeatherFromAPI())]);
//   } catch (error) {
//     console.log('slice', error);
//     // Set error screen if failed
//     dispatch(setError(true));
//   }
// };

export const setData = createAsyncThunk("setData", async (_, thunkAPI) => {
  try {
    const response = await thunkAPI.dispatch(fetchWeatherFromAPI());
    return response.payload;
  } catch (error) {
    console.log('slice', error);
    // Set error screen if failed
    throw error;
  }
});

// Export error and loading actions
export const { setLoading, setError } = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
