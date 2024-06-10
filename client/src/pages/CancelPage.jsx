import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';
import { Center, Button, Text, Box } from '@chakra-ui/react';

const CancelPage = () => {
    return (
        <Center flexDirection="column" h="100vh">
            <Text fontSize={{ base: 'md', lg: '4xl', md: 'xl' }}>You have canceled the payment process.</Text>
            <Box m="2">
                <BsBoxSeamFill size="50px" mt="2" />
            </Box>
            <Text>But we have saved your cart, just in case.</Text>
            <Button colorScheme="cyan" as={ReactLink} to="/cart" mt="2">
                Got to your cart
            </Button>
        </Center>
    );
};

export default CancelPage;
