import React from 'react';
import MenuItem from '../MenuItem';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

function LeftMenu() {
  return (
    <MenuList>
      <MenuItem>
        <Link to="/">HOME</Link>
      </MenuItem>
    </MenuList>
  );
}

const MenuList = styled.ul`
  align-items: center;
  display: flex;
`;

export default LeftMenu;
