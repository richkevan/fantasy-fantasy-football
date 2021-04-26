import React from 'react'
import {Box, Center, Heading, Link, List, ListItem, SimpleGrid} from '@chakra-ui/core'

const TeamScreen = () => {
    return(
    <React.Fragment>
        <Center>
            <Box w='90%'>
            <Heading>Team Name Variable</Heading>
            <Box m='20px'>
                <SimpleGrid columns={2} spacing={10} w='30%'>
                    <Heading bg='green.300'>Win</Heading>
                    <Heading bg='red.300'>Loss</Heading>
                    <Heading>3</Heading>
                    <Heading>7</Heading>
                </SimpleGrid>
            </Box>
            <Box m='20px'>
                <Heading bg='green.300'>Roster</Heading>
                {/* Map through team Roster */}
                <List>
                    <Link href='#' isExternal><ListItem>Player</ListItem></Link>
                </List>
            </Box>
            </Box>
        </Center>
    </React.Fragment>
    )}

    export default TeamScreen;