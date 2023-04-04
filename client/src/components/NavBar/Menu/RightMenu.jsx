import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import MenuItem from '../MenuItem';

function RightMenu({ isAuth }) {
  return (
    <MenuList>
      {isAuth ? (
        <>
          <MenuItem>
            <Link to="upload">Upload</Link>
          </MenuItem>
          <MenuItem>
            <Link to="logout">Logout</Link>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <Link to="login">login</Link>
          </MenuItem>
          <MenuItem>
            <Link to="signup">signup</Link>
          </MenuItem>
        </>
      )}
    </MenuList>
  );
}

const MenuList = styled.ul`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  background: transparent;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    color: #928e8e;
  }
`;

export default RightMenu;
