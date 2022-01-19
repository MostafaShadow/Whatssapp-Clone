import { ThreeBounce } from "better-react-spinkit";
import Image from "next/image";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingC>
      <ContainerC>
        <Image src="/whatsapp2.png" alt="" width="30px" height="30px" />
        <ThreeBounce
          color="#ddd"
          size={10}
          scaleEnd={1}
          style={{ marginTop: "20px" }}
        />
      </ContainerC>
    </LoadingC>
  );
};

export default Loading;

const LoadingC = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bgColor);
`;

const ContainerC = styled.div`
  text-align: center;
  color: var(--Color);
  width: 90%;
  max-width: 400px;
  height: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    cursor: pointer;
    filter: invert(1);
    transition: all 200ms ease;
    &:hover {
      transform: rotate(30deg);
    }
  }
`;
