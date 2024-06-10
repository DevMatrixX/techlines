import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertIcon, Container, useToast } from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { Heading, Button, HStack, Alert, Stack, Text, Box } from '@chakra-ui/react';
import { useBreakpointValue, AlertDescription, FormControl, AlertTitle } from '@chakra-ui/react';

import TextField from '../components/TextField';
import { signUp } from '../redux/actions/userActions';
import PasswordField from '../components/PasswordField';

const SignUpPage = () => {
    const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });
    const { userInfo, loading, error } = useSelector(state => state.user);
    const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirect = '/products';
    const toast = useToast();

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
            toast({
                description: userInfo.firstLogin ? 'Account created. Welcome aboard.' : `Welcome back ${userInfo.name}`,
                status: 'success',
                isClosable: true
            });
        }
    }, [userInfo, redirect, error, navigate, toast]);

    return (
        <Formik
            validationSchema={Yup.object({
                confirmPassword: Yup.string()
                    .min(6, 'Password is too short - must contain at least 6 character.')
                    .required('Password is required.')
                    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                password: Yup.string()
                    .min(6, 'Password is too short - must contain at least 6 character.')
                    .required('Password is required.'),
                email: Yup.string().email('Invalid email').required('This email address is required.'),
                name: Yup.string().required('A name is required.')
            })}
            onSubmit={values => {
                dispatch(signUp(values.name, values.email, values.password));
            }}
            initialValues={{ password: '', email: '', name: '' }}
        >
            {formik => (
                <Container py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH="4xl" maxW="lg">
                    <Stack spacing="8">
                        <Stack spacing="6">
                            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                <Heading size={headingBR}>Create an account.</Heading>
                                <HStack justify="center" spacing="1">
                                    <Text color="muted">Already a user?</Text>
                                    <Button colorScheme="cyan" as={ReactLink} variant="link" to="/login">
                                        Sign in
                                    </Button>
                                </HStack>
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
                                        <TextField
                                            placeholder="Your first and last name."
                                            label="Full name"
                                            type="text"
                                            name="name"
                                        />
                                        <TextField
                                            placeholder="you@example.com"
                                            label="Email"
                                            name="email"
                                            type="text"
                                        />
                                        <PasswordField
                                            placeholder="Your password"
                                            label="Password"
                                            type="password"
                                            name="password"
                                        />
                                        <PasswordField
                                            placeholder="Confirm your new password"
                                            label="Confirm your password"
                                            name="confirmPassword"
                                            type="password"
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack spacing="6">
                                    <Button
                                        isLoading={loading}
                                        colorScheme="cyan"
                                        fontSize="md"
                                        type="submit"
                                        size="lg"
                                    >
                                        Sign up
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

export default SignUpPage;
