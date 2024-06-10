import axios from 'axios';

import { setLoading, clearCart, setError } from '../slices/cart';
import { setShippingCosts, cartItemRemove, cartItemAdd } from '../slices/cart';

export const addCartItem = (id, qty) => async dispatch => {
    dispatch(setLoading());

    try {
        const { data } = await axios.get(`/api/products/${id}`);

        const { _id: productId, stripeId, subtitle } = data;
        const { images, price, stock, brand, name } = data;

        const itemToAdd = {
            image: images[0],
            id: productId,
            subtitle,
            stripeId,
            brand,
            price,
            stock,
            name,
            qty
        };

        dispatch(cartItemAdd(itemToAdd));
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

export const removeCartItem = id => async dispatch => {
    dispatch(setLoading());
    dispatch(cartItemRemove(id));
};

export const setShipping = value => async dispatch => {
    console.log({ value });
    dispatch(setShippingCosts(value));
};

export const resetCart = () => async dispatch => {
    dispatch(clearCart());
};
