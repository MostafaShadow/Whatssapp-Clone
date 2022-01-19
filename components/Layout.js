import styled from "styled-components";
import Sidebar from "./Sidebar";
const Layout = ({ children }) => {
  return (
    <LayoutC>
      <ContainerC>
        <Sidebar />
        <ChilldernC>{children}</ChilldernC>
      </ContainerC>
    </LayoutC>
  );
};

export default Layout;

const LayoutC = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bgColor);
  border: var(--Line);
`;

const ContainerC = styled.div`
  display: flex;
  width: 95%;
  margin: 20px auto;
  max-width: 1500px;
  border: var(--Line);
  border-radius: 6px;
  padding: 0px;
  height: 100%;
`;

const ChilldernC = styled.div`
  min-width: 500px;
  flex: 0.7;
`;
