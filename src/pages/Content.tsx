import React from 'react';
import { Link } from 'react-router-dom';

const Content = () => {
  return (
    <div>
      <div>my account</div>

      <Link to="/logout">Logout </Link>
    </div>
  );
};

export default Content;
