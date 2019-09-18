import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import { Box, Link } from 'rebass';

const routes = [
  {
    path: '/',
    title: 'Profile',
  },
  {
    path: '/devices',
    title: 'Devices',
  },
  {
    path: '/occurences',
    title: 'Occurences',
  },
];
const Nav: React.FC = () => {
  return (
    <Box>
      {routes.map(route => (
        <Link
          key={route.path}
          p={4}
          as={(props: any) => (
            <RRLink to={route.path} {...props}>
              {route.title}
            </RRLink>
          )}
        ></Link>
      ))}
    </Box>
  );
};

export default Nav;
