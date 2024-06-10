import { useState } from 'react';
import { useEffect } from 'react';
import { BiExpand } from 'react-icons/bi';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Badge, Text, Flex, Box } from '@chakra-ui/react';
import { IconButton, Skeleton, useToast, Tooltip } from '@chakra-ui/react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';

import { addCartItem } from '../redux/actions/cartActions';
import { removeFromFavorites, addToFavorites } from '../redux/actions/productActions';

const ProductCard = ({ product, loading }) => {
    const [cartPlusDisabled, setCartPlusDisabled] = useState(false);
    const { favorites } = useSelector(state => state.product);
    const { cartItems } = useSelector(state => state.cart);
    const [isShown, setIsShown] = useState(false);
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        const item = cartItems.find(cartItem => cartItem.id === product._id);

        if (item && item.qty === product.stock) {
            setCartPlusDisabled(true);
        }
    }, [product, cartItems]);

    const addItem = id => {
        if (cartItems.some(cartItem => cartItem.id === id)) {
            const item = cartItems.find(cartItem => cartItem.id === id);

            dispatch(addCartItem(id, item.qty + 1));
        } else {
            dispatch(addCartItem(id, 1));
        }
        toast({ description: 'Item has been added', status: 'success', isClosable: true });
    };

    return (
        <Skeleton _hover={{ size: 1.5 }} isLoaded={!loading}>
            <Box
                _hover={{ transitionDuration: '0.5s', transform: 'scale(1.1)' }}
                borderWidth="1px"
                overflow="hidden"
                shadow="md"
                p="4"
            >
                <Image
                    src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
                    fallbackSrc="https://via.placeholder.com/150"
                    onMouseLeave={() => setIsShown(false)}
                    onMouseEnter={() => setIsShown(true)}
                    alt={product.name}
                    height="200px"
                />
                {product.stock < 5 ? (
                    <Badge colorScheme="yellow">only {product.stock} left</Badge>
                ) : product.stock < 1 ? (
                    <Badge colorScheme="red">Sold out</Badge>
                ) : (
                    <Badge colorScheme="green">In Stock</Badge>
                )}
                {product?.productIsNew && (
                    <Badge colorScheme="purple" ml="2">
                        New
                    </Badge>
                )}
                <Text fontWeight="semibold" noOfLines={1} fontSize="xl" mt="2">
                    {product.brand} {` `} {product.name}
                </Text>
                <Text color="gray.600" noOfLines={1} fontSize="md">
                    {product.subtitle}
                </Text>
                <Flex justify="space-between" alignItems="center" mt="2">
                    <Badge colorScheme="cyan">{product.category}</Badge>
                    <Text fontWeight="semibold" color="cyan.600" fontSize="xl">
                        ${product.price}
                    </Text>
                </Flex>
                <Flex justify="space-between" mt="2">
                    {favorites?.includes(product._id) ? (
                        <IconButton
                            icon={
                                <MdOutlineFavorite
                                    onClick={() => dispatch(removeFromFavorites(product._id))}
                                    size="20px"
                                />
                            }
                            aria-label="Favorite"
                            colorScheme="cyan"
                            size="sm"
                        />
                    ) : (
                        <IconButton
                            icon={
                                <MdOutlineFavoriteBorder
                                    onClick={() => dispatch(addToFavorites(product._id))}
                                    size="20px"
                                />
                            }
                            aria-label="Favorite Border"
                            colorScheme="cyan"
                            size="sm"
                        />
                    )}
                    <IconButton
                        to={`/products/${product._id}`}
                        icon={<BiExpand size="20" />}
                        aria-label="Bi Expand"
                        colorScheme="cyan"
                        as={ReactLink}
                        size="sm"
                    />
                    <Tooltip
                        label={
                            !cartPlusDisabled
                                ? 'You reached the maximum quantity jof the product.'
                                : product.stock <= 0
                                ? 'Out of stock'
                                : ''
                        }
                        isDisabled={!cartPlusDisabled}
                        hasArrow
                    >
                        <IconButton
                            isDisabled={cartPlusDisabled || product.stock <= 0}
                            icon={<TbShoppingCartPlus size="20" />}
                            onClick={() => addItem(product._id)}
                            aria-label="Shopping Cart Plus"
                            colorScheme="cyan"
                            size="sm"
                        />
                    </Tooltip>
                </Flex>
            </Box>
        </Skeleton>
    );
};

export default ProductCard;
