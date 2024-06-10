import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RadioGroup, Button, Radio, Flex, Box } from '@chakra-ui/react';
import { FormControl, Heading, VStack, Stack, Text } from '@chakra-ui/react';

import TextField from './TextField';
import { setShipping } from '../redux/actions/cartActions';
import { setAddress, setPayment } from '../redux/actions/orderActions';

const ShippingInformation = () => {
    const { shippingAddress } = useSelector(state => state.order);
    const { shipping } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const onSubmit = async values => {
        dispatch(setAddress(values));
        dispatch(setPayment());
    };

    return (
        <Formik
            validationSchema={Yup.object({
                postalCode: Yup.string().required('We need a postal code').min(2, 'This postal code is too short'),
                address: Yup.string().required('We need an address').min(2, 'This address is too short'),
                country: Yup.string().required('We need a country').min(2, 'This country is too short'),
                city: Yup.string().required('We need a city').min(2, 'This city is too short')
            })}
            initialValues={{
                postalCode: shippingAddress ? shippingAddress.postalCode : '',
                address: shippingAddress ? shippingAddress.address : '',
                country: shippingAddress ? shippingAddress.country : '',
                city: shippingAddress ? shippingAddress.city : ''
            }}
            onSubmit={onSubmit}
        >
            {formik => (
                <>
                    <VStack as="form">
                        <FormControl>
                            <TextField placeholder="Street Address" label="Street Address" name="address" />
                            <Flex>
                                <Box flex="1" mr="10">
                                    <TextField
                                        placeholder="Postal Code"
                                        label="Postal Code"
                                        name="postalCode"
                                        type="number"
                                    />
                                </Box>
                                <Box flex="2">
                                    <TextField placeholder="City" label="City" name="city" />
                                </Box>
                            </Flex>
                            <TextField placeholder="Country" label="Country" name="country" />
                        </FormControl>
                        <Box w="100%" pr="5">
                            <Heading fontWeight="extrabold" fontSize="2xl" mb="10">
                                Shipping Method
                            </Heading>
                            <RadioGroup
                                onChange={e => dispatch(setShipping(e === 'express' ? 14.99 : 4.99))}
                                defaultValue={shipping === 4.99 ? 'withoutExpress' : 'express'}
                            >
                                <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                                    <Stack spacing={{ base: '8', md: '10' }} flex="1.5" pr="10">
                                        <Box>
                                            <Radio value="express">
                                                <Text fontWeight="bold">Express 14.99</Text>
                                                <Text>Dispatched in 24 hours</Text>
                                            </Radio>
                                        </Box>
                                        <Stack spacing="6">Express</Stack>
                                    </Stack>
                                    <Radio value="withoutExpress">
                                        <Box>
                                            <Text fontWeight="bold">Standard 4.99</Text>
                                            <Text>Dispatched in 2-3 days</Text>
                                        </Box>
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                    </VStack>
                    <Flex direction={{ base: 'column', lg: 'row' }} alignItems="center" gap="2">
                        <Button colorScheme="cyan" variant="outline" as={ReactLink} to="/cart" w="100%">
                            Back to cart
                        </Button>
                        <Button
                            onClick={formik.handleSubmit}
                            colorScheme="cyan"
                            variant="outline"
                            as={ReactLink}
                            to="/payment"
                            w="100%"
                        >
                            Continue to Payment
                        </Button>
                    </Flex>
                </>
            )}
        </Formik>
    );
};

export default ShippingInformation;
