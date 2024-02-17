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
      // SetData
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
      })
      // SetLocation
      .addCase(setLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(setLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload.data as ILocation;
        state.error.errorMessage = undefined;
        state.error.errorState = false;
      })
      .addCase(setLocation.rejected, (state, action) => {
        state.loading = false;
        state.error.errorMessage = action.payload as string;
        state.error.errorState = true;
      });
  }
});

// Set location data
export const setLocation = createAsyncThunk<
  { data?: ILocation; error?: string },
  void
>('setLocation', async (_, { rejectWithValue }) => {
  try {
    const response: ILocation = await getLocation();
    return { data: response };
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

// Set weather data
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
