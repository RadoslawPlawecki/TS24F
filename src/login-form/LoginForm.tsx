import React, { useCallback, useMemo, useState } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      navigate('/books');
      console.log('books');
    },
    [],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required!'),
        password: yup
          .string()
          .required('Password is required!')
          .min(8, 'Password must be at least 8 characters!'),
      }),
    [],
  );

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Login-form"
          id="signForm"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="standard"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="standard"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="contained"
            type="submit"
            form="signForm"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Login
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
