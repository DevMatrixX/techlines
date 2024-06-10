import { TbTruckDelivery } from 'react-icons/tb';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { TableContainer, Table, Thead, Tbody, Box, Tr, Th, Td } from '@chakra-ui/react';
import { AlertDescription, AlertTitle, AlertIcon, Button, Alert } from '@chakra-ui/react';
import { useDisclosure, useToast, Spinner, Stack, Wrap, Text, Flex } from '@chakra-ui/react';

import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import { resetErrorAndRemoval, getAllOrders, setDelivered, deleteOrder } from '../redux/actions/adminActions';

const OrdersTab = () => {
    const { deliveredFlag, orderRemoval, loading, orders, error } = useSelector(state => state.admin);
    const [orderToDelete, setOrderToDelete] = useState('');
    const { onClose, isOpen, onOpen } = useDisclosure();
    const dispatch = useDispatch();
    const cancelRef = useRef();
    const toast = useToast();

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(resetErrorAndRemoval());

        if (orderRemoval) {
            toast({ description: 'Order has been removed', status: 'success', isClosable: true });
        }

        if (deliveredFlag) {
            toast({ description: 'Order has been set to delivered', status: 'success', isClosable: true });
        }
    }, [dispatch, toast, orderRemoval, deliveredFlag]);

    const openDeleteConfirmBox = order => {
        setOrderToDelete(order);
        onOpen();
    };

    const onSetToDelivered = order => {
        dispatch(resetErrorAndRemoval());
        dispatch(setDelivered(order._id));
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
                    <TableContainer>
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    <Th>Date</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Shipping</Th>
                                    <Th>Shipping price</Th>
                                    <Th>Total</Th>
                                    <Th>Delivered</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orders &&
                                    orders.map(order => (
                                        <Tr key={order._id}>
                                            <Td>{new Date(order.createdAt).toDateString()}</Td>
                                            <Td>{order.username}</Td>
                                            <Td>{order.email}</Td>
                                            <Td>
                                                <Text>
                                                    <i>Address:</i> {order.shippingAddress.address}
                                                </Text>
                                                <Text>
                                                    <i>City:</i> {order.shippingAddress.postalCode}{' '}
                                                    {order.shippingAddress.city}
                                                </Text>
                                                <Text>
                                                    <i>Country:</i> {order.shippingAddress.country}
                                                </Text>
                                            </Td>
                                            <Td>${order.shippingPrice}</Td>
                                            <Td>${order.totalPrice}</Td>
                                            <Td>
                                                {order.isDelivered ? <CheckCircleIcon color="cyan.500" /> : 'Pending'}
                                            </Td>
                                            <Td>
                                                <Flex direction="column">
                                                    <Button
                                                        onClick={() => openDeleteConfirmBox(order)}
                                                        variant="outline"
                                                    >
                                                        <DeleteIcon mr="5px" /> Remove Order
                                                    </Button>
                                                    {!order.isDelivered && (
                                                        <Button
                                                            onClick={() => onSetToDelivered(order)}
                                                            variant="outline"
                                                            mt="4px"
                                                        >
                                                            <TbTruckDelivery />
                                                            <Text ml="5px">Delivered</Text>
                                                        </Button>
                                                    )}
                                                </Flex>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <ConfirmRemovalAlert
                        itemToDelete={orderToDelete}
                        deleteAction={deleteOrder}
                        cancelRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                    />
                </Box>
            )}
        </Box>
    );
};

export default OrdersTab;
