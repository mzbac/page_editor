import React, { PropTypes } from 'react';

const Layout = props => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

Layout.propTypes = {};
export default Layout;
