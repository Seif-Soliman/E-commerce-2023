import { Modal, Button } from "react-bootstrap";
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { signUp } from "../../store/authenticate/thunks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { TextField, Box, Grid } from "@mui/material";
import style from "./style.module.css";

interface SignUpModalProps {
  show: boolean;
  onHide: () => void;
}

function SignUpModal({ show, onHide }: Readonly<SignUpModalProps>) {
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
    actions: FormikHelpers<FormValues>
  ) => {
    actions.setSubmitting(true);

    dispatch(signUp(values))
      .then(() => {
        actions.resetForm();
        onHide();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleChange =
    (formikProps: FormikProps<FormValues>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      console.log(`Field ${name} has a new value: ${value}`);
      formikProps.handleChange(e);
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
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          className={`${style.modal_title} d-flex justify-content-center`}
        >
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Grid container justifyContent="center" className={style.MuiGridControl}>
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
              <Form onSubmit={formikProps.handleSubmit}>
                <Modal.Body>
                  <Box
                    sx={{
                      "& > :not(style)": {
                        marginTop: "1.5rem",
                      },
                    }}
                  >
                    <TextField
                      className={style.MuiFormControl_root}
                      fullWidth
                      label={t("Email address")}
                      type="email"
                      name="email"
                      placeholder={t("Enter email")}
                      onChange={handleChange(formikProps)}
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
                      className={style.MuiFormControl_root}
                      fullWidth
                      label={t("Password")}
                      type="password"
                      name="password"
                      placeholder={t("Enter Password")}
                      onChange={handleChange(formikProps)}
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
                      className={style.MuiFormControl_root}
                      fullWidth
                      label={t("Name")}
                      type="text"
                      name="userName"
                      placeholder={t("Enter name")}
                      onChange={handleChange(formikProps)}
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
                      className={style.MuiFormControl_root}
                      fullWidth
                      label={t("Mobile")}
                      type="text"
                      name="mobile"
                      placeholder={t("Enter mobile")}
                      onChange={handleChange(formikProps)}
                      value={formikProps.values.mobile}
                      error={
                        !!formikProps.errors.mobile &&
                        formikProps.touched.mobile
                      }
                      helperText={
                        formikProps.errors.mobile && formikProps.touched.mobile
                          ? formikProps.errors.mobile
                          : ""
                      }
                    />
                  </Box>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className={style.btn_primary}
                    type="submit"
                  >
                    {t("Sign Up")}
                  </Button>
                  <Button
                    variant="secondary"
                    className={style.btn_secondary}
                    onClick={onHide}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default SignUpModal;
