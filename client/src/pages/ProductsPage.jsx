import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { AlertDescription, AlertTitle, AlertIcon } from '@chakra-ui/react';
import { WrapItem, Button, Center, Alert, Wrap, Box } from '@chakra-ui/react';

import ProductCard from '../components/ProductCard';
import { getProducts } from '../redux/actions/productActions';

const ProductsPage = () => {
    const { favoriteToggled, pagination, products, loading, error } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(1));
    }, [dispatch]);

    const paginationButtonClick = page => {
        dispatch(getProducts(page));
    };

    console.log({ error });

    return (
        <>
            {products.length > 0 && (
                <Box mt="7">
                    <Wrap mx={{ base: '12', md: '20', lg: '32' }} justify="center" minHeight="80vh" spacing="30px">
                        {error ? (
                            <Alert status="error">
                                <AlertIcon />
                                <AlertTitle>We are sorry</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        ) : (
                            products.map(product => (
                                <WrapItem key={product._id}>
                                    <Center h="450pxs" w="250px">
                                        <ProductCard product={product} loading={loading} />
                                    </Center>
                                </WrapItem>
                            ))
                        )}
                    </Wrap>
                    {!favoriteToggled && (
                        <Wrap justify="center" spacing="10px" p="5">
                            <Button onClick={() => paginationButtonClick(1)} colorScheme="cyan">
                                <ArrowLeftIcon />
                            </Button>
                            {Array.from(Array(pagination.totalPages), (e, i) => {
                                return (
                                    <Button
                                        colorScheme={pagination.currentPage === i + 1 ? 'cyan' : 'gray'}
                                        onClick={() => paginationButtonClick(i + 1)}
                                        key={i}
                                    >
                                        {i + 1}
                                    </Button>
                                );
                            })}
                            <Button onClick={() => paginationButtonClick(pagination.totalPages)} colorScheme="cyan">
                                <ArrowRightIcon />
                            </Button>
                        </Wrap>
                    )}
                    x
                </Box>
            )}
        </>
    );
};

export default ProductsPage;
