import * as React from 'react';
import './MenuReader.css';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MenuAdmin() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="header">
        <div className="text">{t('welcome_user')}</div>
        <div className="underline"></div>
      </div>
      <div className="buttons">
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate('/books')}
        >
          {t('display_books')}
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate('/rentals')}
        >
          {t('display_rentals')}
        </Button>
      </div>
    </div>
  );
}

export default MenuAdmin;
