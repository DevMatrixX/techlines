import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Heading, HStack, Stack, Flex, Link, Box } from '@chakra-ui/react';
import { useColorModeValue as mode, Spinner, Wrap } from '@chakra-ui/react';
import { AlertDescription, AlertTitle, AlertIcon, Alert } from '@chakra-ui/react';

import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

const CartPage = () => {
    const { cartItems, loading, error } = useSelector(state => state.cart);

    const getHeadingContent = () => (cartItems.length === 1 ? '(1 item)' : `(${cartItems.length} items)`);

    return (
        <Wrap minHeight="100vh" justify="center" spacing="30px">
            {loading ? (
                <Stack direction="row" spacing="4">
                    <Spinner emptyColor="gray.200" color="cyan.500" thickness="2px" speed="0.65s" size="xl" mt="20" />
                </Stack>
            ) : error ? (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>We are sorry</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : cartItems.length <= 0 ? (
                <Alert status="warning">
                    <AlertIcon />
                    <AlertTitle>Your cart is empty.</AlertTitle>
                    <AlertDescription>
                        <Link as={ReactLink} to="/products">
                            Click here to see your products.
                        </Link>
                    </AlertDescription>
                </Alert>
            ) : (
                <Box w={{ base: '95%', md: '70%', lg: '50%' }} px="4" py="8">
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={{ base: '8', md: '16' }}
                        align={{ lg: 'flex-start' }}
                    >
                        <Stack spacing={{ base: '8', md: '10' }} flex="2">
                            <Heading fontWeight="extrabold" fontSize="2xl">
                                Shopping Cart
                            </Heading>
                            <Stack spacing="6">
                                {cartItems.map(cartItem => (
                                    <CartItem cartItem={cartItem} key={cartItem.id} />
                                ))}
                            </Stack>
                        </Stack>
                        <Flex direction="column" align="center" flex="1">
                            <OrderSummary />
                            <HStack fontWeight="semibold" mt="6">
                                <p>or</p>
                                <Link color={mode('cyan.500', 'cyan.200')} to="/api/products" as={ReactLink}>
                                    Continue Shopping
                                </Link>
                            </HStack>
                        </Flex>
                    </Stack>
                </Box>
            )}
        </Wrap>
    );
};

export default CartPage;
