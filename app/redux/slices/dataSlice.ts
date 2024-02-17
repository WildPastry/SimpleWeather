import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { IData, IError, ILocation, IWeather } from '../../types/data.types';
import getLocation from '../../api/getLocation';
import getWeather from '../../api/getWeather';

// Set initialState
const initialState: IData = {
  error: {
    errorState: false
  },
  loading: true,
  location: {
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: '',
      longitude: '',
      speed: 0
    },
    mocked: false,
    timestamp: 0
  },
  weather: {
    daily: [],
    desc: '',
    feelsLike: 0,
    high: 0,
    hourly: [],
    humidity: 0,
    icon: '',
    id: 0,
    low: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    wind: 0
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
      error: IError;
      loading: boolean;
      location: ILocation;
      weather: IWeather;
    }>
  ) => {
    builder
      // Set Weather
      .addCase(fetchWeatherFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload as IWeather;
        state.error.errorMessage = undefined;
        state.error.errorState = false;
      })
      .addCase(fetchWeatherFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error.errorMessage = action.payload as string;
        state.error.errorState = true;
      })
      // Set Location
      .addCase(fetchLocationFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocationFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload as ILocation;
        state.error.errorMessage = undefined;
        state.error.errorState = false;
      })
      .addCase(fetchLocationFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error.errorMessage = action.payload as string;
        state.error.errorState = true;
      });
  }
});

// Fetch location
export const fetchLocationFromAPI = createAsyncThunk<
  ILocation,
  void,
  { rejectValue: string }
>('dataSlice/fetchLocationFromAPI', async (_, { rejectWithValue }) => {
  try {
    const response = await getLocation();
    return response;
  } catch (error: any) {
    // Dispatch setError action if failed
    setError(true);
    // Return custom error message
    return rejectWithValue(error.message);
  }
});

// Fetch weather
export const fetchWeatherFromAPI = createAsyncThunk<
  IWeather,
  void,
  { rejectValue: string }
>('dataSlice/fetchWeatherFromAPI', async (_, { rejectWithValue }) => {
  try {
    const response = await getWeather();
    return response;
  } catch (error: any) {
    // Dispatch setError action if failed
    setError(true);
    // Return custom error message
    return rejectWithValue(error.message);
  }
});

// Fetch all data
export const setData = () => async (dispatch: any) => {
  try {
    // Dispatch both thunks in parallel
    await Promise.all([
      dispatch(fetchLocationFromAPI()),
      dispatch(fetchWeatherFromAPI())
    ]);
  } catch (error) {
    // Set error screen if failed
    dispatch(setError(true));
  }
};

// Export error and loading actions
export const { setLoading, setError } = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
