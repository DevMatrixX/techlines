import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDisclosure, useToast, Spinner, Stack, Wrap } from '@chakra-ui/react';
import { TableContainer, Table, Thead, Tbody, Box, Tr, Th, Td } from '@chakra-ui/react';
import { AlertDescription, AlertTitle, AlertIcon, Button, Alert } from '@chakra-ui/react';

import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import { resetErrorAndRemoval, getAllUsers, deleteUser } from '../redux/actions/adminActions';

const UsersTab = () => {
    const { userRemoval, userList, loading, error } = useSelector(state => state.admin);
    const { userInfo } = useSelector(state => state.user);
    const [userToDelete, setUserToDelete] = useState('');
    const { onClose, isOpen, onOpen } = useDisclosure();
    const dispatch = useDispatch();
    const cancelRef = useRef();
    const toast = useToast();

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(resetErrorAndRemoval());

        if (userRemoval) {
            toast({ description: 'User has been removed', status: 'success', isClosable: true });
        }
    }, [dispatch, toast, userRemoval]);

    const openDeleteConfirmBox = user => {
        setUserToDelete(user);
        onOpen();
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
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Registered</Th>
                                    <Th>Admin</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {userList &&
                                    userList.map(user => (
                                        <Tr key={user._id}>
                                            <Td>
                                                {user.name} {user._id === userInfo._id ? '(You)' : ''}
                                            </Td>
                                            <Td>{user.email}</Td>
                                            <Td>{new Date(user.createdAt).toDateString()}</Td>
                                            <Td>{user.isAdmin ? <CheckCircleIcon color="cyan.500" /> : ''}</Td>
                                            <Td>
                                                <Button
                                                    onClick={() => openDeleteConfirmBox(user)}
                                                    isDisabled={user._id === userInfo._id}
                                                    leftIcon={<DeleteIcon />}
                                                    variant="outline"
                                                >
                                                    Remove User
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <ConfirmRemovalAlert
                        itemToDelete={userToDelete}
                        deleteAction={deleteUser}
                        cancelRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                    />
                </Box>
            )}
        </Box>
    );
};

export default UsersTab;
