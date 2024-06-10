import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SmallAddIcon, MinusIcon } from '@chakra-ui/icons';
import { BiCheckShield, BiPackage, BiSupport } from 'react-icons/bi';
import { Textarea, useToast, Tooltip, Input } from '@chakra-ui/react';
import { SimpleGrid, Heading, Spinner, Stack, Image } from '@chakra-ui/react';
import { HStack, Alert, Badge, Flex, Text, Wrap, Box } from '@chakra-ui/react';
import { AlertDescription, AlertTitle, AlertIcon, Button } from '@chakra-ui/react';

import Star from '../components/Star';
import { createProductReview, getProduct } from '../redux/actions/productActions';

const ProductPage = () => {
    const { reviewed, loading, product, error } = useSelector(state => state.product);
    const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const { userInfo } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [amount, setAmount] = useState(1);
    const [rating, setRating] = useState(1);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const { id } = useParams();
    const toast = useToast();

    useEffect(() => {
        dispatch(getProduct(id));

        setReviewBoxOpen(false);

        if (reviewed) {
            toast({ description: 'Product review saved.', status: 'success', isClosable: true });
            setReviewBoxOpen(false);
        }
    }, [dispatch, id, toast, reviewed]);

    const changeAmount = input => {
        input === 'plus' ? setAmount(amount + 1) : setAmount(amount - 1);
    };

    const hasUserReviewed = () => product.reviews.some(review => review.user === userInfo._id);

    const onSubmit = () => {
        setButtonLoading(true);

        dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
    };

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
            ) : (
                product && (
                    <Box
                        py={{ base: '6', lg: '12', md: '8' }}
                        px={{ base: '4', lg: '12', md: '8' }}
                        maxW={{ base: '3xl', lg: '5xl' }}
                        mx="auto"
                    >
                        <Stack direction={{ base: 'column', lg: 'row' }} align="flex-start">
                            <Stack mb={{ base: '12', md: 'none' }} pr={{ base: '0', md: 'row' }} flex="1.5">
                                {product?.productIsNew && (
                                    <Badge colorScheme="green" fontSize="0.8em" rounded="md" w="50px" p="2">
                                        New
                                    </Badge>
                                )}
                                {product.stock === 0 && (
                                    <Badge colorScheme="red" fontSize="0.8em" rounded="full" w="70px">
                                        sold out
                                    </Badge>
                                )}
                                <Heading fontWeight="extrabold" fontSize="2xl">
                                    {product.brand} {product.name}
                                </Heading>
                                <Stack spacing="5">
                                    <Box>
                                        <Text fontSize="xl">${product.price}</Text>
                                        <Flex>
                                            <HStack spacing="2px">
                                                <Star color="cyan.500" />
                                                <Star rating={product.rating} star={2} />
                                                <Star rating={product.rating} star={3} />
                                                <Star rating={product.rating} star={4} />
                                                <Star rating={product.rating} star={5} />
                                            </HStack>
                                            <Text fontWeight="bold" fontSize="md" ml="4px">
                                                {product.numberOfReviews} Reviews
                                            </Text>
                                        </Flex>
                                    </Box>
                                    <Text>{product.subtitle}</Text>
                                    <Text>{product.description}</Text>
                                    <Text fontWeight="bold">Quantity</Text>
                                    <Flex borderColor="gray.200" alignItems="center" border="1px" w="170px" p="5px">
                                        <Button onClick={() => changeAmount('minus')} isDisabled={amount <= 1}>
                                            <MinusIcon />
                                        </Button>
                                        <Text mx="30px">{amount}</Text>
                                        <Button
                                            onClick={() => changeAmount('plus')}
                                            isDisabled={amount >= product.stock}
                                        >
                                            <SmallAddIcon />
                                        </Button>
                                    </Flex>
                                    <Badge colorScheme="gray" textAlign="center" fontSize="lg" w="170px">
                                        In Stock: {product.stock}
                                    </Badge>
                                    <Button
                                        isDisabled={product.stock === 0}
                                        colorScheme="cyan"
                                        variant="outline"
                                        //onClick={() => {}}
                                    >
                                        Add to cart
                                    </Button>
                                    <Stack w="270px">
                                        <Flex alignItems="center">
                                            <BiPackage size="20px" />
                                            <Text fontWeight="medium" fontSize="sm" ml="2">
                                                Shipped in 2-3 days
                                            </Text>
                                        </Flex>
                                        <Flex alignItems="center">
                                            <BiCheckShield size="20px" />
                                            <Text fontWeight="medium" fontSize="sm" ml="2">
                                                2 year extended warranty
                                            </Text>
                                        </Flex>
                                        <Flex alignItems="center">
                                            <BiSupport size="20px" />
                                            <Text fontWeight="medium" fontSize="sm" ml="2">
                                                We're here for you 24/7
                                            </Text>
                                        </Flex>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Flex _dark={{ bg: 'gray.900' }} alignItems="center" direction="column" flex="1">
                                <Image
                                    fallbackSrc="https://via.placeholder.com/250"
                                    src={product.images[0]}
                                    alt={product.name}
                                    mb="30px"
                                />
                                <Image
                                    fallbackSrc="https://via.placeholder.com/250"
                                    src={product.images[1]}
                                    alt={product.name}
                                    mb="30px"
                                />
                            </Flex>
                        </Stack>
                        {userInfo && (
                            <>
                                <Tooltip
                                    label={hasUserReviewed() && 'You have already reviewed this product.'}
                                    fontSize="medium"
                                >
                                    <Button
                                        onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                                        isDisabled={hasUserReviewed()}
                                        colorScheme="cyan"
                                        my="20px"
                                        w="140px"
                                    >
                                        Write a review
                                    </Button>
                                </Tooltip>
                                {reviewBoxOpen && (
                                    <Stack mb="20px">
                                        <Wrap>
                                            <HStack spacing="2px">
                                                <Button onClick={() => setRating(1)} variant="outline">
                                                    <Star />
                                                </Button>
                                                <Button onClick={() => setRating(2)} variant="outline">
                                                    <Star rating={rating} star={2} />
                                                </Button>
                                                <Button onClick={() => setRating(3)} variant="outline">
                                                    <Star rating={rating} star={3} />
                                                </Button>
                                                <Button onClick={() => setRating(4)} variant="outline">
                                                    <Star rating={rating} star={4} />
                                                </Button>
                                                <Button onClick={() => setRating(5)} variant="outline">
                                                    <Star rating={rating} star={5} />
                                                </Button>
                                            </HStack>
                                        </Wrap>
                                        <Input
                                            onChange={e => setTitle(e.target.value)}
                                            placeholder="Review title (optional)"
                                        />
                                        <Textarea
                                            placeholder={`The ${product.brand} ${product.name} is...`}
                                            onChange={e => setComment(e.target.value)}
                                        />
                                        <Button
                                            onClick={() => onSubmit()}
                                            isLoading={buttonLoading}
                                            loadingText="Saving"
                                            colorScheme="cyan"
                                            w="140px"
                                        >
                                            Publish review
                                        </Button>
                                    </Stack>
                                )}
                            </>
                        )}
                        <Stack>
                            <Text fontWeight="bold" fontSize="xl">
                                Reviews
                            </Text>
                            <SimpleGrid minChildWidth="300px" spacingX="40px" spacingY="20px">
                                {product.reviews.map(review => (
                                    <Box key={product._id}>
                                        <Flex alignItems="center" spacing="2px">
                                            <Star color="cyan.500" />
                                            <Star rating={product.rating} star={2} />
                                            <Star rating={product.rating} star={3} />
                                            <Star rating={product.rating} star={4} />
                                            <Star rating={product.rating} star={5} />
                                            <Text fontWeight="semibold" ml="4px">
                                                {review.title && review.title}
                                            </Text>
                                        </Flex>
                                        <Box py="12px">{review.comment}</Box>
                                        <Text color="gray.400" fontSize="sm">
                                            by {review.name} {new Date(review.createdAt).toDateString()}
                                        </Text>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    </Box>
                )
            )}
        </Wrap>
    );
};

export default ProductPage;
