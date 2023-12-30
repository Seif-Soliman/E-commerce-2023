import { Modal, Button } from "react-bootstrap";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { signIn } from "../../store/authenticate/thunks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Formik, Form as FormikForm, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { TextField, Box, Grid } from "@mui/material";
import style from "./style.module.css";
import axios from "axios";

interface SignInModalProps {
  show: boolean;
  onHide: () => void;
  showSignUp: () => void;
  closeOtherModal: () => void;
}

function SignInModal({
  show,
  onHide,
  showSignUp,
  closeOtherModal,
}: Readonly<SignInModalProps>) {
  const [registeredEmails, setRegisteredEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchRegisteredEmails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log(response);
        const emails = response.data.map((user: { email: string }) =>
          user.email.trim()
        );
        console.log(emails);
        setRegisteredEmails(emails);
      } catch (error) {
        console.error("Error fetching registered emails:", error);
      }
    };

    fetchRegisteredEmails();
  }, []);

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test("is-registered", "Email is not registered", function (value) {
        console.log("Input Email:", value);
        console.log("Registered Emails:", registeredEmails);
        return registeredEmails.includes(value);
      }),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const dispatch = useAppDispatch();

  type FormValues = {
    email: string;
    password: string;
  };

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
    onHide: () => void
  ) => {
    console.log("Form Values:", values);
    dispatch(signIn(values))
      .then(() => {
        resetForm();
        onHide();
      })
      .catch((error) => console.error(error));
  };

  const handleChange =
    (formikProps: FormikProps<FormValues>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSignUpClick = () => {
    closeOtherModal();
    showSignUp();
  };

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
          Sign In
        </Modal.Title>
      </Modal.Header>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SigninSchema}
            onSubmit={(values, formikHelpers) =>
              handleSubmit(values, formikHelpers, onHide)
            }
            validateOnChange={true}
          >
            {(formikProps) => (
              <FormikForm>
                <Modal.Body>
                  <Box
                    sx={{
                      "& > :not(style)": {
                        marginTop: "1.5rem",
                      },
                    }}
                  >
                    <TextField
                      className={`${style.MuiFormControl_root} ${style.responsiveTextField}`}
                      fullWidth
                      label={t("Email address")}
                      type="email"
                      name="email"
                      onChange={handleChange(formikProps)}
                      value={formikProps.values.email}
                      placeholder={t("Enter email")}
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
                      className={`${style.MuiFormControl_root} ${style.responsiveTextField}`}
                      fullWidth
                      label={t("Password")}
                      type="password"
                      name="password"
                      onChange={handleChange(formikProps)}
                      value={formikProps.values.password}
                      placeholder={t("Enter Password")}
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
                    <p>
                      Don't have an account?
                      <Button variant="link" onClick={handleSignUpClick}>
                        Sign Up
                      </Button>
                    </p>
                  </Box>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className={style.btn_primary}
                    type="submit"
                  >
                    {t("Sign In")}
                  </Button>
                  <Button
                    variant="secondary"
                    className={style.btn_secondary}
                    onClick={onHide}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </FormikForm>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default SignInModal;
