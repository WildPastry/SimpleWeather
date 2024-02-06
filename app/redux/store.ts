import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

// Configure store
export function makeStore() {
  return configureStore({
    reducer: rootReducer
  });
}

// Create the store
const store = makeStore();

// Exports
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
