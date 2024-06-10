import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';
import { Center, Button, Text, Box } from '@chakra-ui/react';

import { resetCart } from '../redux/actions/cartActions';

const SuccessPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetCart());
    }, [dispatch]);

    return (
        <Center flexDirection="column" h="100vh">
            <Text fontSize={{ base: 'md', lg: '4xl', md: 'xl' }}>Thank you for your order.</Text>
            <Box m="2">
                <BsBoxSeamFill size="50px" mt="2" />
            </Box>
            <Text>You can see your order in the order history.</Text>
            <Button to="/orders-history" colorScheme="cyan" as={ReactLink} mt="2">
                Check your order history
            </Button>
        </Center>
    );
};

export default SuccessPage;
