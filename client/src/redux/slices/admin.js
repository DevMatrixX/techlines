import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    deliveredFlag: false,
    orderRemoval: false,
    userRemoval: false,
    loading: false,
    userList: null,
    orders: null,
    error: null
};

export const adminSlice = createSlice({
    reducers: {
        resetError: state => {
            state.deliveredFlag = false;
            state.orderRemoval = false;
            state.userRemoval = false;
            state.loading = false;
            state.error = null;
        },
        getUsers: (state, { payload }) => {
            state.userList = payload;
            state.loading = false;
            state.error = null;
        },
        getOrders: (state, { payload }) => {
            state.orders = payload;
            state.loading = false;
            state.error = null;
        },
        orderDelete: state => {
            state.orderRemoval = true;
            state.loading = false;
            state.error = null;
        },
        userDelete: state => {
            state.userRemoval = true;
            state.loading = false;
            state.error = null;
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setDeliveredFlag: state => {
            state.deliveredFlag = true;
            state.loading = false;
        },
        setLoading: state => {
            state.loading = true;
        }
    },
    name: 'admin',
    initialState
});

export const { setDeliveredFlag, orderDelete, resetError, setLoading, userDelete, getOrders, getUsers, setError } =
    adminSlice.actions;

export default adminSlice.reducer;
