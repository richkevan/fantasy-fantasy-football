import React from 'react';
import {
  Heading,
  Box,
  VStack,
  HStack,
  Text,
  Center,
  Flex,
  Avatar,
  AvatarBadge,
  Container,
  Icon,
} from '@chakra-ui/core';
import {
  GiAmericanFootballBall,
  GiPlainCircle,
  GiCircleClaws,
} from 'react-icons/gi';

export const GameCard = ({ game }) => {
  const gameID = game.id;
  const {
    homeTeam,
    awayTeam,
    hasStarted,
    ballPosition,
    homeTeamPossession,
    down,
    gameOver,
    eventLog,
    yardsToFirstDown,
  } = game.gameData;

  const displayDowns = down => {
    const downIcons = [];
    for (let i = 0; i < 4; i++) {
      if (i < down) {
        downIcons.push(
          <Icon
            as={GiPlainCircle}
            boxSize={6}
            color="green.500"
            key={`${gameID}-${i}`}
          />
        );
      } else {
        downIcons.push(
          <Icon as={GiCircleClaws} boxSize={6} key={`${gameID}-${i}`} />
        );
      }
    }
    return downIcons;
  };

  // TODO: Add space for location

  return (
    <Flex
      direction="column"
      maxW="lg"
      bg="orange.400"
      borderRadius={16}
      border="4px"
      borderColor="gray.700"
      h="sm"
      m={8}
    >
      <VStack w="full" flexGrow={1}>
        <Heading as="h2" size="xl" pt={2}>
          {!hasStarted ? 'Upcoming' : gameOver ? 'Final Score' : 'Live Game'}
        </Heading>
        {/* <Heading as="h6" size="lg">
          TI:ME
        </Heading> */}
        <HStack
          spacing={{
            base: 2,
            md: 6,
          }}
          justifyContent="space-around"
          w="full"
        >
          <Avatar
            width={{
              base: '64px',
              md: '96px',
            }}
            height={{
              base: '64px',
              md: '96px',
            }}
            bg="red.500"
            p={2}
            border="4px"
          >
            <AvatarBadge
              boxSize="1.75em"
              bg={homeTeamPossession ? 'green.500' : 'black'}
              border="4px"
            >
              {homeTeamPossession ? (
                <Icon as={GiAmericanFootballBall} boxSize={6} />
              ) : null}
            </AvatarBadge>
          </Avatar>
          <Heading as="h4" size="2xl">
            {homeTeam.score}
          </Heading>
          <VStack textAlign="center">
            <Center bg="gray.200" borderRadius="full" p={2} mb={2} mt={5}>
              <Text fontSize="xl">VS</Text>
            </Center>
            <Heading as="h6" size="sm">
              DOWN
            </Heading>
            <HStack s={1}>{displayDowns(down)}</HStack>
          </VStack>
          <Heading as="h4" size="2xl">
            {awayTeam.score}
          </Heading>
          <Avatar
            width={{
              base: '64px',
              md: '96px',
            }}
            height={{
              base: '64px',
              md: '96px',
            }}
            bg="blue.500"
            p={2}
            border="4px"
          >
            <AvatarBadge
              boxSize="1.75em"
              bg={!homeTeamPossession ? 'green.500' : 'black'}
              border="4px"
            >
              {!homeTeamPossession ? (
                <Icon as={GiAmericanFootballBall} boxSize={6} />
              ) : null}
            </AvatarBadge>
          </Avatar>
        </HStack>
        <Flex
          w="full"
          justifyContent="space-between"
          pl={4}
          pr={4}
          textAlign="center"
          alignItems="flex-end"
        >
          <Heading as="h3" size="lg" pb={1}>
            {homeTeam.teamName}
          </Heading>
          <Flex
            direction="column"
            border="2px"
            bg="orange.100"
            borderRadius="full"
            w="xs"
            align="center"
            justify="center"
            h={16}
          >
            <Heading as="h6" size="sm">
              {`YTG: ${yardsToFirstDown}`}
            </Heading>
            <Heading as="h6" size="sm">
              {`Ball On: ${ballPosition}`}
            </Heading>
          </Flex>
          <Heading as="h3" size="lg" pb={1}>
            {awayTeam.teamName}
          </Heading>
        </Flex>
        <Flex
          direction="column"
          w="full"
          flexGrow={1}
          textAlign="center"
          bg="gray.700"
          borderBottomLeftRadius={12}
          borderBottomRightRadius={12}
        >
          <Container
            w="full"
            centerContent
            border="2px"
            bg="gray.100"
            borderRadius="full"
          >
            <Heading as="h5" size="sm">
              Broadcast
            </Heading>
          </Container>
          <Box flexGrow={1}>
            <Text color="gray.200" mb={2}>
              {eventLog.slice(-1)}
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Flex>
  );
};
