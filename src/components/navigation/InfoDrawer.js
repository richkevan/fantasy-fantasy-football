import React from 'react'
  import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure
  } from "@chakra-ui/core";
  import {FaInfo} from 'react-icons/fa'
  import '../../css/navigation.css'

  const InfoDrawer = () => {
      const {isOpen, onOpen, onClose} = useDisclosure()

      return (
          <>
        <Button onClick={onOpen} color="White" variant="link"><FaInfo/></Button>

          <Drawer isOpen={isOpen} size="xl" onClose={onClose} margin="30%">
          <DrawerOverlay />
              <DrawerContent>
                  <DrawerHeader>Game Information</DrawerHeader>
                  <DrawerCloseButton />
                  <DrawerBody>
                    Welcome to Fantasy, Fantasy Football.  What is this game you ask?
                    Imagine a mythical world of mystical creatures all competing in a game we all
                    love to watch in American Football.  Now imagine actually wagering on these mystery
                    teams and competing with other users.  Watch as an entire leauge is simulated where you
                    can bet on the outcome of each of the fantasy teams that are created.  We hope you 
                    enjoy your experience in the world of FFF !!
                    <br></br>
                    Please create New user or sign in using your Google account to get started

                    <img id="modalpic" src="https://tse2.mm.bing.net/th?id=OIP.2e9saQ7FGGWPvAzBluQU7wHaE8&pid=Api&P=0&w=244&h=163" 
                        alt="football"
                        margin="0 auto"
                        textAlign="center"
                        marginLeft="100px"></img>
                  </DrawerBody>
          </DrawerContent>
          </Drawer>
            </>
          )
  }

  export default InfoDrawer