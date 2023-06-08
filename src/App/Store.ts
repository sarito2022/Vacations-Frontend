import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import vacationsReducer from "./VacSlice";

export default configureStore({
    reducer: {
        authSlice: authReducer,
        vacations: vacationsReducer
    }
})

