import { useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleEditEmailMode } from "../../store/authenticate/authSlice";
import {
  updateEmailAndData,
  updateUserEmailInData,
} from "../../store/authenticate/thunks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import { TextField } from "@mui/material";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const UserInfo = () => {
  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "sa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const editEmailMode = useAppSelector((state) => state.auth.editEmailMode);
  const newEmail = useAppSelector((state) => state.auth.newEmail);
  const userDetails = currentUser?.user || {};
  const {
    email: currentUserEmail = "",
    userName: name = "",
    mobile: Mobile = "",
  } = userDetails;

  const dispatch = useAppDispatch();

  const handleEmailEdit = () => {
    dispatch(toggleEditEmailMode());
  };

  const id = userDetails.id;
  type FormValues = {
    email: string;
    userId: number;
  };

  const handleEmailUpdate = (values: FormValues) => {
    dispatch(updateEmailAndData(values.email));
    if (id) {
      dispatch(
        updateUserEmailInData({
          userId: id,
          email: values.email,
        }) as unknown as ThunkAction<unknown, RootState, undefined, AnyAction>
      );
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body className="p-0">
        <h5>{t("Profile Information")}</h5>
        <Formik
          initialValues={{ email: newEmail }}
          enableReinitialize={true}
          onSubmit={(values) => {
            handleEmailUpdate({ email: values.email, userId: id || 0 });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {editEmailMode ? (
                <ListGroup className="rounded-3">
                  <Field
                    as={TextField}
                    fullWidth
                    type="email"
                    name="email"
                    label={t("Enter new E-mail")}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {t("Update")}
                  </Button>
                </ListGroup>
              ) : (
                <ListGroup className="rounded-3">
                  <p>
                    {t("Email")}: {currentUserEmail}
                    <Button onClick={handleEmailEdit}>{t("Edit")}</Button>
                  </p>
                </ListGroup>
              )}
            </Form>
          )}
        </Formik>
        <ListGroup className="rounded-3">
          <p>
            {t("User Name")}: {name}
          </p>
        </ListGroup>
        <ListGroup className="rounded-3">
          <p>
            {t("Mobile")}: {Mobile}
          </p>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
