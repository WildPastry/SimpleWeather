import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { IData, IWeather } from '../../types/data.types';
import getWeather from '../../api/getWeather';

// Set initialState
const initialState: IData = {
  weather: {
    temp: 0,
    high: 0,
    low: 0,
    openWeatherId: '',
    desc: '',
    humidity: '',
    wind: 0,
    icon: '',
    sunset: '',
    sunrise: '',
    feelsLike: '',
    hourly: '',
    daily: ''
  },
  loading: true,
  error: false
};

/*
 * Create dataSlice with combined actions and reducers
 * Including loading and error states
 */
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Loading and error reducers
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    }
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
    }>
  ) => {
    builder
      .addCase(setData.pending, (state) => {
        state.loading = true;
      })
      .addCase(setData.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(setData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const setData = createAsyncThunk<IWeather, void>(
  'setData',
  async (): Promise<IWeather> => {
    const response: IWeather = await getWeather();
    return response;
  }
);

// Export error and loading actions
export const { setLoading, setError } = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
