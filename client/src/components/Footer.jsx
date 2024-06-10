import { BsPhoneFlip } from 'react-icons/bs';
import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';
import { Input, Stack, Text, Flex, Icon, Box } from '@chakra-ui/react';
import { IconButton, Container, Divider, Button } from '@chakra-ui/react';
import { useColorModeValue as mode, ButtonGroup } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bg={mode('cyan.300', 'gray.900')} w="100%">
            <Container as="footer" maxW="7xl">
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    py={{ base: '12', md: '16' }}
                    justify="space-between"
                    spacing="8"
                >
                    <Stack spaincg={{ base: '6', md: '8' }} align="center">
                        <Flex alignItems="center">
                            <Icon color={mode('black', 'yellow')} as={BsPhoneFlip} h="10" w="10" />
                            <Text fontWeight="extrabold" fontSize="2xl">
                                Tech lines
                            </Text>
                        </Flex>
                        <Text color="muted">We love phones.</Text>
                    </Stack>
                    <Stack
                        direction={{ base: 'column:reverse', md: 'column', lg: 'row' }}
                        spacing={{ base: '12', md: '8' }}
                    >
                        <Stack direction="row" spacing="8">
                            <Stack spacing="4" minW="36" flex="1">
                                <Text fontWeight="semibold" color="subtle" fontSize="sm">
                                    Product
                                </Text>
                                <Stack shouldWrapChildren spacing="3">
                                    <Button variant="link">How it works</Button>
                                    <Button variant="link">Pricing</Button>
                                </Stack>
                            </Stack>
                            <Stack spacing="4" minW="36" flex="1">
                                <Text fontWeight="semibold" color="subtle" fontSize="sm">
                                    Legal
                                </Text>
                                <Stack shouldWrapChildren spacing="3">
                                    <Button variant="link">Privacy</Button>
                                    <Button variant="link">Terms</Button>
                                    <Button variant="link">License</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack spacing="4">
                            <Text fontWeight="semibold" color="subtle" fontSize="sm">
                                Stay up to date
                            </Text>
                            <Stack direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }} spacing="4">
                                <Input placeholder="Enter your email" type="email" required />
                                <Button variant="primary" flexShrink="0" type="submit">
                                    Subscribe
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider />
                <Stack
                    direction={{ base: 'column-reverse', md: 'row' }}
                    justify="space-between"
                    align="center"
                    pb="12"
                    pt="8"
                >
                    <Text color="subtle" fontSize="sm">
                        &copy; {new Date().getFullYear()} Tech lines Inc. All rights reserved
                    </Text>
                    <ButtonGroup variant="ghost">
                        <IconButton icon={<FaLinkedin fontSize="1.25rem" />} href="#" as="a" />
                        <IconButton icon={<FaGithub fontSize="1.25rem" />} href="#" as="a" />
                        <IconButton icon={<FaFacebook fontSize="1.25rem" />} href="#" as="a" />
                    </ButtonGroup>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
