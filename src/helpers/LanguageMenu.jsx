import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import Flag from "react-flagkit";

function LanguageMenu({ display }) {
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const [shouldRefreshPage, setShouldRefreshPage] = useState(false);

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        localStorage.setItem("language", language);
        setShouldRefreshPage(true);
    };

    useEffect(() => {
        if (shouldRefreshPage) {
            window.location.reload();
            setShouldRefreshPage(false);
        }
    }, [shouldRefreshPage]);

    return (
        <Flex alignItems="center" alignSelf={'center'}>
            <Menu
                isLazy
                closeOnSelect={false}
                autoSelect={false}
                maxW={20}
                alignSelf={'center'}
            >
                <MenuButton
                    as={IconButton}
                    icon={<Flag country={selectedLanguage === "en" ? 'US' : "ES"} size={'sm'} />}
                    size={'md'}
                    rounded={'full'}
                    variant="ghost"
                    display={display}
                />
                <MenuList
                    boxShadow="md"
                    maxW={20}
                    _dark={{
                        bg: "primary.1000",
                        color: 'white',
                    }}
                >
                    <MenuItem
                        icon={<Flag country="US" />}
                        _dark={{ 
                            bg:selectedLanguage === "en" ? "primary.100" : "transparent",
                            color:selectedLanguage === "en" ? "white" : "inherit",
                            _hover: { bg: "primary.100" } 
                        }}
                        bg={selectedLanguage === "en" ? "primary.100" : "transparent"}
                        color={selectedLanguage === "en" ? "white" : "inherit"}
                        onClick={() => handleChangeLanguage("en")}
                        fontWeight={'bold'}
                    >
                        English
                    </MenuItem>
                    <MenuItem
                        _dark={{ 
                            bg:selectedLanguage === "es" ? "primary.100" : "transparent",
                            color:selectedLanguage === "es" ? "white" : "inherit",
                            _hover: { bg: "primary.100" } 
                        }}
                        bg={selectedLanguage === "es" ? "primary.100" : "transparent"}
                        color={selectedLanguage === "es" ? "white" : "inherit"}
                        icon={<Flag country="ES" />}
                        onClick={() => handleChangeLanguage("es")}
                        fontWeight={'bold'}
                    >
                        Español
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
}

export default LanguageMenu;