import { useEffect } from "react";
// import {
//   // Container,
//   Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { useAppDispatch } from "../../store/hooks";
import { signUp } from "../../store/authenticate/thunks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import {
  Formik,
  Form as FormikForm,
  // Field,
  // ErrorMessage,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  // Typography,
  Container,
  Grid,
} from "@mui/material";

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
          >
            {({ errors, touched }) => (
              <FormikForm>
                <TextField
                  fullWidth
                  label={t("Email address")}
                  type="email"
                  name="email"
                  placeholder={t("Enter email")}
                  error={!!errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
                />

                <TextField
                  fullWidth
                  label={t("Password")}
                  type="password"
                  name="password"
                  placeholder={t("Enter Password")}
                  error={!!errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                />

                <TextField
                  fullWidth
                  label={t("Name")}
                  type="text"
                  name="userName"
                  placeholder={t("Enter name")}
                  error={!!errors.userName && touched.userName}
                  helperText={
                    errors.userName && touched.userName ? errors.userName : ""
                  }
                />

                <TextField
                  fullWidth
                  label={t("Mobile")}
                  type="text"
                  name="mobile"
                  placeholder={t("Enter mobile")}
                  error={!!errors.mobile && touched.mobile}
                  helperText={
                    errors.mobile && touched.mobile ? errors.mobile : ""
                  }
                />

                <Button variant="contained" type="submit">
                  {t("Sign Up")}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;
