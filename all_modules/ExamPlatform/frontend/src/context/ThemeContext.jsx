// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

// 🎨 Define themes
const lightTheme = {
  background: "linear-gradient(180deg, #fafafa 0%, #f1f1f1 100%)",
  text: "#000",
  cardBg: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.02))",
  cardText: "#222",
  accent: "#007aff",
  score: "#007aff",
};

const darkTheme = {
  background: "linear-gradient(180deg, #000 0%, #050505 100%)",
  text: "#fff",
  cardBg: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
  cardText: "rgba(255,255,255,0.9)",
  accent: "#00c6ff",
  score: "#00c6ff",
};

// 🌍 Global CSS that reacts to theme
const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background 0.4s ease, color 0.4s ease;
  }
`;

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // 🌙 Load saved theme or system preference
  useEffect(() => {
    const saved = localStorage.getItem("appTheme");
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // 💾 Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem("appTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
