import { createSlice } from '@reduxjs/toolkit';

const calculateSubtotal = cartItems => {
    let result = 0;

    cartItems.forEach(item => (result += item.qty * item.price));

    return result;
};

export const initialState = {
    subtotal: localStorage.getItem('cartItems') ? calculateSubtotal(JSON.parse(localStorage.getItem('cartItems'))) : 0,
    shipping: JSON.parse(localStorage.getItem('shipping')) ?? 4.99,
    cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? [],
    loading: false,
    error: null
};

const updateLocalStorage = cart => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cart)));
};

export const cartSlice = createSlice({
    reducers: {
        cartItemAdd: (state, { payload }) => {
            const existingItem = state.cartItems.find(item => item.id === payload.id);

            if (existingItem) {
                state.cartItems = state.cartItems.map(item => (item.id === payload.id ? payload : item));
            } else {
                state.cartItems = [...state.cartItems, payload];
            }

            state.loading = false;
            state.error = null;

            updateLocalStorage(state.cartItems);

            state.subtotal = calculateSubtotal(state.cartItems);
        },
        clearCart: state => {
            localStorage.removeItem('cartItems');
            localStorage.removeItem('shipping');
            localStorage.removeItem('subtotal');

            state.shipping = 4.99;
            state.loading = false;
            state.cartItems = [];
            state.subtotal = 0;
            state.error = null;
        },
        cartItemRemove: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(item => item.id !== payload);
            updateLocalStorage(state.cartItems);

            state.subtotal = calculateSubtotal(state.cartItems);
            state.loading = false;
            state.error = null;
        },
        setShippingCosts: (state, { payload }) => {
            state.shipping = payload;
            localStorage.setItem('shipping', payload);
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        setLoading: state => {
            state.loading = true;
        }
    },
    name: 'cart',
    initialState
});

export const { setShippingCosts, cartItemRemove, cartItemAdd, setLoading, clearCart, setError } = cartSlice.actions;

export default cartSlice.reducer;
