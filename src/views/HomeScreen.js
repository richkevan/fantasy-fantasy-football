import React from 'react'
import {Box, Button, Center, Heading, SimpleGrid} from '@chakra-ui/core'
import Navbar from '../components/navigation/Navbar'
import {Link} from 'react-router-dom'


const HomeScreen = () => {

return (
    <React.Fragment>
    <Navbar/>
        <Center>
        <Box w="90%">
        <Heading>Welcome to Fantasy Fantasy Football</Heading>
        <Box m="20px">
            <Heading>Top Teams</Heading>
            <SimpleGrid columns={2} spacing={10}>
        <Box bg="purple.300" height="80px">#1</Box>
        <Box bg="purple.300" height="80px">#2</Box>
        <Box bg="purple.300" height="80px">#3</Box>
        <Box bg="purple.300" height="80px">#4</Box>
        <Box bg="purple.300" height="80px">#5</Box>
        <Box bg="purple.300" height="80px">#6</Box>
        <Box bg="purple.300" height="80px">#7</Box>
        <Box bg="purple.300" height="80px">#8</Box>
        <Box bg="purple.300" height="80px">#9</Box>
        <Box bg="purple.300" height="80px">#10</Box>
        </SimpleGrid>
        </Box>
        <Box m="20px">
            <Heading>Links</Heading>
        <SimpleGrid columns={2} spacing={10}>
        <Button><Link>Roster</Link></Button>
        <Button><Link>Game</Link></Button>
        <Button><Link to="/league">League</Link></Button>
        <Button><Link>Upcoming Games</Link></Button>
    </SimpleGrid>
        </Box>
    
    </Box>
    </Center>
    </React.Fragment>
)}

export default HomeScreen;