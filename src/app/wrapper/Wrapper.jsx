import React from 'react';
import { Container } from 'reactstrap';

import './Wrapper.css';

const LayoutWrapper = ({ children, className }) => (
  <div className={`dbWrapper-layout ${className}`}>
    {children}
  </div>
);

const ContentWrapper = ({ children, className }) => (
  <div className={`dbWrapper-content ${className}`}>
    {children}
  </div>
);

const ContainerWrapper = ({ children, className, light, paddingTop, paddingBottom }) => (
  <div className={light ? 'dbWrapper-light' : undefined} style={{ paddingTop, paddingBottom }}>
    <Container className={className}>
      {children}
    </Container>
  </div>
);

const Wrapper = (props) => {
  if (props.layout) {
    return <LayoutWrapper {...props} />;
  } else if (props.content) {
    return <ContentWrapper {...props} />;
  } else {
    return <ContainerWrapper {...props} />;
  }
};

export default Wrapper;
