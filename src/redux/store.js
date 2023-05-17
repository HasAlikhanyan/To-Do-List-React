import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../redux/reducers/tasksSlice';
import loaderReducer from '../redux/reducers/loaderSlice';

const store =  configureStore({
    reducer: {
        tasks: tasksReducer,
        loader: loaderReducer
    }
})

export {store};