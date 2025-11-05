// src/pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

// -------------------- STYLED COMPONENTS --------------------

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  transition: background 0.4s ease;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 30px 60px;
  text-align: center;
`;

const DynamicHeader = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
`;

const SubHeader = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 48px 0 24px;
`;

const ResumeButton = styled.button`
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  padding: 16px 32px;
  border-radius: 14px;
  background: linear-gradient(90deg, #007aff, #00c6ff);
  box-shadow: 0 10px 30px rgba(0, 122, 255, 0.3);
  margin-bottom: 40px;
  transition: all 0.25s cubic-bezier(.2,.9,.3,1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 122, 255, 0.4);
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 24px;
  margin-top: 20px;
`;

const SubjectCard = styled.button`
  border: none;
  cursor: pointer;
  text-align: center;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.cardText};
  text-transform: uppercase;
  border-radius: 14px;
  padding: 24px;
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(8px) saturate(110%);
  box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.03);
  transition: transform 0.25s cubic-bezier(.2,.9,.3,1),
              box-shadow 0.25s ease,
              color 0.25s ease;

  &:hover,
  &:focus-visible {
    outline: none;
    transform: scale(1.05) translateY(-8px);
    color: ${({ theme }) => theme.text};
    box-shadow: 0 25px 45px rgba(0, 122, 255, 0.15),
                0 0 25px rgba(0, 122, 255, 0.25);
    border: 1px solid rgba(0,122,255,0.3);
    backdrop-filter: blur(12px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ScoresContainer = styled.section`
  margin-top: 64px;
  text-align: left;
`;

const ScoreList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ScoreItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.03);
  color: ${({ theme }) => theme.cardText};
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
  }

  span:nth-child(1) {
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.text};
  }

  span:nth-child(2) {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.score};
  }

  span:nth-child(3) {
    font-size: 14px;
    opacity: 0.6;
  }
`;

// -------------------- HELPER DATA --------------------

const subjects = [
  "java", "fullstack", "cp", "os", "dbms",
  "cn", "daa", "aptitude", "softskills"
];

const getGreetingMessage = (name) => {
  const hour = new Date().getHours();
  const lines = [
    "Ready for another challenge?",
    "Let’s crush another quiz today!",
    "Time to test your skills!",
    "Welcome back!",
  ];
  if (hour < 12) return `Good morning, ${name}! ${lines[0]}`;
  if (hour < 18) return `Good afternoon, ${name}! ${lines[1]}`;
  return `Good evening, ${name}! ${lines[2]}`;
};

const mockScores = [
  { id: 1, subject: "java", score: 85, date: "2025-11-04T10:30:00Z" },
  { id: 2, subject: "os", score: 92, date: "2025-11-03T14:15:00Z" },
  { id: 3, subject: "dbms", score: 78, date: "2025-11-03T09:00:00Z" },
  { id: 4, subject: "aptitude", score: 95, date: "2025-11-02T16:45:00Z" },
  { id: 5, subject: "cn", score: 81, date: "2025-11-01T11:20:00Z" },
];

// -------------------- MAIN COMPONENT --------------------

function Dashboard() {
  const navigate = useNavigate();
  const [user] = useState({ name: "John" });
  const [unfinishedQuiz, setUnfinishedQuiz] = useState(null);
  const [recentScores, setRecentScores] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    try {
      const savedQuiz = localStorage.getItem("unfinishedQuiz");
      if (savedQuiz) setUnfinishedQuiz(JSON.parse(savedQuiz));
    } catch (err) {
      console.error("Error reading unfinished quiz:", err);
    }
    setRecentScores(mockScores);
  }, []);

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <DynamicHeader>{getGreetingMessage(user.name)}</DynamicHeader>

        {unfinishedQuiz && (
          <ResumeButton onClick={() => navigate(`/quiz/${unfinishedQuiz.subject}`)}>
            Resume your {unfinishedQuiz.subject.toUpperCase()} quiz
          </ResumeButton>
        )}

        <SubHeader>Select a Subject</SubHeader>
        <Grid>
          {subjects.map((subj) => (
            <SubjectCard key={subj} onClick={() => navigate(`/quiz/${subj}`)}>
              {subj.toUpperCase()}
            </SubjectCard>
          ))}
        </Grid>

        <ScoresContainer>
          <SubHeader>Your Recent Scores</SubHeader>
          {recentScores.length > 0 ? (
            <ScoreList>
              {recentScores.map((score, i) => (
                <motion.li
                  key={score.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <ScoreItem>
                    <span>{score.subject}</span>
                    <span>{score.score}%</span>
                    <span>{new Date(score.date).toLocaleDateString()}</span>
                  </ScoreItem>
                </motion.li>
              ))}
            </ScoreList>
          ) : (
            <SubHeader>No quiz history yet — start your first quiz!</SubHeader>
          )}
        </ScoresContainer>
      </ContentContainer>
    </PageContainer>
  );
}

export default Dashboard;
