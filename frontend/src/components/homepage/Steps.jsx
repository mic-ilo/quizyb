import React from "react";
import styled from "styled-components";

const StepsSection = styled.div`
  text-align: center;
  margin: 1rem 5rem 7rem 5rem;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed whitesmoke;
  box-sizing: border-box;

`;

const StepHeader = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  margin-left: 50px;
  background-color: #f8b528;
  padding: 50px 80px 50px 50px;
  border-radius: 1rem;
  border: 5px solid black;
  box-shadow: 4px 8px 0px 0px rgba(0, 0, 0, 1.5);
  &:hover {
    transform: scale(1.01) translateY(-5px);
    /* border-bottom: 5px solid black; */
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  margin-left: 20px;
`;

const StepTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2px; 
`;

const StepText = styled.p`
  font-size: 16px;
  color: black;
  margin: 10px 0;
`;

const Steps = () => {
  return (
    <StepsSection>
      <div>
        <StepHeader>How QuizyB Works</StepHeader>
      </div>
      <StepsContainer>
        <Step>
          <StepTitle>Build a Quiz</StepTitle>
          <StepText>
            Create customized quizzes with our user-friendly quiz builder.
          </StepText>
        </Step>
        <Step>
          <StepTitle>Share the Code</StepTitle>
          <StepText>
            Share the unique quiz code with your participants.
          </StepText>
        </Step>
        <Step>
          <StepTitle>Take the Quiz</StepTitle>
          <StepText>
            Participants enter the code and start the interactive quiz
            experience.
          </StepText>
        </Step>
      </StepsContainer>
    </StepsSection>
  );
};

export default Steps;
