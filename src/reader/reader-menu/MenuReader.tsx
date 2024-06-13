import * as React from 'react';
import './MenuReader.css';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../api/ApiProvider';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

function MenuReader() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleLogout = () => {
    localStorage.clear();
    setSelectedUser(null);
    navigate('/');
  };

  const getUserDetails = () => {
    apiClient.getMe().then((response: any) => {
      if (response.success) {
        setSelectedUser(response.data);
      } else {
        return null;
      }
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Clear selected user details
  };

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
      <div className="icons">
        <Tooltip title={t('display_user_information')}>
          <PersonIcon className="icon" onClick={() => getUserDetails()} />
        </Tooltip>
        <Tooltip title={t('log_out')}>
          <LogoutIcon className="icon" onClick={() => handleLogout()} />
        </Tooltip>
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '3px solid #1648a4',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h6 className="modal-text">{t('user_information')}</h6>
          <div className="modal-input">
            {selectedUser && (
              <div>
                <Typography>
                  {t('name')}: {selectedUser.name}
                </Typography>
                <Typography className="modal-text-body">
                  {t('email')}: {selectedUser.email}
                </Typography>
                <Typography className="modal-text-body">
                  {t('role')}:{' '}
                  {selectedUser.role === 'ADMIN'
                    ? t('role_admin')
                    : t('role_reader')}
                </Typography>
              </div>
            )}
          </div>
          <div className="modal-button">
            <Button onClick={handleCloseModal} variant="outlined">
              {t('close')}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default MenuReader;
