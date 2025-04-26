import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.isDarkMode ? '#6366f1' : '#1a1a1a'};
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
  
  &:focus {
    outline: none;
  }
`;

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <ToggleContainer>
      <ToggleButton 
        isDarkMode={isDarkMode} 
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="clickable"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default DarkModeToggle; 