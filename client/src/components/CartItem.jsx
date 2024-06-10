import { useDispatch } from 'react-redux';
import { useColorModeValue as mode, CloseButton } from '@chakra-ui/react';
import { VStack, Spacer, Select, Image, Flex, Text } from '@chakra-ui/react';

import { removeCartItem, addCartItem } from '../redux/actions/cartActions';

const CartItem = ({ cartItem }) => {
    const { price, stock, brand, image, name, qty, id } = cartItem;
    const dispatch = useDispatch();

    return (
        <Flex borderWidth="1px" align="center" minW="300px" rounded="lg">
            <Image
                fallbackSrc="https://via.placeholder.com/150"
                rounded="lg"
                src={image}
                fit="cover"
                w="120px"
                h="120px"
            />
            <VStack align="stretch" spacing="4" w="100%" p="2">
                <Flex justify="space-between" alignItems="center">
                    <Text fontWeight="medum">
                        {brand} {name}
                    </Text>
                    <Spacer />
                    <CloseButton onClick={() => dispatch(removeCartItem(id))} />
                </Flex>
                <Spacer />
                <Flex justify="space-between" alignItems="center">
                    <Select
                        onChange={e => dispatch(addCartItem(id, e.target.value))}
                        focusBorderColor={mode('cyan.500', 'cyan.200')}
                        value={qty}
                        maxW="68px"
                    >
                        {[...Array(stock).keys()].map(item => (
                            <option value={item + 1} key={item + 1}>
                                {item + 1}
                            </option>
                        ))}
                    </Select>
                    <Text fontWeight="bold">${price}</Text>
                </Flex>
            </VStack>
        </Flex>
    );
};

export default CartItem;
