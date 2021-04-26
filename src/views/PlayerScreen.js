import React from 'react'
import {Box, Center, Heading, SimpleGrid} from '@chakra-ui/core'


const PlayerScreen = () => {

return (
    <React.Fragment>
        <Center>
        <Box w="90%">
        <Heading>Player page</Heading>
        <Box m="20px">
            <Heading>#Player Name Variable</Heading>   
            <SimpleGrid columns={2} spacing={10}>
            <Heading>Stat Label</Heading>
            <Heading>Stat Number</Heading>
        <Heading bg="purple.300" height="80px">height</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">weight</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">race</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">strength</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">running</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">passing</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">catching</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">sacks</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">tackles</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        <Heading bg="purple.300" height="80px">touchdowns</Heading>
        <Box bg="red.300" height="80px">#1</Box>
        </SimpleGrid>
        </Box>
    </Box>
    </Center>
    </React.Fragment>
)}

export default PlayerScreen;