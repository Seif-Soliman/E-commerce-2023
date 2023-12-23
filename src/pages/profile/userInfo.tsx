import React, { useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setNewEmail,
  toggleEditEmailMode,
} from "../../store/authenticate/authSlice";
import {
  updateEmailAndData,
  updateUserEmailInData,
} from "../../store/authenticate/thunks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewEmail(e.target.value));
  };

  const id = userDetails.id;

  const handleEmailUpdate = () => {
    dispatch(updateEmailAndData(newEmail));
    if (id) {
      dispatch(updateUserEmailInData({ userId: id, email: newEmail }));
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body className="p-0">
        <h5>{t("Profile Information")}</h5>
        <ListGroup className="rounded-3">
          {editEmailMode ? (
            <ListGroup className="rounded-3">
              <input
                type="email"
                value={newEmail}
                onChange={handleEmailChange}
                placeholder={t("Enter new E-mail")}
              />
              <Button onClick={handleEmailUpdate}>{t("Update")}</Button>
            </ListGroup>
          ) : (
            <ListGroup className="rounded-3">
              <p>
                {t("Email")}: {currentUserEmail}
                <Button onClick={handleEmailEdit}>{t("Edit")}</Button>
              </p>
            </ListGroup>
          )}
        </ListGroup>
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
