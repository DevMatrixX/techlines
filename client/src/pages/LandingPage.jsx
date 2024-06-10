import { BsPhoneFlip } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import { HStack, Image, Stack, Icon, Link, Flex, Box } from '@chakra-ui/react';
import { useColorModeValue as mode, Skeleton, Heading, Text } from '@chakra-ui/react';

const LandingPage = () => {
    return (
        <Box p={{ base: '0', lg: '12' }} maxW="8xl" minH="6xl" mx="auto">
            <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={{ base: '0', lg: '20' }}>
                <Box
                    bg={{ base: mode('cyan.50', 'gray.700'), lg: 'transparent' }}
                    transform={{ base: 'translateY(-50%)', lg: 'none' }}
                    py={{ base: '6', lg: '12', md: '8' }}
                    mx={{ base: '6', md: '8', lg: '0' }}
                    px={{ base: '6', md: '8', lg: '0' }}
                    width={{ lg: 'sm' }}
                >
                    <Stack spacing={{ base: '8', lg: '10' }}>
                        <Stack spacing={{ base: '2', lg: '4' }}>
                            <Flex alignItems="center">
                                <Icon color={mode('cyan.500', 'yellow.200')} as={BsPhoneFlip} h={12} w={12} />
                                <Text fontWeigth="bold" fontSize="4xl">
                                    Tech lines
                                </Text>
                            </Flex>
                            <Heading fontWeight="normal" size="xl">
                                Refresh your equipment
                            </Heading>
                        </Stack>
                        <HStack spacing="3">
                            <Link color={mode('cyan.500', 'yellow.200')} as={ReactLink} to="/products">
                                Discover now
                            </Link>
                            <Icon color={mode('cyan.500', 'yellow.200')} as={FaArrowRight} />
                        </HStack>
                    </Stack>
                </Box>
                <Flex overflow="hidden" flex="1">
                    <Image
                        src={mode('images/landing-light.jpg', 'images/landing-dark.jpg')}
                        fallback={<Skeleton />}
                        objectFit="cover"
                        maxH="550px"
                        minW="300px"
                        flex="1"
                    />
                </Flex>
            </Stack>
        </Box>
    );
};

export default LandingPage;
