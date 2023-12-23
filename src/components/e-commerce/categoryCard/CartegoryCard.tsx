import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { CategoryType } from "../../../store/category/categoryTypes";
import { fetchProduct } from "../../../store/filteredProduct/filterProductSlice";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FC, useEffect } from "react";
import i18n from "../../../locales/i18n";
import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/Col";

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
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={id}>
      <Card style={{ minWidth: "14rem", maxWidth: "100%" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{translatedTitle}</Card.Title>
          <Button variant="primary" onClick={() => handleClickCategory(prefix)}>
            {t("Available Products")}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CartegoryCard;
