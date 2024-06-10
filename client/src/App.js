import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Spinner, VStack } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CartPage from './pages/CartPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CancelPage from './pages/CancelPage';
import ProductPage from './pages/ProductPage';
import LandingPage from './pages/LandingPage';
import SuccessPage from './pages/SuccessPage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import YourOrdersPage from './pages/YourOrdersPage';
import AdminConsolePage from './pages/AdminConsolePage';
import PasswordResetPage from './pages/PasswordResetPage';
import EmailVerificationPage from './pages/EmailVerificationPage';

const App = () => {
    const [googleClient, setGoogleClient] = useState(null);

    useEffect(() => {
        const googleKey = async () => {
            const { data: googleId } = await axios.get('/api/config/google');
            setGoogleClient(googleId);
        };

        googleKey().catch(e => console.trace(e));
    }, [googleClient]);

    return (
        <ChakraProvider>
            {!googleClient ? (
                <VStack pt="37vh">
                    <Spinner emptyColor="gray.200" color="cyan.500" thickness="2px" speed="0.65s" size="xl" mt="20" />
                </VStack>
            ) : (
                <GoogleOAuthProvider clientId={googleClient}>
                    <ChakraProvider>
                        <Router>
                            <Header />
                            <main>
                                <Routes>
                                    <Route element={<LandingPage />} path="/" />
                                    <Route element={<CartPage />} path="/cart" />
                                    <Route element={<LoginPage />} path="/login" />
                                    <Route element={<CancelPage />} path="/cancel" />
                                    <Route element={<SignUpPage />} path="/sign-up" />
                                    <Route element={<SuccessPage />} path="/success" />
                                    <Route element={<ProductsPage />} path="/products" />
                                    <Route element={<CheckoutPage />} path="/checkout" />
                                    <Route element={<ProductPage />} path="/products/:id" />
                                    <Route element={<YourOrdersPage />} path="/order-history" />
                                    <Route element={<AdminConsolePage />} path="/admin-console" />
                                    <Route element={<PasswordResetPage />} path="/password-reset/:token" />
                                    <Route element={<EmailVerificationPage />} path="/email-verify/:token" />
                                </Routes>
                            </main>
                            <Footer />
                        </Router>
                    </ChakraProvider>
                </GoogleOAuthProvider>
            )}
        </ChakraProvider>
    );
};

export default App;
