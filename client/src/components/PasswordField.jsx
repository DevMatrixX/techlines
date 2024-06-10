import { useState } from 'react';
import { useField, Field } from 'formik';
import { Input } from '@chakra-ui/input';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { InputRightElement, InputGroup, Button } from '@chakra-ui/react';
import { FormErrorMessage, FormControl, FormLabel } from '@chakra-ui/form-control';

const PasswordField = ({ placeholder, label, type, name }) => {
    const [field, meta] = useField({ placeholder, type, name });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl isInvalid={meta.error && meta.touched} mb="6">
            <FormLabel noOfLines={1}>{label}</FormLabel>
            <InputGroup>
                <Field
                    as={Input}
                    {...field}
                    type={showPassword ? 'text' : type}
                    placeholder={placeholder}
                    name={name}
                />
                <InputRightElement h="full">
                    <Button onClick={() => setShowPassword(!showPassword)} variant="ghost">
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default PasswordField;
