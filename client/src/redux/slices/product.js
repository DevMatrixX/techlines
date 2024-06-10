import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorites')) ?? [],
    favoritesToggled: false,
    productUpdate: false,
    reviewRemoval: false,
    reviewed: false,
    loading: false,
    pagination: {},
    product: null,
    products: [],
    error: null
};

export const productSlice = createSlice({
    reducers: {
        setProducts: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            state.products = payload;
            state.reviewRemoval = false;
        },
        setProduct: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            state.reviewed = false;
            state.product = payload;
        },
        resetError: state => {
            state.error = null;
            state.reviewed = false;
            state.reviewRemoval = false;
            state.productUpdate = false;
        },
        setPagination: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            state.pagination = payload;
        },
        productReviewed: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            state.reviewed = payload;
        },
        setProductUpdateFlag: state => {
            state.productUpdate = true;
            state.loading = false;
            state.error = null;
        },
        setReviewRemovalFlag: state => {
            state.reviewRemoval = true;
            state.loading = false;
            state.error = null;
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setFavoritesToggled: (state, { payload }) => {
            state.favoritesToggled = payload;
        },
        setFavorites: (state, { payload }) => {
            state.favorites = payload;
        },
        setLoading: state => {
            state.loading = true;
        }
    },
    name: 'products',
    initialState
});

export const {
    setProductUpdateFlag,
    setReviewRemovalFlag,
    setFavoritesToggled,
    productReviewed,
    setPagination,
    setFavorites,
    setProducts,
    resetError,
    setProduct,
    setLoading,
    setError
} = productSlice.actions;

export default productSlice.reducer;
