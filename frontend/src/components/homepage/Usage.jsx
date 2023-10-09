import React from "react";
import styled from 'styled-components';

import schoolIcon from "../../assets/school.png";
import workIcon from "../../assets/work.png";
import funIcon from "../../assets/fun.png";

const UsageSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin: 5rem 5rem 7rem 5rem;
 
`;

const UsageCategory = styled.div`
  height: fit-content;
  padding: 20px;
  background: white;
  // border-top: 10px solid #F8B528;
  transition: all 0.4s ease;
  cursor: pointer;
  border-radius: 1rem;
  text-align: center;
  border: 5px solid black;
  box-shadow: 4px 8px 0px 0px rgba(0, 0, 0, 1.5);

  img {
    width: 50px;
  }

  h4 {
    font-size: 20px;
    font-weight: 700;
    margin: 15px 0;
    transition: all 0.4s ease;
  }

  p {
    font-size: 16px;
    font-weight: light;
    line-height: 25px;
  }

  &:hover {
    transform: scale(1.01) translateY(-5px);
    &:hover {
      background-color: #F8B528;
      color: #260F08;
    }
    /* border-bottom: 5px solid black; */
  }
`;

const Usage = () => {
  return (
    <UsageSection>
      
      <UsageCategory>
        <img src={schoolIcon} alt="School Icon" />
        <h4>Quiz for School</h4>
        <p>Engaging quizzes designed for educational purposes.</p>
      </UsageCategory>
      <UsageCategory>
        <img src={workIcon} alt="Work Icon" />
        <h4>Quiz for Work</h4>
        <p>Boost productivity with informative quizzes for your team.</p>
      </UsageCategory>
      <UsageCategory>
        <img src={funIcon} alt="Fun Icon" />
        <h4>Quiz for Fun</h4>
        <p>Enjoy entertaining quizzes with friends, family and everybody.</p>
      </UsageCategory>
    </UsageSection>
  );
};

export default Usage;
