import { useField, Field } from 'formik';
import { FormErrorMessage, FormControl, FormLabel, Input } from '@chakra-ui/react';

const TextField = ({ placeholder, label, type, name }) => {
    const [field, meta] = useField({ placeholder, type, name });

    return (
        <FormControl isInvalid={meta.error && meta.touched} mb="6">
            <FormLabel noOfLines={1}>{label}</FormLabel>
            <Field as={Input} {...field} placeholder={placeholder} name={name} type={type} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default TextField;
