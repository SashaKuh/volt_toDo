import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./taskSlice";
import { filtersReducer } from "./filterSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
  }
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
  preloadedState: loadState(), 
});

store.subscribe(() => {
  saveState(store.getState());
});
