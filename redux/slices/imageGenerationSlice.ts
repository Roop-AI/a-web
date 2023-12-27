import { createSlice } from "@reduxjs/toolkit";

export const imageGenerationSlice = createSlice({
  name: "imageGeneration",
  initialState: {
    image: "",
    negativePrompt: "",
    prompt: "",
    sampler: "",
    model: "",
    seed: "",
  },
  reducers: {
    setImageGenerationData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setImageGenerationData } = imageGenerationSlice.actions;
export const selectImageGenerationData = (state: any) => state.imageGeneration;

export default imageGenerationSlice.reducer;
