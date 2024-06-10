import { useField, Field } from 'formik';
import { Input } from '@chakra-ui/input';
import { FormErrorMessage, FormControl, FormLabel } from '@chakra-ui/form-control';

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
