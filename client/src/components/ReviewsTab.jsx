import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast, Textarea, Spinner, Spacer, Stack, Wrap } from '@chakra-ui/react';
import { AccordionButton, AccordionPanel, AccordionItem, Accordion } from '@chakra-ui/react';
import { TableContainer, Table, Thead, Tbody, Text, Box, Tr, Th, Td } from '@chakra-ui/react';
import { AlertDescription, AlertTitle, AlertIcon, Button, Alert, Flex } from '@chakra-ui/react';

import { removeReview } from '../redux/actions/adminActions';
import { getProducts } from '../redux/actions/productActions';

const ReviewsTab = () => {
    const { reviewRemoval, products } = useSelector(state => state.product);
    const { loading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        dispatch(getProducts());

        if (reviewRemoval) {
            toast({ description: 'Review has been removed', status: 'success', isClosable: true });
        }
    }, [dispatch, toast, reviewRemoval, loading]);

    const onRemoveReview = (productId, reviewId) => {
        dispatch(removeReview(productId, reviewId));
    };

    return (
        <Box>
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Upps!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {loading ? (
                <Wrap justify="center">
                    <Stack direction="row" spacing="4">
                        <Spinner
                            emptyColor="gray.200"
                            color="cyan.500"
                            thickness="2px"
                            speed="0.65s"
                            size="xl"
                            mt="20"
                        />
                    </Stack>
                </Wrap>
            ) : (
                <Box>
                    {products.length > 0 &&
                        products.map(product => (
                            <Box key={product._id}>
                                <Accordion allowToggle>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex="1">
                                                    <Flex>
                                                        <Text fontWeight="bold" mr="8px">
                                                            {product.name}
                                                        </Text>
                                                        <Spacer />
                                                        <Text fontWeight="bold" mr="8px">
                                                            ({product.reviews.length} Reviews)
                                                        </Text>
                                                    </Flex>
                                                </Box>
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb="4">
                                            <TableContainer>
                                                <Table size="sm">
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Username</Th>
                                                            <Th>Rating</Th>
                                                            <Th>Title</Th>
                                                            <Th>Comment</Th>
                                                            <Th>Created</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {product.reviews.map(review => (
                                                            <Tr key={review._id}>
                                                                <Td>{review.name}</Td>
                                                                <Td>{review.rating}</Td>
                                                                <Td>{review.title}</Td>
                                                                <Td>
                                                                    <Textarea
                                                                        value={review.comment}
                                                                        isDisabled
                                                                        size="sm"
                                                                    />
                                                                </Td>
                                                                <Td>{new Date(review.createdAt).toDateString()}</Td>
                                                                <Td>
                                                                    <Button
                                                                        onClick={() =>
                                                                            onRemoveReview(product._id, review._id)
                                                                        }
                                                                        colorScheme="red"
                                                                        variant="outline"
                                                                    >
                                                                        Remove Review
                                                                    </Button>
                                                                </Td>
                                                            </Tr>
                                                        ))}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Box>
                        ))}
                </Box>
            )}
        </Box>
    );
};

export default ReviewsTab;
