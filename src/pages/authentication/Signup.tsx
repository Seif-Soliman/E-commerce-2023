import { ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { signUp } from "../../store/authenticate/thunks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Formik, Form as FormikForm, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Box, Grid } from "@mui/material";

function Signup() {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    userName: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Mobile is required"),
  });

  const dispatch = useAppDispatch();

  type FormValues = {
    email: string;
    password: string;
    userName: string;
    mobile: string;
  };

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    dispatch(signUp(values))
      .then(() => {
        resetForm();
      })
      .catch((error) => console.error(error));
  };

  const handleChange =
    (formikProps: FormikProps<FormValues>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      console.log(`Field ${name} has a new value: ${value}`);
      formikProps.handleChange(e); // Use Formik's handleChange
    };

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "sa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              userName: "",
              mobile: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
          >
            {(formikProps) => (
              <FormikForm>
                <Box
                  sx={{
                    "& > :not(style)": {
                      marginTop: "1.5rem",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    label={t("Email address")}
                    type="email"
                    name="email"
                    placeholder={t("Enter email")}
                    onChange={handleChange(formikProps)} // Pass formikProps to handleChange
                    value={formikProps.values.email}
                    error={
                      !!formikProps.errors.email && formikProps.touched.email
                    }
                    helperText={
                      formikProps.errors.email && formikProps.touched.email
                        ? formikProps.errors.email
                        : ""
                    }
                  />

                  <TextField
                    fullWidth
                    label={t("Password")}
                    type="password"
                    name="password"
                    placeholder={t("Enter Password")}
                    onChange={handleChange(formikProps)} // Pass formikProps to handleChange
                    value={formikProps.values.password}
                    error={
                      !!formikProps.errors.password &&
                      formikProps.touched.password
                    }
                    helperText={
                      formikProps.errors.password &&
                      formikProps.touched.password
                        ? formikProps.errors.password
                        : ""
                    }
                  />

                  <TextField
                    fullWidth
                    label={t("Name")}
                    type="text"
                    name="userName"
                    placeholder={t("Enter name")}
                    onChange={handleChange(formikProps)} // Pass formikProps to handleChange
                    value={formikProps.values.userName}
                    error={
                      !!formikProps.errors.userName &&
                      formikProps.touched.userName
                    }
                    helperText={
                      formikProps.errors.userName &&
                      formikProps.touched.userName
                        ? formikProps.errors.userName
                        : ""
                    }
                  />

                  <TextField
                    fullWidth
                    label={t("Mobile")}
                    type="text"
                    name="mobile"
                    placeholder={t("Enter mobile")}
                    onChange={handleChange(formikProps)} // Pass formikProps to handleChange
                    value={formikProps.values.mobile}
                    error={
                      !!formikProps.errors.mobile && formikProps.touched.mobile
                    }
                    helperText={
                      formikProps.errors.mobile && formikProps.touched.mobile
                        ? formikProps.errors.mobile
                        : ""
                    }
                  />

                  <Button variant="contained" type="submit">
                    {t("Sign Up")}
                  </Button>
                </Box>
              </FormikForm>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;
