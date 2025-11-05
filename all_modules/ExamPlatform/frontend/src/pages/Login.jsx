import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import styled from "styled-components"; // 1. Import styled-components

// --- 2. Define Styled Components using the "Nothing OS" theme ---

// Page container
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: 40px; /* Original margin-top */
  /* Use the global background from your index.css */
  background: linear-gradient(180deg, var(--black, #000) 0%, #050505 100%);
`;

// Form container, styled like your '.card'
const LoginFormCard = styled.div`
  width: 100%;
  max-width: 380px; /* A good width for a login form */

  /* .card styles from your theme */
  border-radius: var(--radius, 14px);
  padding: 28px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  backdrop-filter: blur(8px) saturate(110%);
  box-shadow: 0 8px 30px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.03);
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--white, #fff);
  text-align: center;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px; /* From your '.field' margin */
`;

// Input + Label wrapper, styled like your '.field'
const FieldWrapper = styled.label`
  position: relative;
  display: block;
`;

// Styled Input, from your '.input'
const StyledInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(255,255,255,0.02);
  color: var(--white, #fff);
  border: 1px solid rgba(255,255,255,0.04);
  transition: box-shadow var(--transition-fast, 160ms), 
              transform var(--transition-fast, 160ms);
  outline: none;

  /* .input:focus styles */
  &:focus {
    box-shadow: var(--focus-glow, 0 6px 18px rgba(0,122,255,0.25));
    border-color: var(--blue-500, #007aff);
    transform: translateY(-2px);
  }
`;

// Floating Label, from your '.label'
const StyledLabel = styled.span`
  position: absolute;
  left: 14px;
  top: 10px;
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  transition: transform var(--transition-fast, 160ms), 
              opacity var(--transition-fast, 160ms);
  pointer-events: none; /* Lets you click through to the input */
  
  /* Floating label logic */
  ${StyledInput}:focus + &,
  ${StyledInput}:not(:placeholder-shown) + & {
    transform: translateY(-22px) scale(.95);
    opacity: 0.9;
    color: var(--blue-300, #66a4ff);
  }
`;

// Submit Button, from your '.btn'
const SubmitButton = styled.button`
  /* .btn styles */
  display: inline-flex;
  align-items: center;
  justify-content: center; /* Center text */
  gap: 10px;
  padding: 12px 20px;
  border-radius: 12px;
  background: linear-gradient(180deg, var(--blue-700, #0052cc), var(--blue-500, #007aff));
  color: var(--white, #fff);
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0,122,255,0.18);
  border: none;
  cursor: pointer;
  transform-origin: center;
  transition: transform var(--transition-medium, 240ms) cubic-bezier(.2,1.05,.3,1),
              box-shadow var(--transition-medium, 240ms);
  
  /* .btn:hover */
  &:hover {
    transform: translateY(-6px) scale(1.02) skewX(-1deg);
    box-shadow: var(--focus-glow, 0 6px 18px rgba(0,122,255,0.25)), 
                0 22px 40px rgba(0,0,0,0.45);
  }
  
  /* .btn:active */
  &:active {
    transform: translateY(-2px) scale(.995) skewX(-0.3deg);
  }
`;

const RegisterMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.55);

  a {
    color: var(--blue-300, #66a4ff);
    font-weight: 500;
    text-decoration: none;
    transition: color var(--transition-fast, 160ms);

    &:hover {
      color: var(--white, #fff);
      text-decoration: underline;
    }
  }
`;

// --- 3. Your Original React Component ---
// (Now using the styled components)

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <LoginContainer>
      <LoginFormCard>
        <Header>Login</Header>
        <Form onSubmit={handleSubmit}>
          {/* Use the floating label structure. 
            Note: placeholder must be " " for the CSS to work.
          */}
          <FieldWrapper>
            <StyledInput
              name="email"
              type="email"
              placeholder=" " 
              onChange={handleChange}
              required
            />
            <StyledLabel>Email</StyledLabel>
          </FieldWrapper>
          
          <FieldWrapper>
            <StyledInput
              name="password"
              type="password"
              placeholder=" "
              onChange={handleChange}
              required
            />
            <StyledLabel>Password</StyledLabel>
          </FieldWrapper>

          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
        <RegisterMessage>
          New user? <a href="/register">Register</a>
        </RegisterMessage>
      </LoginFormCard>
    </LoginContainer>
  );
}

export default Login;