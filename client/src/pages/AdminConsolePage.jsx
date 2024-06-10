import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { TabPanels, TabPanel, Heading } from '@chakra-ui/react';
import { TabList, Stack, Tabs, Box, Tab } from '@chakra-ui/react';

import UsersTab from '../components/UsersTab';
import OrdersTab from '../components/OrdersTab';
import ReviewsTab from '../components/ReviewsTab';
import ProductsTab from '../components/ProductsTab';

const AdminConsolePage = () => {
    const { userInfo } = useSelector(state => state.user);
    const location = useLocation();

    return userInfo && userInfo.isAdmin ? (
        <Box minH="100vh" p="20px">
            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                <Stack
                    spacing={{ base: '8', md: '10' }}
                    mb={{ base: '12', md: 'none' }}
                    pr={{ base: '0', md: '14' }}
                    flex="1.5"
                >
                    <Heading fontWeight="extrabold" fontSize="2xl">
                        Admin Console
                    </Heading>
                    <Tabs variant="enclosed" size="md">
                        <TabList>
                            <Tab>Users</Tab>
                            <Tab>Products</Tab>
                            <Tab>Reviews</Tab>
                            <Tab>Orders</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <UsersTab />
                            </TabPanel>
                            <TabPanel>
                                <ProductsTab />
                            </TabPanel>
                            <TabPanel>
                                <ReviewsTab />
                            </TabPanel>
                            <TabPanel>
                                <OrdersTab />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            </Stack>
        </Box>
    ) : (
        <Navigate state={{ from: location }} replace={true} to="/" />
    );
};

export default AdminConsolePage;
