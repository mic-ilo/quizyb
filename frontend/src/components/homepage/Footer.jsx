import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";

const FooterSection = styled.div`
  display: flex;
  background-color: #f8b528;
  padding: 25px;
  color: #260f08;
`;

const LeftFooter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2px 30px;
  margin-right: 50px;
  text-decoration: none;
  list-style: none;
  color:inherit;
`;

const CenterFooter = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const RightFooter = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  text-decoration: none;
  list-style: none;
  color:inherit;
`;

const ColumnList = styled.ul`
  text-decoration: none;
  list-style: none;
  color:inherit;
  margin: 0;
  padding: 0;
  color: inherit;
`;

const ColumnListItem = styled.li`
  text-decoration: none;
  list-style: none;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const EmailLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIconContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: start;
  margin: 0;
  cursor: pointer;
`;

const Footer = (props) => {
  const { login, signup } = props;
  return (
    <FooterSection>
      <LeftFooter>
        <img
          src={logo}
          alt="QuizyB Logo"
          style={{ width: "80px", marginBottom: "0" }}
        />
        <p>
          Let’s make quiz fun and easy! 🐝 <br /> Whether you're buzzing with
          curiosity, need to bee smart in school, bee productive at work, or
          just bee entertained for fun, QuizyB is your go-to hive! Create
          customized quizzes effortlessly and let the fun begin. Bee quizzy, bee
          happy!
        </p>
      </LeftFooter>
      <CenterFooter>
        <Title>Useful Links</Title>
        <ColumnsContainer>
          <ColumnList>
            <ColumnListItem href="#home">Home</ColumnListItem>
            <ColumnListItem href="#usage">Usage</ColumnListItem>
            <ColumnListItem href="#steps">How it Works</ColumnListItem>
          </ColumnList>
          <ColumnList>
            <ColumnListItem onClick={login}>Log in</ColumnListItem>
            <ColumnListItem onClick={signup}>Sign Up</ColumnListItem>
            <ColumnListItem href="mailto:support@quizyb.com">Contact</ColumnListItem>
          </ColumnList>
        </ColumnsContainer>
      </CenterFooter>
      <RightFooter>
        <Title>Get in Touch</Title>
        <ContactItem>
          <EmailLink href="mailto:support@quizyb.com">
            support@quizyb.com
          </EmailLink>
        </ContactItem>
        <SocialIconContainer>
          <SocialIcon>
            <a href="https://www.instagram.com/quizyb">
              <img
                src={instagram}
                alt="Instagram"
                style={{ width: "32px", marginBottom: "0" }}
              />
            </a>
          </SocialIcon>
          <SocialIcon>
            <a href="https://www.facebook.com/quizyb">
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: "30px", marginBottom: "0" }}
              />
            </a>
          </SocialIcon>
        </SocialIconContainer>
      </RightFooter>
    </FooterSection>
  );
};

export default Footer;
