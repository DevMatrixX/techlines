import { useDispatch } from 'react-redux';
import { AlertDialogHeader, AlertDialogBody, AlertDialog, Button } from '@chakra-ui/react';
import { AlertDialogContent, AlertDialogOverlay, AlertDialogFooter } from '@chakra-ui/react';

const ConfirmRemovalAlert = ({ itemToDelete, deleteAction, cancelRef, onClose, isOpen }) => {
    const dispatch = useDispatch();

    const onDeleteItem = () => {
        dispatch(deleteAction(itemToDelete._id));
        onClose();
    };

    return (
        <AlertDialog leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontWeight="bold" fontSize="lg">
                        Delete {itemToDelete.name}
                    </AlertDialogHeader>
                    <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button onClick={onDeleteItem} colorScheme="red" ml={3}>
                            Delete {itemToDelete.name}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default ConfirmRemovalAlert;
