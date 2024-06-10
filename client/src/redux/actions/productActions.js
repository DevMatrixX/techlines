import axios from 'axios';

import { setPagination, setProducts, setLoading, resetError, setError } from '../slices/product';
import { setFavoritesToggled, productReviewed, setFavorites, setProduct } from '../slices/product';

export const getProducts = page => async dispatch => {
    dispatch(setLoading());

    try {
        const { data } = await axios.get(`/api/products/${page}/${10}`);

        const { pagination, products } = data;

        dispatch(setProducts(products));
        dispatch(setPagination(pagination));
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const getProduct = id => async dispatch => {
    dispatch(setLoading());

    try {
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch(setProduct(data));
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const addToFavorites = id => async (dispatch, getState) => {
    const { favorites } = getState().product;

    const newFavorites = [...favorites, id];

    dispatch(setFavorites(newFavorites));

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
};

export const removeFromFavorites = id => async (dispatch, getState) => {
    const { favorites } = getState().product;

    const newFavorites = favorites.filter(favoriteId => favoriteId !== id);

    dispatch(setFavorites(newFavorites));

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
};

export const toggleFavorites = toggle => (dispatch, getState) => {
    const { favorites, products } = getState().product;

    if (toggle) {
        const filteredProducts = products.filter(product => favorites?.includes(product._id));

        dispatch(setFavoritesToggled(toggle));
        dispatch(setProducts(filteredProducts));
    } else {
        dispatch(setFavoritesToggled(false));
        dispatch(getProducts(1));
    }
};

export const createProductReview = (id, userId, comment, rating, title) => async (dispatch, getState) => {
    const {
        user: { userInfo }
    } = getState();

    console.log({ userInfo });

    try {
        await axios.post(
            `/api/products/reviews/${id}`,
            { comment, userId, rating, title },
            { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }
        );

        dispatch(productReviewed(true));
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const resetProductError = () => async dispatch => {
    dispatch(resetError());
};
