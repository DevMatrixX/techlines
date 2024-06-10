import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Stack, Text, Box } from '@chakra-ui/react';

import { sendResetEmail } from '../redux/actions/userActions';

const PasswordForgottenForm = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleChange = e => {
        setEmail(e.target.value);
    };

    return (
        <>
            <Box my="4">
                <Text as="b">Enter your email address below.</Text>
                <Text>We'll send you an email with a link to reset your password</Text>
            </Box>
            <Stack>
                <Input
                    placeholder="Your email address"
                    onChange={e => handleChange(e)}
                    value={email}
                    label="Email"
                    name="email"
                    type="text"
                    mb="4"
                />
                <Button onClick={() => dispatch(sendResetEmail(email))} colorScheme="yellow" fontSize="md" size="lg">
                    Send Reset Email
                </Button>
            </Stack>
        </>
    );
};

export default PasswordForgottenForm;
