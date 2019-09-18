import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading } from 'rebass';

import { Container } from '../primitives';
import Auth from '../stores/auth';

const Header: React.FC = () => {
  return (
    <Box bg="primary" py={4}>
      <Container>
        <Flex>
          <Link to="/">
            <Heading as="h1">Sky </Heading>
          </Link>
          <Flex flex={1}></Flex>
          <Flex>
           {Auth.isAuthenticated && <Link to="/logout">Logout </Link>} 
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default observer(Header);
