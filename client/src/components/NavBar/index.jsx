import { useState } from 'react';
import { Link } from 'react-router-dom';
import LeftMenu from './Menu/LeftMenu';
import RightMenu from './Menu/RightMenu';
import { NavBarContainer, LogoContainer, MenuContainer } from './style';

function NavBar(props) {
  const [userId, setUserId] = useState(false);

  return (
    <NavBarContainer>
      <LogoContainer>
        <h1>
          <Link to="/">Logo</Link>
        </h1>
      </LogoContainer>
      <MenuContainer>
        <LeftMenu />
        <RightMenu isAuth={userId} />
      </MenuContainer>
    </NavBarContainer>
  );
}

export default NavBar;
