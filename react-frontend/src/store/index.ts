import {configureStore} from '@reduxjs/toolkit';
import substanceReducer, {substanceApi} from './slice/SubstanceSlice';
import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    substance: substanceReducer,
    // RTK Query reducer hinzufügen
    [substanceApi.reducerPath]: substanceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(substanceApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Optionale getypte Hooks für Komponenten
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

