import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, FormLabel, Input, Button, Text, Alert } from '@chakra-ui/core';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../navigation/Navbar';
import firebase from 'firebase/app'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure

} from "@chakra-ui/core"



const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();   
  const { isOpen, onOpen, onClose } = useDisclosure()
  

const GoogleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then(async function(result) {
   const user = await result.user
    if(user.emailVerified){
      console.log("If executed")
      history.push('/profile')  
    }
    else{
      console.log("else executed")
      history.push('/profile')
    }
  
  }).catch(function(error) {
   console.error("error")
    // ...
  });

}
 

    

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/profile');
    } catch {
      setError('Failed to sign in');
      setLoading(false);
    }
  }

  return (
    <>
    <Button onClick={onOpen}>Log In</Button>

<Modal 
      isOpen={isOpen} 
      onClose={onClose}>
  <ModalOverlay>
    <ModalContent textAlign="center">
      <ModalHeader>Fantasy Fantasy Football</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Box>
        <Text fontSize="2xl">
          Please log in, or create an account to experience Fantasy Fantasy
          Football.
        </Text>
        <form onSubmit={handleSubmit}>
          {error && <Alert status="error">{error}</Alert>}
          <FormLabel>E-Mail</FormLabel>
          <Input placeholder="E-Mail" type="email" ref={emailRef} />
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" type="password" ref={passwordRef} />
          <br></br>
          <Button disabled={loading} type="submit">
            Log In
          </Button>
          
         
        </form>
      </Box>
      </ModalBody>

      <ModalFooter>
        <Button id="button" colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        
      </ModalFooter>
    </ModalContent>
  </ModalOverlay>
</Modal>
 
      
    </>
  );
};

export default Login;


