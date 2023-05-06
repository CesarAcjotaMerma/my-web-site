import React from 'react';
import { Container, Flex, useDisclosure } from '@chakra-ui/react'
import { Footer } from './Footer';
import SidebarContent from './Sidebar';
import { TopNav } from './TopNav';
import ScrollTopButton from './ScrollTopButton';

const Layout = ({ componente: Component }) => {

    const sidebar = useDisclosure();

    return (
        <Flex 
            direction="column" 
            flex="1"
            bg={'white'} 
            _dark={{ bg: 'primary.1200' }}
            minH="100vh"
            overflow="hidden"
        >
            <SidebarContent display={'none'} />
            <TopNav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen}/>
            <Flex as="main" role="main" direction="column" flex="1" py="5">
                <Container flex="1" maxW={'6xl'} mt={12}>
                    {Component}
                </Container>
            </Flex>
            <ScrollTopButton />
            <Footer />
        </Flex>
    )
}

export default Layout;