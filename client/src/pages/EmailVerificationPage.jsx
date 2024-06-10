import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Alert, Text, Box } from '@chakra-ui/react';
import { AlertDescription, AbsoluteCenter, AlertTitle, AlertIcon } from '@chakra-ui/react';

import { verifyEmail } from '../redux/actions/userActions';

const EmailVerificationPage = () => {
    const { loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { token } = useParams();

    useEffect(() => {
        dispatch(verifyEmail(token));
    }, [token, dispatch]);

    return (
        <Box position="relative" minH="3xl">
            <AbsoluteCenter axis="both">
                {loading ? (
                    <Box textAlign="center">
                        <Text fontSize="3xl">We are working on verifying your email.</Text>
                        <Spinner size="xl" />
                    </Box>
                ) : !error ? (
                    <Alert
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                        textAlign="center"
                        status="success"
                        bg="parent"
                    >
                        <AlertIcon boxSize="16" size="xl" />
                        <AlertTitle>Thanks for verifiyng your email.</AlertTitle>
                        <AlertDescription fontSize="xl">You can close this window now.</AlertDescription>
                    </Alert>
                ) : (
                    <Alert
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                        textAlign="center"
                        status="error"
                        bg="parent"
                    >
                        <AlertIcon boxSize="16" size="xl" />
                        <AlertTitle>We are sorry!</AlertTitle>
                        <AlertDescription fontSize="xl">{error}</AlertDescription>
                    </Alert>
                )}
            </AbsoluteCenter>
        </Box>
    );
};

export default EmailVerificationPage;
