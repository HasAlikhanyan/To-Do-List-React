import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
    name: 'tasksCounter',
    initialState: {
        tasksAmount: 0,
        activeTasksAmount: 0
    },
    reducers: {
        changeTasksAmount: (state, action) => {
            state.tasksAmount = action.payload;
        },
        changeActiveTasksAmount: (state, action) => {
            state.activeTasksAmount = action.payload;
        },
    }


})


export const { changeTasksAmount, changeActiveTasksAmount } = tasksSlice.actions;

export default tasksSlice.reducer;