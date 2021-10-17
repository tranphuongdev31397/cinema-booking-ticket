import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import movieListReducer from "containers/home-module/MovieList/module/reducer";
import cinemaComplexReducer from "containers/home-module/CinemaComplex/module/reducer";
import searchToolReducer from "containers/home-module/SearchTool/module/reducer";
import authReducer from "containers/auth/module/reducer";
import movieDetailReducer from "containers/home-module/MovieDetail/module/reducer";
import seatPlanReducer from "containers/home-module/SeatPlan/module/reducer";
import userProfileReducer from "containers/auth/profileUser/EditProfile/module/reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  movieListReducer,
  cinemaComplexReducer,
  searchToolReducer,
  authReducer,
  movieDetailReducer,
  seatPlanReducer,
  userProfileReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);




const persistor = persistStore(store)

export { store, persistor };
