import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../api/ApiProvider';
import { useTranslation } from 'react-i18next';

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        console.log(response);
        if (response.success) {
          if (localStorage.getItem('userRole') === 'ROLE_ADMIN') {
            navigate('/menu_admin');
          } else {
            navigate('/menu');
          }
        } else {
          formik.setFieldError('username', 'Invalid username or password!');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(t('required_username')),
        password: yup
          .string()
          .required(t('required_password'))
          .min(8, t('password_requirements')),
      }),
    [t],
  );

  return (
    <div className="container">
      <div className="header">
        <div className="text">{t('login')}</div>
        <div className="underline"></div>
      </div>
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
              label={t('username')}
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              name="password"
              label={t('password')}
              variant="standard"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              size="large"
              variant="contained"
              type="submit"
              form="signForm"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {t('login')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
