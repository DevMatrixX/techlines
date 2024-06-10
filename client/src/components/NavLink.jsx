import { IconButton } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const NavLink = ({ children, route }) => {
    return (
        <IconButton aria-label="Nav link" variant="ghost" as={ReactLink} to={route} px="2" py="1">
            {children}
        </IconButton>
    );
};

export default NavLink;
