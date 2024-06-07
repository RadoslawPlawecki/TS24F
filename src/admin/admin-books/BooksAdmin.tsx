import * as React from 'react';
import './BooksAdmin.css';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/Book';
import { Button, ListItemButton, TextField, Tooltip } from '@mui/material';
import { Formik } from 'formik';
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
          console.error('Error displaying books:', response.statusCode);
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
            .required(t('required_isbn'))
            .min(13, t('isbn_requirements'))
            .max(13, t('isbn_requirements')),
          author: yup.string().required(t('required_author')),
          title: yup.string().required(t('required_title')),
          publisher: yup.string().required(t('required_publisher')),
          publicationYear: yup
            .number()
            .required(t('required_publication_year')),
          availableCopies: yup
            .number()
            .required(t('required_available_copies'))
            .min(0, t('available_copies_requirements')),
        }),
      [],
    );

    return (
      <div className="book-container">
        <div className="book-header">
          <div className="book-text">{t('books_browse')}</div>
          <div className="book-underline"></div>
        </div>
        <div className="book-content">
          <List
            className="book-list"
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

          <Formik
            initialValues={{
              isbn: '',
              author: '',
              title: '',
              publisher: '',
              publicationYear: 0,
              availableCopies: 0,
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
          >
            {(formik) => (
              <form
                className="book-add-form"
                id="addBookForm"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  id="ISBN"
                  name="isbn"
                  label="ISBN"
                  variant="standard"
                  type="string"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.isbn && !!formik.errors.isbn}
                  helperText={formik.touched.isbn && formik.errors.isbn}
                />
                <TextField
                  id="Author"
                  name="author"
                  label={t('author')}
                  variant="standard"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.author && !!formik.errors.author}
                  helperText={formik.touched.author && formik.errors.author}
                />
                <TextField
                  id="Title"
                  name="title"
                  label={t('title')}
                  variant="standard"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && !!formik.errors.title}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  id="Publisher"
                  name="publisher"
                  label={t('publisher')}
                  variant="standard"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.publisher && !!formik.errors.publisher}
                  helperText={
                    formik.touched.publisher && formik.errors.publisher
                  }
                />
                <TextField
                  id="Publication year"
                  name="publicationYear"
                  label={t('publication_year')}
                  variant="standard"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.publicationYear &&
                    !!formik.errors.publicationYear
                  }
                  helperText={
                    formik.touched.publicationYear &&
                    formik.errors.publicationYear
                  }
                />
                <TextField
                  id="Available copies"
                  name="availableCopies"
                  label={t('available_copies')}
                  variant="standard"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.availableCopies &&
                    !!formik.errors.availableCopies
                  }
                  helperText={
                    formik.touched.availableCopies &&
                    formik.errors.availableCopies
                  }
                />
                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  form="addBookForm"
                >
                  {t('book_add')}
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  };
  return <BookList />;
}

export default BooksAdmin;
