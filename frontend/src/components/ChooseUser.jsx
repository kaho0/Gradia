import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import studentImg from "/st.jpg"; // Add student image
import teacherImg from "/te.jpg"; // Add teacher image

const ChooseUser = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-900 p-10">
      <h1 className="font-ranch text-4xl text-white mb-8">Choose Your Role</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <UserCard>
          <ImageContainer>
            <Image src={studentImg} alt="Student" />
          </ImageContainer>
          <Content>
            <h2>Student</h2>
            <p>
              Access personalized learning resources, assignments, and real-time
              feedback to enhance your educational journey.
            </p>
            <StyledLink to="/student-signIn">Login as Student</StyledLink>
          </Content>
        </UserCard>
        <UserCard>
          <ImageContainer>
            <Image src={teacherImg} alt="Teacher" />
          </ImageContainer>
          <Content>
            <h2>Teacher</h2>
            <p>
              Manage classes, track student progress, and deliver impactful
              lessons with ease using our intuitive platform.
            </p>
            <StyledLink to="/teacher-signIn">Login as Teacher</StyledLink>
          </Content>
        </UserCard>
      </div>
    </div>
  );
};

export default ChooseUser;

// Styled Components
const UserCard = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  margin-right: 30px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-family: "Raleway", sans-serif;
    font-size: 2rem;
    color: #001f3f;
    margin-bottom: 10px;
  }

  p {
    font-family: "Raleway", sans-serif;
    font-size: 1rem;
    color: #555555;
    margin-bottom: 20px;
    line-height: 1.6;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background: #0074d9;
  color: white;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-family: "Raleway", sans-serif;
  text-decoration: none;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #005bb5;
  }
`;
