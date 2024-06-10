import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { Heading, Stack, Flex, Box } from '@chakra-ui/react';

import OrderSummary from '../components/OrderSummary';
import ShippingInformation from '../components/ShippingInformation';

const CheckoutPage = () => {
    const { userInfo } = useSelector(state => state.user);
    const location = useLocation();

    return userInfo ? (
        <Box
            py={{ base: '6', lg: '12', md: '8' }}
            px={{ base: '4', lg: '12', md: '8' }}
            maxW={{ base: '3xl', lg: '7xl' }}
            minH="100vh"
            mx="auto"
        >
            <Stack align={{ lg: 'flex-start', base: 'revert' }} direction={{ base: 'column', lg: 'row' }} spacing="8">
                <Stack spacing={{ base: '8', md: '10' }} mb={{ md: 'none', base: '12' }} flex="1.5">
                    <Heading fontWeight="extrabold" fontSize="2xl">
                        Shipping Information
                    </Heading>
                    <Stack>
                        <ShippingInformation />
                    </Stack>
                </Stack>
                <Flex direction="column" align="center" flex="1">
                    <OrderSummary checkoutPage={true} />
                </Flex>
            </Stack>
        </Box>
    ) : (
        <Navigate state={{ from: location }} replace={true} to="/login" />
    );
};

export default CheckoutPage;
