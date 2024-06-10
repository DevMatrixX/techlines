import { FcGoogle } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { BsPhoneFlip } from 'react-icons/bs';
import { TbShoppingCart } from 'react-icons/tb';
import { googleLogout } from '@react-oauth/google';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogInCircle, BiUserCheck } from 'react-icons/bi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { HStack, Stack, Flex, Icon, Text, Box } from '@chakra-ui/react';
import { useToast, Divider, Spacer, Image, Menu } from '@chakra-ui/react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MenuDivider, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { AlertDescription, AlertTitle, AlertIcon, Alert } from '@chakra-ui/react';
import { useColorModeValue as mode, useDisclosure, IconButton } from '@chakra-ui/react';

import NavLink from './NavLink';
import ColorModeToggle from './ColorModeToggle';
import { logout } from '../redux/actions/userActions';
import { toggleFavorites } from '../redux/actions/productActions';

const Links = [
    { route: '/products', name: 'Products' },
    { route: '/hot-deals', name: 'Hot Deals' },
    { route: '/contact', name: 'Contact' },
    { route: '/services', name: 'Services' }
];

const Header = () => {
    const { favoritesToggled } = useSelector(state => state.product);
    const { cartItems } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.user);
    const { onClose, isOpen, onOpen } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();

    const [showBanner, setShowBanner] = useState(userInfo ? !userInfo.active : false);

    useEffect(() => {
        if (userInfo && !userInfo.active) {
            setShowBanner(true);
        }
    }, [favoritesToggled, dispatch, userInfo]);

    const logoutHandler = () => {
        dispatch(logout());
        googleLogout();

        toast({
            description: 'You have been logged out',
            status: 'success',
            isClosable: true
        });
    };

    return (
        <>
            <Box bg={mode('cyan.300', 'gray.900')} px="4">
                <Flex justifyContent="space-between" alignItems="center" h="16">
                    <Flex display={{ base: 'flex', md: 'none' }} alignItems="center">
                        <IconButton
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            onClick={isOpen ? onClose : onOpen}
                            aria-label="HamburgerIcon"
                            bg="parent"
                            size="md"
                        />
                        <IconButton
                            icon={<TbShoppingCart size="20px" />}
                            aria-label="Shopping Cart"
                            position="absolute"
                            variant="ghost"
                            as={ReactLink}
                            to="/cart"
                            ml="12"
                        />
                        {cartItems.length > 0 && (
                            <Text
                                position="absolute"
                                fontStyle="italic"
                                fontWeight="bold"
                                fontSize="sm"
                                ml="74px"
                                mt="-6"
                            >
                                {cartItems.length}
                            </Text>
                        )}
                    </Flex>
                    <HStack alignItems="center" spacing="8">
                        <Box alignItems="center" as={ReactLink} display="flex" to="/">
                            <Icon color={mode('black', 'yellow.200')} as={BsPhoneFlip} h="6" w="6" />
                            <Text as="b">Tech Lines</Text>
                        </Box>
                        <HStack display={{ base: 'none', md: 'flex' }} spacing="4" as="nav">
                            {Links.map(link => (
                                <NavLink route={link.route} key={link.route}>
                                    <Text fontWeight="medium">{link.name}</Text>
                                </NavLink>
                            ))}
                            <Box>
                                {' '}
                                <IconButton
                                    icon={<TbShoppingCart size="20px" />}
                                    aria-label="Shopping Cart"
                                    variant="ghost"
                                    as={ReactLink}
                                    to="/cart"
                                />
                                {cartItems.length >= 0 && (
                                    <Text
                                        position="absolute"
                                        fontStyle="italic"
                                        fontWeight="bold"
                                        fontSize="sm"
                                        ml="26px"
                                        mt="-6"
                                    >
                                        {cartItems.length}
                                    </Text>
                                )}
                            </Box>
                            <ColorModeToggle />
                            {favoritesToggled ? (
                                <IconButton
                                    onClick={() => dispatch(toggleFavorites(false))}
                                    icon={<MdOutlineFavorite size="20px" />}
                                    aria-label="Favorite"
                                    variant="ghost"
                                />
                            ) : (
                                <IconButton
                                    onClick={() => dispatch(toggleFavorites(true))}
                                    icon={<MdOutlineFavoriteBorder size="20px" />}
                                    aria-label="Toggle Favorite"
                                    variant="ghost"
                                />
                            )}
                        </HStack>
                    </HStack>
                    <Flex alignItems="center">
                        {userInfo ? (
                            <Menu>
                                <MenuButton cursor="pointer" rounded="full" variant="link" minW="0">
                                    <HStack>
                                        {userInfo?.googleImage ? (
                                            <Image
                                                referrerPolicy="no-referrer"
                                                src={userInfo.googleImage}
                                                borderRadius="full"
                                                boxSize="40px"
                                            />
                                        ) : (
                                            <BiUserCheck size="30" />
                                        )}
                                        <ChevronDownIcon />
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <HStack>
                                        <Text as="i" pl="3">
                                            {userInfo.email}
                                            {userInfo.googleId && <FcGoogle />}
                                        </Text>
                                    </HStack>
                                    <Divider py="1" />
                                    <MenuItem as={ReactLink} to="/profile">
                                        Profile
                                    </MenuItem>
                                    <MenuItem to="/order-history" as={ReactLink}>
                                        Order History
                                    </MenuItem>
                                    {userInfo.isAdmin && (
                                        <>
                                            <MenuDivider />
                                            <MenuItem to="/admin-console" as={ReactLink}>
                                                <MdOutlineAdminPanelSettings />
                                                <Text ml="2">Admin Console</Text>
                                            </MenuItem>
                                        </>
                                    )}
                                    <MenuDivider />
                                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Menu>
                                <MenuButton
                                    icon={<BiLogInCircle siza="25px" />}
                                    cursor="pointer"
                                    as={IconButton}
                                    variant="ghost"
                                />
                                <MenuList>
                                    <MenuItem fontWeight="400" as={ReactLink} variant="link" to="/login" p="2">
                                        Sign in
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem fontWeight="400" variant="link" as={ReactLink} to="/sign-up" p="2">
                                        Sign up
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                    </Flex>
                </Flex>
                <Box display="flex">
                    {isOpen && (
                        <Box display={{ md: 'none' }} pb="4">
                            <Stack spacing="4" as="nav">
                                {Links.map(link => (
                                    <NavLink route={link.route} key={link.route}>
                                        <Text fontWeight="medium">{link.name}</Text>
                                    </NavLink>
                                ))}
                            </Stack>
                            {favoritesToggled ? (
                                <IconButton
                                    onClick={() => dispatch(toggleFavorites(false))}
                                    icon={<MdOutlineFavorite size="20px" />}
                                    aria-label="Favorite"
                                    variant="ghost"
                                />
                            ) : (
                                <IconButton
                                    onClick={() => dispatch(toggleFavorites(true))}
                                    icon={<MdOutlineFavoriteBorder size="20px" />}
                                    aria-label="Toggle Favorite"
                                    variant="ghost"
                                />
                            )}
                            <ColorModeToggle />
                        </Box>
                    )}
                </Box>
            </Box>
            {userInfo && !userInfo.active && showBanner && (
                <Box>
                    <Alert status="warning">
                        <AlertIcon />
                        <AlertTitle>Email not verified</AlertTitle>
                        <AlertDescription>You must verify your email address.</AlertDescription>
                        <Spacer />
                        <CloseIcon onClick={() => setShowBanner(false)} cursor="pointer" />
                    </Alert>
                </Box>
            )}
        </>
    );
};

export default Header;
