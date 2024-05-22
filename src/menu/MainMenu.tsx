import * as React from 'react';
import './MainMenu.css';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <div className="text">Welcome in the library!</div>
        <div className="underline"></div>
      </div>
      <div className="buttons">
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate('/books')}
        >
          Display books
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate('/rentals')}
        >
          Display rentals
        </Button>
      </div>
    </div>
  );
}

export default MainMenu;
