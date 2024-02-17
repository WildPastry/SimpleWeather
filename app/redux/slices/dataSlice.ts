import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { IData, IError, IWeather } from '../../types/data.types';
import getWeather from '../../api/getWeather';

// Set initialState
const initialState: IData = {
  weather: {
    daily: '',
    desc: '',
    feelsLike: 0,
    high: 0,
    hourly: [],
    humidity: '',
    icon: '',
    id: 0,
    low: 0,
    sunrise: '',
    sunset: '',
    temp: 0,
    wind: 0
  },
  loading: true,
  error: {
    errorState: false
  }
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
      state.error.errorState = action.payload;
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
      error: IError;
    }>
  ) => {
    builder
      .addCase(setData.pending, (state) => {
        state.loading = true;
      })
      .addCase(setData.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload.data as IWeather;
        state.error.errorMessage = undefined;
        state.error.errorState = false;
      })
      .addCase(setData.rejected, (state, action) => {
        state.loading = false;
        state.error.errorMessage = action.payload as string;
        state.error.errorState = true;
      });
  }
});

export const setData = createAsyncThunk<
  { data?: IWeather; error?: string },
  void
>('setData', async (_, { rejectWithValue }) => {
  try {
    const response: IWeather = await getWeather();
    return { data: response };
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

// Export error and loading actions
export const { setLoading, setError } = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
