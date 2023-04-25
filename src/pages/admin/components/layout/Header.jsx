import { Flex, Spacer, IconButton, Icon, Drawer, DrawerOverlay, DrawerContent, useDisclosure, Text, Stack, DrawerCloseButton, Avatar, DrawerHeader, DrawerBody, Box, Heading, Tooltip, FormLabel, Switch, Button, DrawerFooter, useColorModeValue, useColorMode, HStack, Image } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../../../theme/ColorModeSwitcher";
import { RiFullscreenFill, RiMenu4Fill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiEdit2, FiLogOut } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { logout, reset } from "../../../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import logoYT from "../../../../assets/img/youtube-logo.png";

function Header({ onToggle }) {

    const sidebar = useDisclosure();

    const user = useSelector(state => state.auth.user);

    const handleFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    return (
        <Flex
            as="header"
            _dark={{
                bgColor: "primary.1100",
                color: "primary.100"
            }}
            bg="white"
            position={{
                base: "fixed",
                lg: "sticky"
            }}
            top="0"
            left="0"
            right="0"
            zIndex="sticky"
            px={5}
            py={2.5}
            align="center"
            justify="space-between"
            // ml={{
            //     base: 0,
            //     lg: isOpen ? "60" : "0"
            // }}
            transition=".08s ease-out"
        >
            <IconButton
                display={{
                    base: "none",
                    lg: "inline-flex"
                }}
                size={'md'}
                rounded={'full'}
                onClick={() => { onToggle(); }}
                variant="ghost"
                colorScheme="gray"
                aria-label="Toggle navigation"
                icon={<Icon fontSize={24} as={HamburgerIcon} />}
            />
            <Image
                src={logoYT}
                display={{
                    base: "none",
                    lg: "inline-flex"
                }}
                alt="Logo"
                maxW={20}
                w="20"
                h="auto"
                ml={3}
            />
            <Spacer />

            {/* Add other header elements here */}

            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton
                        size={'lg'}
                    />
                    <Stack
                        spacing={0}
                        align="center"
                        justify="center"
                        direction="column"
                        h="100%"
                        w="100%"
                        p={10}
                    >
                        <Text>
                            Dashboard
                        </Text>
                    </Stack>
                </DrawerContent>
            </Drawer>

            <IconButton
                aria-label="Menu"
                display={{ base: "flex", lg: "none" }}
                onClick={sidebar.onOpen}
                fontSize="xl"
                variant="ghost"
                rounded={'full'}
                icon={<RiMenu4Fill />}
            />

            <Flex alignSelf="center" verticalAlign={'center'} justify={'flex-end'} justifyContent={{ base: "flex-end", lg: "space-between" }} w={'full'} display="inline-flex">
                <HStack display={{ base: "none", lg: "flex" }} ml={242}>
                </HStack>
                <HStack spacing={4}>
                    <IconButton
                        aria-label="Full Screen"
                        fontSize="xl"
                        variant="ghost"
                        rounded={'full'}
                        icon={<RiFullscreenFill />}
                        colorScheme="gray"
                        onClick={handleFullScreen}
                    />
                    <ColorModeSwitcher />
                    <DrawerExample user={user?.data} />
                </HStack>
            </Flex>
        </Flex>
    );
}

export default Header;



function DrawerExample({ user }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { toggleColorMode } = useColorMode();

    const bgTransparency = useColorModeValue('rgba(0, 0, 0, .07)', 'rgba(255, 255, 255, .1)');

    const lightenDarkenColor = (colorCode, amount) => {

        let usePound = false;

        if (colorCode[0] === "#") {
            colorCode = colorCode.slice(1);
            usePound = true;
        }
        const num = parseInt(colorCode, 16);
        let r = (num >> 16) + amount;

        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        let b = ((num >> 8) & 0x00FF) + amount;

        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }

        let g = (num & 0x0000FF) + amount;

        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        let color = (g | (b << 8) | (r << 16)).toString(16);
        while (color.length < 6) {
            color = 0 + color;
        }
        return (usePound ? '#' : '') + color;
    }

    const bgColorModified = lightenDarkenColor(`${user?.brand_color}`, - 100);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    const handleClickTheme = (e) => {
        toggleColorMode();
    }

    const colorModeValue = localStorage.getItem('chakra-ui-color-mode');

    return (
        <>
            <Avatar
                src={user?.image}
                name={user?.name}
                onClick={onOpen}
                objectFit='cover'
                borderColor={bgTransparency}
                color={'white'}
                fontWeight={'bold'}
                fontSize={'md'}
                size={'sm'}
                // w="10"
                // h="10"
                rounded="full"
                cursor={'pointer'}
            />

            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
                size={'sm'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton size={'lg'} mt={1} />
                    <DrawerHeader borderBottomWidth='1px' _dark={{ bg: 'primary.900' }}>
                        Mi Perfil
                    </DrawerHeader>
                    <DrawerBody _dark={{ bg: 'primary.900' }}>
                        <Box bgColor={user?.brand_color ? bgColorModified : bgTransparency} h="160px" mx={-6} />
                        <Stack direction={'row'} align={'start'} justifyContent={'space-between'}>
                            <Avatar
                                src={user?.image}
                                name={user?.name}
                                size={'xl'}
                                mt={-14}
                                fontWeight={'extrabold'}
                                objectFit='cover'
                                color={'white'}
                                borderWidth={6}
                                borderColor={bgColorModified}
                            />
                        </Stack>
                        <Stack mt={4} spacing={6} alignSelf={'center'}>
                            <Stack spacing={2} direction="row" justifyContent={'space-between'}>
                                <Box>
                                    <Heading fontSize='xl' fontWeight='bold' textTransform={'capitalize'}>{user?.name}</Heading>
                                    <Text fontSize='md'>{user?.email}</Text>
                                </Box>
                                <Box alignSelf={'center'}>
                                    <Tooltip label="Editar y Ver Detalles" aria-label="Editar y Ver Detalles" alignSelf={'center'}>
                                        <Link as={NavLink} to={'/perfil'}>
                                            <IconButton aria-label="Editar y Ver Detalles" alignSelf={'center'} colorScheme="purple" _dark={{ bg: 'purple.600', color: 'white' }} icon={<FiEdit2 size={26} />} size={'lg'} />
                                        </Link>
                                    </Tooltip>
                                </Box>
                            </Stack>

                            <Box>
                                <Stack direction={{ base: 'column', lg: 'row' }} spacing={4} justifyContent={'space-between'} w={'full'}>
                                    <FormLabel htmlFor='theme'>Tema por defecto</FormLabel>
                                    <Switch isChecked={colorModeValue === 'dark' ? true : false} colorScheme='purple' size='lg' onChange={handleClickTheme} />
                                </Stack>
                                <Stack mt={4} direction={{ base: 'column', lg: 'row' }} spacing={4} justifyContent={'space-between'} w={'full'}>
                                    <Button
                                        _active={{
                                            bg: "purple.600",
                                            transform: "scale(0.95)",
                                            color: "white",
                                        }}
                                        isTruncated
                                        isActive={colorModeValue === 'light' ? true : false} variant='outline' colorScheme='gray' leftIcon={<FaSun />}>
                                        Claro
                                    </Button>
                                    <Button
                                        _active={{
                                            bg: "purple.600",
                                            transform: "scale(0.95)",
                                            color: "white",
                                        }}
                                        isTruncated
                                        isActive={colorModeValue === 'dark' ? true : false} variant='outline' colorScheme='gray' leftIcon={<FaMoon />}>
                                        Oscuro
                                    </Button>
                                </Stack>
                            </Box>

                            <Box>
                                <Heading fontSize='xl' fontWeight='bold'>Support</Heading>
                                <Text fontSize='md' color='gray.500' >Found an issue, have a question or just want to chat?</Text>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px' _dark={{ bg: 'primary.900' }}>
                        <Tooltip
                            label="Cerrar Sesión"
                            aria-label="Cerrar Sesión"
                            alignSelf={'center'}
                            placement={'top'}
                        >
                            <Button rightIcon={<FiLogOut />} size={'md'} bg='red.500' _hover={{ bg: 'red.700', color: 'white' }} color='white' _dark={{ bg: 'red.500', _hover: { bg: 'red.700', color: 'white' } }} variant={'solid'} onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                        </Tooltip>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}