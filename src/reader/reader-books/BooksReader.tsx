import * as React from 'react';
import './BooksReader.css';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/Book';
import { ListItemButton, Tooltip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useApi } from '../../api/ApiProvider';
import { useTranslation } from 'react-i18next';

function BooksAdmin() {
  const apiClient = useApi();
  const { t } = useTranslation();

  const BookList = () => {
    const [books, setBooks] = useState<any[]>([]);

    useEffect(() => {
      apiClient.getBooks().then((response: any) => {
        if (response.success) {
          console.log('Books displayed!', response.data);
          setBooks(response.data);
        } else {
          console.error('Error displaying admin-books:', response.statusCode);
        }
      });
    }, []);

    const onSubmit = (
      values: {
        isbn: string;
        author: string;
        title: string;
        publisher: string;
        publicationYear: number;
        availableCopies: number;
      },
      { resetForm }: { resetForm: () => void },
    ) => {
      apiClient.addBook(values).then((response: any) => {
        if (response.success) {
          console.log('Form submitted!', values);
          setBooks((prevBooks) => [...prevBooks, response.data]);
          resetForm();
        } else {
          console.error('Error submitting form:', response.statusCode);
        }
      });
    };

    const validationSchema = useMemo(
      () =>
        yup.object().shape({
          isbn: yup
            .string()
            .required('ISBN is required!')
            .min(13, 'ISBN must consist of 13 digits!')
            .max(13, 'ISBN must consist of 13 digits!'),
          author: yup.string().required('Author is required!'),
          title: yup.string().required('Title is required!'),
          publisher: yup.string().required('Publisher is required!'),
          publicationYear: yup
            .number()
            .required('Publication year is required!')
            .min(0, 'Publication year cannot be less than 0!'),
          availableCopies: yup
            .number()
            .required('Number of available copies is required!')
            .min(0, 'Number of available copies cannot be less than 0!'),
        }),
      [],
    );

    return (
      <div className="book-container-reader">
        <div className="book-header-reader">
          <div className="book-text-reader">{t('books_browse')}</div>
          <div className="book-underline-reader"></div>
        </div>
        <div className="book-content-reader">
          <List
            className="book-list-reader"
            sx={{
              width: '100%',
              maxWidth: 400,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 600,
              '& ul': { padding: 1 },
            }}
            subheader={<li />}
          >
            {books.map((book, index) => (
              <ListItemButton
                key={index}
                style={{ width: '100%', maxWidth: 400, height: 100 }}
              >
                <Tooltip title={t('get_more_details_books')}>
                  <ListItemAvatar>
                    <Avatar style={{ background: '#2268a5' }}>
                      <BookIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Tooltip>
                <ListItemText
                  primary={book.title}
                  secondary={`${book.author}, ${book.publicationYear}`}
                />
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
    );
  };
  return <BookList />;
}

export default BooksAdmin;
