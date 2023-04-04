import React from 'react';
import styled from 'styled-components';

function MenuItem({ children }) {
  return <ItemStyle>{children}</ItemStyle>;
}

const ItemStyle = styled.li`
  font-size: 15px;
  padding: 0.2em 1.2em;
  position: relative;
  top: 0;
  left: 0;

  &::before {
    content: '';
    width: 0%;
    height: 1px;
    position: absolute;
    bottom: -25px;
    left: 0;
    background: #8b8b8b;
  }

  &:hover {
    &::before {
      width: 100%;
    }
    a {
      color: #928e8e;
    }
  }
`;

export default MenuItem;
