import * as React from 'react';
import List from '@mui/material/List';
import './DisplayRentals.css';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/LocalLibrary';
import { Button, ListItemButton, Tooltip } from '@mui/material';
import { useState } from 'react';

function DisplayRentals() {
  const RentalList = () => {
    const [rentals, setRentals] = useState([
      {
        book: {
          isbn: '1234567890',
          author: 'J.K. Rowling',
          title: 'Harry Potter and the Goblet of Fire',
          publisher: 'Bloomsbury Publishing',
          publication_year: 2014,
          available: true,
        },
        user: {
          name: 'Reader',
          email: 'reader@gmail.com',
        },
        startDate: '2024-07-08',
        endDate: '2024-05-28',
        wasReturned: false,
      },
    ]);

    const handleReturnClick = (index: any) => {
      const updatedRentals = rentals.map((rental, i) =>
        i === index ? { ...rental, wasReturned: !rental.wasReturned } : rental,
      );
      setRentals(updatedRentals);
    };

    const onSubmit = (values: {
      book: {
        isbn: string;
        author: string;
        title: string;
        publisher: string;
        publication_year: number;
        available_copies: boolean;
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
          <div className="text">Browse the list of rentals!</div>
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
              maxHeight: 200,
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
                  variant="contained"
                  color={rental.wasReturned ? 'secondary' : 'primary'}
                  onClick={() => handleReturnClick(index)}
                >
                  {rental.wasReturned ? 'Undo Return' : 'Mark as Returned'}
                </Button>
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
    );
  };
  return <RentalList />;
}

export default DisplayRentals;
