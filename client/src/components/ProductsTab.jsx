import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Table, Tbody, Thead, Text, Box, Th, Tr } from '@chakra-ui/react';
import { AlertDescription, AlertTitle, AlertIcon, useToast, Alert } from '@chakra-ui/react';
import { AccordionButton, AccordionPanel, AccordionItem, Accordion } from '@chakra-ui/react';

import AddNewProduct from './AddNewProduct';
import ProductTableItem from './ProductTableItem';
import { resetProductError, getProducts } from '../redux/actions/productActions';

const ProductsTab = () => {
    const { productUpdate, products } = useSelector(state => state.product);
    const { loading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        dispatch(getProducts());
        dispatch(resetProductError());

        if (productUpdate) {
            toast({ description: 'Products has been updated.', status: 'success', isClosable: true });
        }
    }, [dispatch, toast, productUpdate]);

    return (
        <Box>
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Ups!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {loading ? (
                <Box
                    backgroundColor="rgba(255, 255, 255, 0.7)"
                    justifyContent="center"
                    alignItems="center"
                    position="fixed"
                    height="100vh"
                    display="flex"
                    width="100vw"
                    zIndex="1000"
                    left="0"
                    top="0"
                >
                    <Spinner emptyColor="gray.200" color="cyan.500" thickness="2px" speed="0.65s" size="xl" />
                </Box>
            ) : (
                <Box>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box textAlign="right" flex="1">
                                        <Box>
                                            <Text fontWeight="bold" mr="8px">
                                                Add a new product
                                            </Text>
                                        </Box>
                                    </Box>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Table>
                                    <AddNewProduct />
                                </Table>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Images</Th>
                                <Th>Brand & Name</Th>
                                <Th>Stripe Id & Subtitle</Th>
                                <Th>Category & Price</Th>
                                <Th>Stock & new Badge</Th>
                                <Th>Description</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {products.length > 0 &&
                                products.map(product => <ProductTableItem product={product} key={product.id} />)}
                        </Tbody>
                    </Table>
                </Box>
            )}
        </Box>
    );
};

export default ProductsTab;
