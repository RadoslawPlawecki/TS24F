import * as React from 'react';
import './DisplayBooks.css';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/Book';
import { Button, ListItemButton, TextField, Tooltip } from '@mui/material';
import { Formik } from 'formik';
import { useMemo, useState } from 'react';
import * as yup from 'yup';

function DisplayBooks() {
  const BookList = () => {
    const [books, setBooks] = useState([
      {
        isbn: '1234567890',
        author: 'J.K. Rowling',
        title: 'Harry Potter and the Goblet of Fire',
        publisher: 'Bloomsbury Publishing',
        publication_year: 2014,
        available_copies: 10,
      },
    ]);

    const onSubmit = (
      values: {
        isbn: string;
        author: string;
        title: string;
        publisher: string;
        publication_year: number;
        available_copies: number;
      },
      { resetForm }: { resetForm: () => void },
    ) => {
      console.log('Form submitted!', values);
      const newBook = {
        isbn: values.isbn,
        author: values.author,
        title: values.title,
        publisher: values.publisher,
        publication_year: values.publication_year,
        available_copies: values.available_copies,
      };
      setBooks([...books, newBook]);
      resetForm();
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
          publication_year: yup
            .number()
            .required('Publication year is required!')
            .min(0, 'Publication year cannot be less than 0!'),
          available_copies: yup
            .number()
            .required('Number of available copies is required!')
            .min(0, 'Number of available copies cannot be less than 0!'),
        }),
      [],
    );

    return (
      <>
        <List
          className="Book-list"
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 200,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {books.map((book, index) => (
            <ListItemButton
              key={index}
              style={{ width: '100%', maxWidth: 400 }}
            >
              <Tooltip title="Get more details about the book!">
                <ListItemAvatar>
                  <Avatar>
                    <BookIcon />
                  </Avatar>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                primary={book.title}
                secondary={`${book.author}, ${book.publication_year}`}
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
            publication_year: 0,
            available_copies: 0,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
        >
          {(formik) => (
            <form
              className="Login-form"
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
                label="Author"
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
                label="Title"
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && !!formik.errors.title}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                id="Publisher"
                name="publisher"
                label="Publisher"
                variant="standard"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.publisher && !!formik.errors.publisher}
                helperText={formik.touched.publisher && formik.errors.publisher}
              />
              <TextField
                id="Publication year"
                name="publication_year"
                label="Publication year"
                variant="standard"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.publication_year &&
                  !!formik.errors.publication_year
                }
                helperText={
                  formik.touched.publication_year &&
                  formik.errors.publication_year
                }
              />
              <TextField
                id="Available copies"
                name="available_copies"
                label="Available copies"
                variant="standard"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.available_copies &&
                  !!formik.errors.available_copies
                }
                helperText={
                  formik.touched.available_copies &&
                  formik.errors.available_copies
                }
              />
              <Button variant="contained" type="submit" form="addBookForm">
                Add a book
              </Button>
            </form>
          )}
        </Formik>
      </>
    );
  };
  return <BookList />;
}

export default DisplayBooks;
