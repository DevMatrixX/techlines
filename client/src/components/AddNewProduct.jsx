import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, Textarea, Tooltip, VStack, Spacer } from '@chakra-ui/react';
import { FormLabel, Button, Switch, Input, Badge, Text, Tr, Td } from '@chakra-ui/react';

import { uploadProduct } from '../redux/actions/adminActions';

const AddNewProduct = () => {
    const [productIsNew, setProductIsNew] = useState(false);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageOne, setImageOne] = useState('');
    const [imageTwo, setImageTwo] = useState('');
    const [stripeId, setStripeId] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const createNewProduct = () => {
        dispatch(
            uploadProduct({
                images: [`/images/${imageOne}`, `/imagse/${imageTwo}`],
                productIsNew,
                description,
                stripeId,
                subtitle,
                category,
                brand,
                price,
                stock,
                name
            })
        );
    };

    return (
        <Tr>
            <Td>
                <Text fontSize="sm">Image File Name 1</Text>
                <Tooltip label={'Set the name of your first image e.g., iphone.jpg'} fontSize="sm">
                    <Input onChange={e => setImageOne(e.target.value)} value={imageOne} size="sm" />
                </Tooltip>
                <Spacer />
                <Text fontSize="sm">Image File Name 2</Text>
                <Tooltip label={'Set the name of your second image e.g., iphone.jpg'} fontSize="sm">
                    <Input onChange={e => setImageTwo(e.target.value)} value={imageTwo} size="sm" />
                </Tooltip>
            </Td>
            <Td>
                <Text fontSize="sm">Brand</Text>
                <Input
                    onChange={e => setBrand(e.target.value)}
                    placeholder="Apple or Samsung et."
                    value={brand}
                    size="sm"
                />
                <Text fontSize="sm">Name</Text>
                <Input onChange={e => setName(e.target.value)} placeholder="Iphone 15 pro" value={name} size="sm" />
            </Td>
            <Td>
                <Text fontSize="sm">Stripe Id</Text>
                <Input onChange={e => setStripeId(e.target.value)} value={stripeId} size="sm" />
                <Text fontSize="sm">Subtitle</Text>
                <Input
                    onChange={e => setSubtitle(e.target.value)}
                    placeholder="Iphone 15 pro..."
                    value={subtitle}
                    size="sm"
                />
            </Td>
            <Td>
                <Text fontSize="sm">Category</Text>
                <Input
                    onChange={e => setCategory(e.target.value)}
                    placeholder="Smartphone"
                    value={category}
                    size="sm"
                />
                <Text fontSize="sm">Price</Text>
                <Input onChange={e => setPrice(e.target.value)} placeholder="299.99" value={price} size="sm" />
            </Td>
            <Td>
                <Text fontSize="sm">Stock</Text>
                <Input onChange={e => setStock(e.target.value)} value={stock} size="sm" />
                <Text fontSize="sm">New Badge</Text>
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
            </Td>
            <Td>
                <Text fontSize="sm">Description</Text>
                <Textarea
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    value={description}
                    size="sm"
                    w="270px"
                    h="80px"
                />
            </Td>
            <Td>
                <VStack>
                    <Button onClick={createNewProduct} colorScheme="cyan" variant="outline" w="160px">
                        <Text ml="2">Save Product</Text>
                    </Button>
                </VStack>
            </Td>
        </Tr>
    );
};

export default AddNewProduct;
