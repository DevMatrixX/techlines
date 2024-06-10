import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useParams } from 'react-router-dom';
import { AlertDescription, AlertTitle, AlertIcon, Alert } from '@chakra-ui/react';
import { useBreakpointValue, FormControl, useToast, Heading } from '@chakra-ui/react';
import { Container, VStack, Button, Center, Stack, Text, Box } from '@chakra-ui/react';

import PasswordField from '../components/PasswordField';
import { resetPassword, resetState } from '../redux/actions/userActions';

const PasswordResetPage = () => {
    const { serverMessage, serverStatus, loading, error } = useSelector(state => state.user);
    const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });
    const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
    const dispatch = useDispatch();
    const { token } = useParams();
    const toast = useToast();

    useEffect(() => {
        if (serverMessage && serverStatus) {
            toast({
                description: serverMessage,
                status: 'success',
                isClosable: true
            });

            dispatch(resetState());
        }
    }, [serverMessage, serverStatus, loading, error, dispatch]);

    return serverStatus ? (
        <Center minH="90vh">
            <VStack>
                <Text fontSize="xl" my="10">
                    Password reset successful!
                </Text>
                <Button colorScheme="cyan" variant="outline" as={ReactLink} to="/login" w="300px">
                    Log in
                </Button>
                <Button colorScheme="cyan" variant="outline" as={ReactLink} to="/products" w="300px">
                    Products
                </Button>
            </VStack>
        </Center>
    ) : (
        <Formik
            validationSchema={Yup.object({
                confirmPassword: Yup.string()
                    .min(6, 'Password is too short - must contain at least 6 character.')
                    .required('Password is required.')
                    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                password: Yup.string()
                    .min(6, 'Password is too short - must contain at least 6 character.')
                    .required('Password is required.')
            })}
            onSubmit={values => {
                dispatch(resetPassword(values.password, token));
            }}
            initialValues={{ password: '', email: '' }}
        >
            {formik => (
                <Container py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH="4xl" maxW="lg">
                    <Stack spacing="8">
                        <Stack spacing="6">
                            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                <Heading size={headingBR}>Reset your password</Heading>
                            </Stack>
                        </Stack>
                        <Box
                            boxShadow={{ base: 'none', md: 'xl' }}
                            px={{ base: '4', md: '10' }}
                            py={{ base: '0', md: '8' }}
                            bg={{ boxBR }}
                        >
                            <Stack onSubmit={formik.handleSubmit} spacing="6" as="form">
                                {error && (
                                    <Alert
                                        justifyContent="center"
                                        flexDirection="column"
                                        alignItems="center"
                                        textAlign="center"
                                        status="error"
                                    >
                                        <AlertIcon />
                                        <AlertTitle>We are sorry!</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                <Stack spacing="5">
                                    <FormControl>
                                        <PasswordField
                                            placeholder="Your password"
                                            label="New password"
                                            type="password"
                                            name="password"
                                        />
                                        <PasswordField
                                            placeholder="Confirm your new password"
                                            label="Confimr password"
                                            name="confirmPassword"
                                            type="password"
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack spacing="6">
                                    <Button
                                        isLoading={loading}
                                        colorScheme="cyan"
                                        type="submit"
                                        fontSize="md"
                                        size="lg"
                                    >
                                        Set new password
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            )}
        </Formik>
    );
};

export default PasswordResetPage;
