import React from 'react';
import { useState } from 'react';
import Navbar from '../components/navigation/Navbar';
import {
  Button,
  VStack,
  Collapse,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
} from '@chakra-ui/core';
const WelcomeScreen = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <>
      <Navbar />
      <VStack>
        <Button variantcolor="blue" onClick={handleToggle}>
          About the game
        </Button>
        <Collapse mt={4} isOpen={show}>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </Collapse>

        
        {/* //Team selection causes an error because of the CSS properties applied by <MenuList></MenuList> We will need to address that when/ if we an impliment user properties. */}
        
        {/* <Menu>
          <MenuButton as={Button}>Select Your Home Team</MenuButton>
          <MenuList>
            <MenuItem>Team 1</MenuItem> <MenuItem>Team 2</MenuItem>
            <MenuItem>Team 3</MenuItem> <MenuItem>Team 4</MenuItem>
            <MenuItem as="a" href="#">
              Team 5
            </MenuItem>
          </MenuList>
        </Menu> */}
      </VStack>
    </>
  );
};
export default WelcomeScreen;
