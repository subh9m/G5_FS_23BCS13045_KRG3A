// src/pages/Quiz.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { useTheme, keyframes } from "styled-components";
import api from "../api/api.js";
import QuestionCard from "../components/QuestionCard.jsx";
import Navbar from "../components/Navbar.jsx";

// --- Helper Function ---
function resolveQuestionId(q, idx) {
  if (!q) return String(idx);
  if (typeof q.id === "string") return q.id;
  if (typeof q._id === "string") return q._id;
  if (q._id && typeof q._id === "object" && typeof q._id.$oid === "string")
    return q._id.$oid;
  return String(idx);
}

// --- Styled Components (theme-driven) ---

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  transition: background 0.4s ease;
`;

const ContentContainer = styled.div`
  max-width: 780px;
  margin: 36px auto 0;
  padding: 0 16px 40px;
`;

const Header = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
`;

const SubHeader = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.cardText};
  margin: 0 0 16px 0;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 24px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${(props) => props.$percent}%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.accent},
    ${({ theme }) => theme.score}
  );
  transition: width 0.4s cubic-bezier(0.2, 1, 0.3, 1);
`;

const LoadingMessage = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.cardText};
  text-align: center;
  padding-top: 40px;
`;

const ScoreDisplay = styled.h2`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;

  span {
    color: ${({ theme }) => theme.accent};
    font-size: 36px;
  }
`;

const ButtonContainer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 24px;
  margin-top: 24px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 12px 20px;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.accent},
    ${({ theme }) => theme.score}
  );
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px ${({ theme }) => theme.accent + "33"};
  transition: all 0.25s cubic-bezier(0.2, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 35px ${({ theme }) => theme.accent + "33"};
  }
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: ${({ theme }) => theme.accent + "22"};
  }
`;

// --- Modal ---
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalCard = styled.div`
  border-radius: 14px;
  padding: 24px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid rgba(255, 255, 255, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
`;

const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  margin-bottom: 10px;
`;

const ModalText = styled.p`
  color: ${({ theme }) => theme.cardText};
  font-size: 15px;
  margin-bottom: 20px;
`;

// --- Snackbar Animation ---
const snackbarFade = keyframes`
  0%, 100% { opacity: 0; transform: translateY(20px); }
  10%, 90% { opacity: 1; transform: translateY(0); }
`;

const GlobalSnackbar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.accent}, ${theme.score})`};
  color: #fff;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 18px ${({ theme }) => theme.accent + "44"};
  animation: ${snackbarFade} 3s cubic-bezier(0.2, 1, 0.3, 1) forwards;
  z-index: 100;
`;

// --- Main Component ---
function Quiz() {
  const theme = useTheme();
  const { subject } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [globalSnackbarText, setGlobalSnackbarText] = useState("");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const storageKey = user
    ? `quiz-${user.id ?? user._id}-${subject}`
    : `quiz-guest-${subject}`;

  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // --- Fetch Questions + Resume ---
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/quiz/${subject}`);
        const data = Array.isArray(res.data) ? res.data : [];
        setQuestions(data);

        const saved = localStorage.getItem(storageKey);
        if (saved) {
          showSnackbar("Resuming your last progress 🚀");
          try {
            setAnswers(JSON.parse(saved));
          } catch {
            localStorage.removeItem(storageKey);
          }
        }
      } catch {
        showSnackbar("Error loading questions ⚠️");
      }
    };
    fetchQuestions();
  }, [subject]);

  // --- Autosave every 30s ---
  useEffect(() => {
    const id = setInterval(() => {
      if (Object.keys(answersRef.current).length > 0)
        localStorage.setItem(storageKey, JSON.stringify(answersRef.current));
    }, 30000);
    return () => clearInterval(id);
  }, [storageKey]);

  const showSnackbar = (text) => {
    setGlobalSnackbarText(text);
    setTimeout(() => setGlobalSnackbarText(""), 3000);
  };

  const handleSelect = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
    localStorage.setItem(storageKey, JSON.stringify({ ...answers, [qId]: option }));
  };

  const handleSave = (qId, option) => {
    localStorage.setItem(storageKey, JSON.stringify({ ...answers, [qId]: option }));
  };

  const handleSubmit = () => {
    if (!user) {
      showSnackbar("Please login to submit.");
      navigate("/");
      return;
    }
    const allIds = questions.map((q, i) => resolveQuestionId(q, i));
    const firstUnanswered = allIds.find((id) => !answers[id]);
    if (firstUnanswered) {
      document.getElementById(firstUnanswered)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      showSnackbar("Please answer all questions 🎯");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    try {
      const payload = {
        userId: user.id ?? user._id,
        subject,
        answers,
      };
      const res = await api.post("/quiz/submit", payload);
      setScore(res.data.score ?? 0);
      setSubmitted(true);
      localStorage.removeItem(storageKey);
      showSnackbar("Quiz submitted successfully!");
    } catch {
      showSnackbar("Submission failed ⚠️");
    }
  };

  const handleSaveAll = () => {
    localStorage.setItem(storageKey, JSON.stringify(answers));
    showSnackbar("All answers saved locally ✅");
  };

  // --- Progress ---
  const answeredCount = Object.keys(answers).length;
  const total = questions.length;
  const progress = total ? (answeredCount / total) * 100 : 0;

  // --- Conditional Renders ---
  if (total === 0)
    return (
      <PageContainer>
        <Navbar />
        {globalSnackbarText && <GlobalSnackbar>{globalSnackbarText}</GlobalSnackbar>}
        <ContentContainer>
          <LoadingMessage>Loading questions...</LoadingMessage>
        </ContentContainer>
      </PageContainer>
    );

  if (submitted)
    return (
      <PageContainer>
        <Navbar />
        {globalSnackbarText && <GlobalSnackbar>{globalSnackbarText}</GlobalSnackbar>}
        <ContentContainer style={{ textAlign: "center" }}>
          <ScoreDisplay>
            Your Score: <span>{score} / {total}</span>
          </ScoreDisplay>
          <ButtonContainer>
            <SecondaryButton onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </SecondaryButton>
            <SecondaryButton onClick={() => navigate("/leaderboard")}>
              View Leaderboard
            </SecondaryButton>
          </ButtonContainer>
        </ContentContainer>
      </PageContainer>
    );

  return (
    <PageContainer>
      <Navbar />
      {globalSnackbarText && <GlobalSnackbar>{globalSnackbarText}</GlobalSnackbar>}

      {showConfirmModal && (
        <ModalBackdrop>
          <ModalCard>
            <ModalTitle>Confirm Submission</ModalTitle>
            <ModalText>Are you sure you want to submit your answers?</ModalText>
            <ButtonContainer>
              <SecondaryButton onClick={() => setShowConfirmModal(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleConfirmSubmit}>Submit</PrimaryButton>
            </ButtonContainer>
          </ModalCard>
        </ModalBackdrop>
      )}

      <ContentContainer>
        <Header>Quiz: {subject.toUpperCase()}</Header>
        <SubHeader>✅ Your answers are saved locally as you go.</SubHeader>

        <ProgressBarContainer>
          <ProgressBarFill $percent={progress} />
        </ProgressBarContainer>

        <p
          style={{
            textAlign: "right",
            marginTop: "-18px",
            marginBottom: "18px",
            fontSize: "14px",
            color: theme.cardText,
          }}
        >
          {answeredCount} / {total} Answered
        </p>

        {questions.map((q, idx) => {
          const qId = resolveQuestionId(q, idx);
          return (
            <div id={qId} key={qId}>
              <QuestionCard
                question={q}
                index={idx}
                selectedAnswer={answers[qId] ?? null}
                onSelect={handleSelect}
                onSave={handleSave}
                isPersisted={!!answers[qId]}
              />
            </div>
          );
        })}

        <ButtonContainer>
          <PrimaryButton onClick={handleSubmit}>Submit Quiz</PrimaryButton>
          <SecondaryButton onClick={handleSaveAll}>Save All Locally</SecondaryButton>
        </ButtonContainer>
      </ContentContainer>
    </PageContainer>
  );
}

export default Quiz;
