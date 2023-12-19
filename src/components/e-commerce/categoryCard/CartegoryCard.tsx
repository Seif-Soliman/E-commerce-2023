import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { CategoryType } from "../../../store/category/categoryTypes";
import { fetchProduct } from "../../../store/filteredProduct/filterProductSlice";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FC, useEffect } from "react";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

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
    i18n.changeLanguage("en");
  }, []);

  const { t } = useTranslation();
  const translatedTitle = t(`Title_${title}`);
  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{translatedTitle}</Card.Title>
        <Button variant="primary" onClick={() => handleClickCategory(prefix)}>
          {t("Available Products")}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartegoryCard;
