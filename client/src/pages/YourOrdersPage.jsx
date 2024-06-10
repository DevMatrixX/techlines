import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { UnorderedList, ListItem, Spinner, Button, Stack } from '@chakra-ui/react';
import { TableContainer, Thead, Tbody, Table, Wrap, Tr, Th, Td } from '@chakra-ui/react';
import { AlertDescription, AlertTitle, AlertIcon, Heading, Alert } from '@chakra-ui/react';

import { getUserOrders } from '../redux/actions/userActions';

const YourOrdersPage = () => {
    const { userInfo, loading, orders, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (userInfo) {
            dispatch(getUserOrders());
        }
    }, [dispatch, userInfo]);

    return userInfo ? (
        <>
            {loading ? (
                <Wrap direction="column" minHeight="100vh" justify="center" align="center" mt="20px">
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
            ) : error ? (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>We are sorry</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                orders && (
                    <>
                        <Heading fontWeight="bold" size="xl" mt="5">
                            Orders History
                        </Heading>
                        <TableContainer mt="10">
                            <Table variant="striped">
                                <Thead>
                                    <Tr>
                                        <Th>Order Id</Th>
                                        <Th>Order Date</Th>
                                        <Th>Paid Total</Th>
                                        <Th>Items</Th>
                                        <Th>Print Receipt</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {orders.map(order => (
                                        <Tr key={order._id}>
                                            <Td>{order._id}</Td>
                                            <Td>{new Date(order.createdAt).toDateString()}</Td>
                                            <Td>${order.totalPrice}</Td>
                                            <Td>
                                                {order.orderItems.map(item => (
                                                    <UnorderedList key={item._id}>
                                                        <ListItem>
                                                            {item.qty} x {item.name} (${item.price} each)
                                                        </ListItem>
                                                    </UnorderedList>
                                                ))}
                                            </Td>
                                            <Td>
                                                <Button vraiant="outlice">Receipt</Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </>
                )
            )}
        </>
    ) : (
        <Navigate state={{ from: location }} replace={true} to="/login" />
    );
};

export default YourOrdersPage;
