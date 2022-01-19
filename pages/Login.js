import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../features/firebase";
const Login = () => {
  const hanldeLogin = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <LoginC>
      <Head>
        <title>Whatsapp| Login</title>
        <link rel="icon" href="/whatsapp.png" />
      </Head>
      <ContainerC>
        <Image src="/whatsapp2.png" alt="" width="30px" height="30px" />
        <TitleC>
          <h1>Join Whatsapp Today</h1>
        </TitleC>
        <ButtonC onClick={hanldeLogin}>Login With Google</ButtonC>
        <FotterTitleC>
          &copy; 2022 BY:{" "}
          <a
            href="https://www.mostafamohamed.ml/"
            rel="noreferrer"
            target="_blank"
          >
            Mostafa Mohamed &#9829;
          </a>
        </FotterTitleC>
      </ContainerC>
    </LoginC>
  );
};

export default Login;

const LoginC = styled.main`
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
  align-items: start;

  img {
    cursor: pointer;
    filter: invert(1);
    transition: all 200ms ease;
    &:hover {
      transform: rotate(30deg);
    }
  }
`;

const TitleC = styled.div`
  width: 100%;
  margin-top: 20px;
  > h1 {
    font-size: 21px;
    font-weight: 700;
  }
`;

const ButtonC = styled.button`
  padding: 10px;
  width: fit-content;
  border: none;
  outline-width: 0;
  border-radius: 4px;
  margin: 10px auto;
  cursor: pointer;
  transition: color 100ms linear;
  &:hover {
    background-color: #fff;
  }
`;

const FotterTitleC = styled.h4`
  width: fit-content;
  font-size: 16px;
  margin: 10px auto;
  font-weight: 300;
  a {
    cursor: pointer;
    margin-left: 2px;
    color: #818181;
    font-weight: 400;

    &:hover {
      color: #fff;
    }
  }
`;
