import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import bee from "../../assets/bee-cut.png";

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 50px;
  background-color: #f8b528;
  height: 100vh;
  position: relative;
  font-family: "Fredoka", sans-serif;
`;

const HeroHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Logo = styled.img`

  height: 80px;
  margin-top: 10px;
  margin-left: 0;
`;

const Button = styled.button`
  font-weight: bold;
  font-size: 16px;
  padding: 10px 25px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #00fa95;
    color: #260f08;
    border: 3px #260f08 solid;
    box-shadow: 4px 6px 0px 0px rgba(0, 0, 0, 1.5);
  }
`;

const LoginButton = styled(Button)`
  background-color: transparent;
  font-style: bold;
`;

const SignUpButton = styled(Button)`
  background-color: #260f08;
  color: white;
  border: 3px #260f08 solid;
  box-shadow: 4px 6px 0px 0px rgba(0, 0, 0, 1.5);
`;

const HeroBanner = styled.div`
  font-family: "Fredoka", sans-serif;
  text-align: left;
  position: relative;
  left: 100px;
  top: 85px;
  font-size: 4.5rem;
`;

const HeroTitle = styled.h1`
  font-size: inherit;
  line-height: 1.2;
  margin: 0;
  color: #260f08;
`;

const Bee = styled.img`
  height: 250px;
  position: absolute;
  top: 120px;
  right: 140px;
`;

// const Cta = styled.div`
//   position: relative;
//   left: 100px;
//   top: 110px;
//   margin-top: 45px;
// `;

const HomeBtn = styled.a`
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
  color: #260f08;
  background-color: white;
  padding: 20px 30px;
  text-decoration: none;
  border-radius: 20px;
  margin-top: 100px;
  border: 3px solid #260f08;
  box-shadow: 4px 8px 0px 0px rgba(0, 0, 0, 1.5);
  transition: background-color 0.4s ease, color 0.4s ease;

  &:hover {
    background-color: #fa85ee;
    color: #260f08;

  }
`;
const Hero = (props) => {
  const { login, signup } = props;
  return (
    <HeroSection>
      <HeroHeader>
        <Logo src={logo} alt="QuizyB Logo" />
        <ButtonsContainer>
          <LoginButton onClick={login}>Log In</LoginButton>
          <SignUpButton onClick={signup}>Sign Up</SignUpButton>
        </ButtonsContainer>
      </HeroHeader> 
      <Bee src={bee} alt="Bee" />
      <HeroBanner>
        <HeroTitle>Busy as a bee?</HeroTitle>
        <HeroTitle>Let's make quiz easy .</HeroTitle>
        <HomeBtn onClick={signup}>Get Started for Free &gt;&gt;&gt;</HomeBtn>
      </HeroBanner>
    </HeroSection>
  );
};

export default Hero;
