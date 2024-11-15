import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage as the default storage
import userReducer from "./slices/userSlice";
import commissionReducer from "./slices/commissionSlice";
import auctionReducer from "./slices/auctionSlice";
import bidReducer from "./slices/bidSlice";
import superAdminReducer from "./slices/superAdminSlice";

// Persist configuration
const persistConfig = {
  key: 'root', // Key for localStorage
  storage,
};

const rootReducer = {
  user: persistReducer(persistConfig, userReducer),
  commission: commissionReducer, 
  auction: auctionReducer,       
  bid: bidReducer,               
  superAdmin: persistReducer(persistConfig, superAdminReducer), 
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions or state that may contain non-serializable values
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // persist actions, for example
      },
    }),
});

export const persistor = persistStore(store);
