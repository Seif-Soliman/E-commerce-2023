import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { CategoryType } from "../../../store/category/categoryTypes";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FC, useEffect } from "react";
import i18n from "../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Atropos } from "atropos/react";
import { Row, Col } from "react-bootstrap";
import styles from "./CategoryCard.module.css";
import { fetchProduct } from "../../../store/product/productSlice";

const CartegoryCard: FC<CategoryType> = ({ id, title, prefix, img }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleClickCategory(cat_prefix: string) {
    dispatch(fetchProduct(cat_prefix)).then(() => {
      navigate(`/categories/${cat_prefix}`, {
        state: { cat_prefix },
      });
    });
  }

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "sa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();
  const translatedTitle = t(`Title_${title}`);

  return (
    <Row className="justify-content-center align-items-center mb-4 " key={id}>
      <Col className="d-flex flex-wrap justify-content-center ">
        <Atropos
          className="my-atropos"
          key={id}
          activeOffset={40}
          shadowScale={5}
        >
          <Card
            className={styles.customCard}
            data-atropos-offset="-3.15"
            data-atropos-opacity=".9;1"
          >
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title className={styles.cardTitle}>
                {translatedTitle}
              </Card.Title>
              <Button
                variant="primary"
                className={styles.customButton}
                onClick={() => handleClickCategory(prefix)}
              >
                {t("Available Products")}
              </Button>
            </Card.Body>
          </Card>
        </Atropos>
      </Col>
    </Row>
  );
};

export default CartegoryCard;
