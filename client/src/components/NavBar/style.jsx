import styled from '@emotion/styled';

export const NavBarContainer = styled.nav`
  padding: 0.9rem 8rem;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #dadada;
`;

export const LogoContainer = styled.div`
  flex: 1;

  h1 {
    padding: 0.3rem 0.7rem;
    text-align: center;
  }
`;

export const MenuContainer = styled.div`
  flex: 7;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
