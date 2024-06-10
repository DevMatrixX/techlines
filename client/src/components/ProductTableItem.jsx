import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { Switch, VStack, Badge, Input, Flex, Td, Tr } from '@chakra-ui/react';
import { useDisclosure, FormControl, FormLabel, Textarea, Button } from '@chakra-ui/react';

import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import { deleteProduct, updateProduct } from '../redux/actions/adminActions';

const ProductTableItem = ({ product }) => {
    const [productIsNew, setProductIsNew] = useState(product.productIsNew);
    const [description, setDescription] = useState(product.description);
    const [imageOne, setImageOne] = useState(product.images[0]);
    const [imageTwo, setImageTwo] = useState(product.images[1]);
    const [category, setCategory] = useState(product.category);
    const [subtitle, setSubtitle] = useState(product.subtitle);
    const [stripeId, setStripeId] = useState(product.stripeId);
    const { onClose, isOpen, onOpen } = useDisclosure();
    const [brand, setBrand] = useState(product.brand);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [name, setName] = useState(product.name);
    const dispatch = useDispatch();
    const cancelRef = useRef();

    console.log({ imageTwo, imageOne, product });

    const onSaveProduct = () => {
        dispatch(
            updateProduct({
                id: product._id,
                productIsNew,
                description,
                imageOne,
                imageTwo,
                category,
                subtitle,
                stripeId,
                brand,
                stock,
                price,
                name
            })
        );
    };

    const onOpenConfirmBox = () => {
        onOpen();
    };

    return (
        <>
            <Tr>
                <Td>
                    <Flex direction="column" gap="2">
                        <Input onChange={e => setImageOne(e.target.value)} value={imageOne} size="sm" />
                        <Input onChange={e => setImageTwo(e.target.value)} value={imageTwo} size="sm" />
                    </Flex>
                </Td>
                <Td>
                    <Flex direction="column" gap="2">
                        <Input onChange={e => setBrand(e.target.value)} value={brand} size="sm" />
                        <Input onChange={e => setName(e.target.value)} value={name} size="sm" />
                    </Flex>
                </Td>
                <Td>
                    <Flex direction="column" gap="2">
                        <Input onChange={e => setStripeId(e.target.value)} value={stripeId} size="sm" />
                        <Input onChange={e => setSubtitle(e.target.value)} value={subtitle} size="sm" />
                    </Flex>
                </Td>
                <Td>
                    <Flex direction="column" gap="2">
                        <Input onChange={e => setCategory(e.target.value)} value={category} size="sm" />
                        <Input onChange={e => setPrice(e.target.value)} value={price} size="sm" />
                    </Flex>
                </Td>
                <Td>
                    <Flex direction="column" gap="2">
                        <Input onChange={e => setStock(e.target.value)} value={stock} size="sm" />
                        <FormControl alignItems="center" display="flex">
                            <FormLabel htmlFor="productIsNewFlag" fontSize="sm" mb="0">
                                <Badge colorScheme="green" fontSize="0.8em" rounded="full" px="1" mx="1">
                                    New
                                </Badge>
                            </FormLabel>
                            <Switch
                                onChange={() => setProductIsNew(!productIsNew)}
                                isChecked={productIsNew}
                                id="productIsNewFlag"
                            />
                        </FormControl>
                    </Flex>
                </Td>
                <Td>
                    <Textarea
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        w="270px"
                        size="sm"
                        h="80px"
                    />
                </Td>
                <Td>
                    <VStack>
                        <Button onClick={onOpenConfirmBox} variant="outline" colorScheme="red" w="160px">
                            <DeleteIcon mr="5px" />
                            Remove Product
                        </Button>
                        <Button onClick={onSaveProduct} colorScheme="green" variant="outline" w="160px">
                            <MdOutlineDataSaverOn style={{ marginRight: '5px' }} />
                            Save Changes
                        </Button>
                    </VStack>
                </Td>
            </Tr>
            <ConfirmRemovalAlert
                deleteAction={deleteProduct}
                itemToDelete={product}
                cancelRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
            />
        </>
    );
};

export default ProductTableItem;
