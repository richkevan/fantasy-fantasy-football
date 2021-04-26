import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import {ColorModeSwitcher}  from '../../ColorModeSwitcher';
import { Heading, Box, Flex, Text, Button, Alert } from '@chakra-ui/core';
// import { functions } from '../../config/fbConfig';
import { useAuth } from '../../contexts/AuthContext';
import InfoDrawer from './InfoDrawer';



const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {' '}
    {children}{' '}
  </Text>
);
const Navbar = props => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
 
  const handleToggle = () => setShow(!show);

  // const tellMeIClicked = functions.httpsCallable('clickTest');

  // const handleClick = () => {
  //   tellMeIClicked().then(result => {
  //     console.log(result.data);
  //   });
  // };

  const handleLogout = async () => {
    setError('')
    try {
      await logout()
    } catch (error) {
      setError('Failed to log out') 
    }
    
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify={{ sm: 'space-between', md: 'center', lg: 'space-between' }}
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg">
            <Link to='/'>Fantasy Fantasy Football</Link>
          </Heading>
        </Flex>
        <Flex alignItems="center">
          <Button
            display={{ sm: 'block', md: 'none' }}
            bg="none"
            p={4}
            onClick={handleToggle}
            _hover={{ color: 'teal.500', bg: 'white' }}
          >
            <svg
              fill="currentColor"
              width="12px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Button>
        </Flex>
        {currentUser !== null ? <Box
          display={{ sm: show ? 'block' : 'none', md: 'flex' }}
          width={{ sm: 'full', lg: 'auto' }}
          alignItems="center"
          justifyContent={{ md: 'center', lg: 'flex-end' }}
          flexGrow={1}
          textAlign="center"
        >
          <MenuItems>
            <Link to="/schedule">Schedule</Link>
          </MenuItems>
          <MenuItems>
            <Link to="/profile">Profile</Link>
          </MenuItems>
          <MenuItems>
            <Link to="/games">Live Games</Link>
          </MenuItems>
          <MenuItems>
            <Link to="/league">League</Link>
          </MenuItems>
          <MenuItems>
            <Link to="/home">Home</Link>
          </MenuItems>
          <MenuItems>
            <ColorModeSwitcher/>
          </MenuItems>
          <MenuItems>
            <Link onClick={handleLogout} to="/">
              Log Out
            </Link>
          </MenuItems>
          {/* <MenuItems>
          <Button onClick={handleClick}>Click Me</Button>
        </MenuItems> */}
        <MenuItems>
        {currentUser ? "User: " + currentUser.email : ''}
        </MenuItems>
        </Box>    : <InfoDrawer />}
      </Flex>


      {error && <Alert status="error">{error}</Alert>}
    </>
  );
};
export default Navbar;
