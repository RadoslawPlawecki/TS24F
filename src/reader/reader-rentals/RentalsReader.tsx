import * as React from 'react';
import List from '@mui/material/List';
import './RentalsReader.css';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/LocalLibrary';
import { Button, ListItem, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useApi } from '../../api/ApiProvider';
import { useTranslation } from 'react-i18next';

function RentalsAdmin() {
  const apiClient = useApi();
  const { t } = useTranslation();

  // if it's a reader, get only their rentals
  const RentalList = () => {
    const [rentals, setRentals] = useState<any[]>([]);
    useEffect(() => {
      apiClient
        .getRentalsByUser(Number(localStorage.getItem('userId')))
        .then((response: any) => {
          if (response.success) {
            console.log('Rentals displayed!', response.data);
            setRentals(response.data);
          } else {
            console.error('Error displaying rentals:', response.statusCode);
          }
        });
    }, []);

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
          <div className="text">{t('rentals_browse_user')}</div>
          <div className="underline"></div>
        </div>
        <div className="content">
          <List
            className="Rental-list"
            sx={{
              width: '100%',
              maxWidth: 700,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {rentals.map((rental, index) => (
              <ListItem
                key={index}
                style={{
                  width: '100%',
                  maxWidth: 650,
                }}
              >
                <Tooltip title={`Get more details about the rental!`}>
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
                  secondary={`Rented by: ${rental.user.name}, from ${rental.startDate} to ${rental.endDate}`}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  // onClick={() => handleDeleteClick(index)}
                >
                  {t('review_add')}
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  };
  return <RentalList />;
}

export default RentalsAdmin;
