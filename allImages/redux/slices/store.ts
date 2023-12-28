import { configureStore } from '@reduxjs/toolkit';
import imageGenerationReducer from './imageGenerationSlice';

export const store = configureStore({
  reducer: {
    imageGeneration: imageGenerationReducer,
  },
});
