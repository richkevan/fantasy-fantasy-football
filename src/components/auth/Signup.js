import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Alert,
} from '@chakra-ui/core';

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
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import '../../css/login.css'


const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const initialRef = useRef()
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure()

  
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);

      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/profile');
    } catch {
      setError(
        'Failed to create and account. Please check password length, Must be 6 characters or more'
      );
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Sign Up</Button>

      <Modal initialFocusRef={initialRef}
            isOpen={isOpen} 
            onClose={onClose}>
        <ModalOverlay>
          <ModalContent textAlign="center">
            <ModalHeader>Fantasy Fantasy Football</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box>
        <form onSubmit={handleSubmit}>
          <Heading>Sign Up</Heading>
          {error && <Alert status="error">{error}</Alert>}
          <FormLabel id="label" >E-Mail</FormLabel>
          <Input id="input" placeholder="E-Mail" type="email" ref={emailRef} />
          <FormLabel id="label" >Password</FormLabel>
          <Input id="input" placeholder="Password" type="password" ref={passwordRef} />
          <FormLabel id="label" >Confirm Password</FormLabel>
          <Input
            id="input"
            placeholder="Confirm Password"
            type="password"
            ref={passwordConfirmRef}
          />
          <br></br>
          <Button id="button" disabled={loading} type="submit">
            Sign Up
          </Button>
          {/* <Text></Text>
          Already have an account?{' '} */}
          {/* <br></br>
          <Button id="button"><Link to="/login">
            <Text color="teal.500">Log In</Text>
          </Link></Button> */}
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


      
      {/* <Button onClick={onOpen}>Current Users</Button> */}

    
      
    </>
)}



export default Signup;


{/* <Button variant="ghost">Secondary Action</Button> */}
 
