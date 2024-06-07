import * as React from 'react';
import './MenuAdmin.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MenuAdmin() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="header">
        <div className="text">{t('welcome_admin')}</div>
        <div className="underline"></div>
      </div>
      <div className="buttons">
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate('/books_admin')}
        >
          {t('display_books')}
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate('/rentals_admin')}
        >
          {t('display_rentals')}
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate('/users')}
        >
          {t('display_users')}
        </Button>
      </div>
    </div>
  );
}

export default MenuAdmin;
