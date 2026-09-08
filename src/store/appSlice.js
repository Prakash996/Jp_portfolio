import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasEntered: false,
  isEntering: false,
  isPortfolioReady: false,
  loadError: false,
  activeSection: "Home",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    portfolioLoaded(state) {
      state.isPortfolioReady = true;
      state.loadError = false;
    },
    enterPortfolio(state) {
      state.isEntering = true;
      state.hasEntered = true;
    },
    portfolioLoadFailed(state) {
      state.loadError = true;
      state.hasEntered = false;
      state.isEntering = false;
    },
    setActiveSection(state, action) {
      state.activeSection = action.payload;
    },
    resetPortfolio(state) {
      state.hasEntered = false;
      state.isEntering = false;
      state.loadError = false;
    },
  },
});

export const {
  portfolioLoaded,
  enterPortfolio,
  portfolioLoadFailed,
  setActiveSection,
  resetPortfolio,
} = appSlice.actions;

export default appSlice.reducer;
