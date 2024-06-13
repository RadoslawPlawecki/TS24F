import * as React from 'react';
import List from '@mui/material/List';
import './RentalsAdmin.css';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/LocalLibrary';
import { Box, Button, Input, ListItemButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useApi } from '../../api/ApiProvider';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';

function RentalsAdmin() {
  const apiClient = useApi();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState<string>(
    new Date().toISOString().substring(0, 10),
  );
  const [selectedRentalIndex, setSelectedRentalIndex] = useState<number | null>(
    null,
  );
  const [modalAction, setModalAction] = useState<'return' | 'undo'>('return');

  // if it's an admin, get all rentals
  const RentalList = () => {
    const [rentals, setRentals] = useState<any[]>([]);
    useEffect(() => {
      apiClient.getRentals().then((response: any) => {
        if (response.success) {
          console.log('Rentals displayed!', response.data);
          setRentals(response.data);
        } else {
          console.error('Error displaying rentals:', response.statusCode);
        }
      });
    }, []);

    const handleReturnClick = (index: number, action: 'return' | 'undo') => {
      setSelectedRentalIndex(index);
      setModalAction(action);
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedRentalIndex(null);
    };

    // mark a rental as returned or not
    const handleReturnSubmit = () => {
      if (selectedRentalIndex === null) return;
      const updatedRentalData = {
        id: rentals[selectedRentalIndex].id,
        returnDate: modalAction === 'return' ? returnDate : null,
      };
      apiClient.updateRental(updatedRentalData).then((response: any) => {
        console.log('Server response: ', response);
        if (response.success) {
          console.log('Rental updated!', response.data);
          const updatedRentals = [...rentals];
          updatedRentals[selectedRentalIndex].wasReturned =
            modalAction === 'return';
          setRentals(updatedRentals);
        } else {
          console.error('Error updating a rental:', response.statusCode);
        }
        handleModalClose();
      });
    };

    const onSubmit = (values: {
      book: {
        isbn: string;
        author: string;
        title: string;
        publisher: string;
        publicationYear: number;
        availableCopies: boolean;
      };
      user: {
        name: string;
        email: string;
      };
      startDate: string;
      endDate: string;
      wasReturned: boolean;
    }) => {
      console.log('Form submitted!', values);
    };

    const checkIfReturned = (dateFromDB: any, status: any) => {
      const date = new Date(dateFromDB);
      if (Date.now() > date.getTime() && !status) {
        return '#cd3939';
      } else if (status) {
        return '#86ca55';
      } else {
        return '#2268a5';
      }
    };

    return (
      <div className="container">
        <div className="header">
          <div className="text">{t('rentals_browse_admin')}</div>
          <div className="underline"></div>
        </div>
        <div className="content">
          <List
            className="Rental-list"
            sx={{
              width: '100%',
              maxWidth: 650,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {rentals.map((rental, index) => (
              <ListItemButton
                key={index}
                style={{
                  width: '100%',
                  maxWidth: 650,
                }}
              >
                <Tooltip title={t('get_more_details_rentals')}>
                  <ListItemAvatar>
                    <Avatar
                      style={{
                        background: checkIfReturned(
                          rental.endDate,
                          rental.wasReturned,
                        ),
                      }}
                    >
                      <BookIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Tooltip>
                <ListItemText
                  primary={rental.book.title}
                  secondary={`${t('rented_by')} ${rental.user.name}, ${t('from')} ${rental.startDate} ${t('to')} ${rental.endDate}`}
                />
                <Button
                  variant="contained"
                  color={rental.wasReturned ? 'secondary' : 'primary'}
                  onClick={() =>
                    handleReturnClick(
                      index,
                      rental.wasReturned ? 'undo' : 'return',
                    )
                  }
                >
                  {rental.wasReturned
                    ? t('undo_return')
                    : t('mark_as_returned')}
                </Button>
              </ListItemButton>
            ))}
          </List>
        </div>
        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              overflow: 'auto',
              bgcolor: 'background.paper',
              border: '3px solid #1648a4',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 className="modal-text">
              {modalAction === 'return'
                ? t('enter_return_date')
                : t('confirm_undo_return')}
            </h2>
            {modalAction === 'return' ? (
              <div className="modal-input">
                <Input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            ) : (
              <p> </p>
            )}
            <div className="modal-button">
              <Button
                onClick={handleReturnSubmit}
                variant="outlined"
                size="large"
              >
                {modalAction === 'return' ? t('submit') : t('yes')}
              </Button>
              <Button
                onClick={handleModalClose}
                variant="outlined"
                size="large"
              >
                {modalAction === 'return' ? t('cancel') : t('no')}
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  };
  return <RentalList />;
}

export default RentalsAdmin;
