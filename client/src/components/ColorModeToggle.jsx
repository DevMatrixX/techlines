import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, IconButton } from '@chakra-ui/react';

const ColorModeToggle = () => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <IconButton
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            aria-label="Color Mode Toggle"
            onClick={toggleColorMode}
            variant="ghost"
        ></IconButton>
    );
};

export default ColorModeToggle;
