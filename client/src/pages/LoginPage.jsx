import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { HStack, Button, Stack, Alert, Text, Box } from '@chakra-ui/react';
import { AlertIcon, Container, useToast, Heading } from '@chakra-ui/react';
import { AlertDescription, FormControl, AlertTitle } from '@chakra-ui/react';
import { Link as ReactLink, useLocation, useNavigate } from 'react-router-dom';

import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import { googleLogin, login } from '../redux/actions/userActions';
import PasswordForgottenForm from '../components/PasswordForgottenForm';

const LoginPage = () => {
    const { serverMessage, userInfo, loading, error } = useSelector(state => state.user);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirect = '/products';
    const toast = useToast();

    useEffect(() => {
        if (userInfo) {
            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                navigate(redirect);
            }

            toast({ description: 'Login successful', status: 'success', isClosable: true });
        }

        if (serverMessage) {
            toast({ description: serverMessage, status: 'success', isClosable: true });
        }
    }, [userInfo, redirect, navigate, error, serverMessage, showPasswordReset, toast, location.state]);

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async response => {
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userInfo', {
                    headers: { Authorization: `Bearer ${response.access_token}` }
                })
                .then(res => res.data);

            const { picture, email, name, sub } = userInfo;

            dispatch(googleLogin(sub, email, name, picture));
        }
    });

    return (
        <Formik
            validationSchema={Yup.object({
                password: Yup.string()
                    .min(6, 'Password is too short - must contain at least 6 character.')
                    .required('Password is required.'),
                email: Yup.string().email('Invalid email.').required('An email address is required.')
            })}
            onSubmit={values => {
                dispatch(login(values.email, values.password));
            }}
            initialValues={{ password: '', email: '' }}
        >
            {formik => (
                <Container py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH="4xl" maxW="lg">
                    <Stack spacing="8">
                        <Stack spacing="6">
                            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                <Heading fontSize={{ base: 'md', lg: 'xl' }}>Log in to your account</Heading>
                                <HStack justify="center" spacing="1">
                                    <Text>Don't have an account?</Text>
                                    <Button colorScheme="cyan" as={ReactLink} variant="link" to="/sign-up">
                                        Sign up
                                    </Button>
                                </HStack>
                            </Stack>
                        </Stack>
                        <Box
                            bg={{ base: 'transparent', md: 'bg-surface' }}
                            boxShadow={{ base: 'none', md: 'xl' }}
                            px={{ base: '4', md: '10' }}
                            py={{ base: '0', md: '8' }}
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
                                            placeholder="you@example.com"
                                            label="Email"
                                            name="email"
                                            type="text"
                                        />
                                        <PasswordField
                                            placeholder="your password"
                                            label="Password"
                                            type="password"
                                            name="password"
                                        />
                                        <Button
                                            onClick={() => setShowPasswordReset(!showPasswordReset)}
                                            colorScheme="cyan"
                                            variant="outline"
                                            size="sm"
                                            my="2"
                                        >
                                            Forgot Password ?
                                        </Button>
                                        {showPasswordReset && <PasswordForgottenForm />}
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
                                        Sign in
                                    </Button>
                                    <Button
                                        onClick={() => handleGoogleLogin()}
                                        leftIcon={<FcGoogle />}
                                        isLoading={loading}
                                        colorScheme="cyan"
                                        fontSize="md"
                                        size="lg"
                                    >
                                        Google sign in
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

export default LoginPage;
