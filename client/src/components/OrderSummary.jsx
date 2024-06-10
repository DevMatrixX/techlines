import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import { Button, Stack, Flex, Text } from '@chakra-ui/react';
import { useColorModeValue as mode, Heading } from '@chakra-ui/react';

const OrderSummary = ({ checkoutPage = false }) => {
    const { subtotal, shipping } = useSelector(state => state.cart);

    return (
        <Stack
            borderColor={mode('cyan.500', 'cyan.100')}
            borderWidth="1px"
            minWidth="300px"
            rounded="lg"
            spacing="6"
            w="full"
            p="8"
        >
            <Heading siza="md">Order Summary</Heading>
            <Stack spacing="6">
                <Flex justify="space-between">
                    <Text color={mode('gray.600', 'gray.400')} fontWeight="medium">
                        Subtotal
                    </Text>
                    <Text fontWeight="medium">${subtotal}</Text>
                </Flex>
                <Flex justify="space-between">
                    <Text color={mode('gray.600', 'gray.400')} fontWeight="medium">
                        Shipping
                    </Text>
                    <Text fontWeight="medium">${shipping}</Text>
                </Flex>
                <Flex justify="space-between">
                    <Text fontWeight="extrabold" fontSize="xl">
                        Total
                    </Text>
                    <Text fontWeight="medium">${subtotal + shipping}</Text>
                </Flex>
            </Stack>
            <Button
                rightIcon={<FaArrowRight />}
                hidden={checkoutPage}
                colorScheme="cyan"
                to="/checkout"
                as={ReactLink}
                size="lg"
            >
                Checkout
            </Button>
        </Stack>
    );
};

export default OrderSummary;
