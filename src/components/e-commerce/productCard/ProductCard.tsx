import { addToCart, getQuantityById } from "../../../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ProductType } from "../../../store/product/productTypes";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { updateQuantityFilterProduct } from "../../../store/filteredProduct/filterProductSlice";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const ProductCard: FC<ProductType> = ({
  id,
  title,
  price,
  cat_prefix,
  img,
  max_quantity,
}) => {
  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const product = { id, title, price, cat_prefix, img, max_quantity };

  const quantityFromCart = useAppSelector((state) =>
    getQuantityById(state, id)
  );

  const handleClick = () => {
    dispatch(addToCart(product));
    dispatch(
      updateQuantityFilterProduct({
        id: id,
        quantity: max_quantity - 1,
      })
    );
  };

  const translatedCategory = t(`Category_${cat_prefix}`);

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {t("Category")}: {translatedCategory}
          </ListGroup.Item>
          <ListGroup.Item>
            {t("Price")}: ${price}
          </ListGroup.Item>
          <ListGroup.Item>
            {t("Available quantity")}: {max_quantity - quantityFromCart}
          </ListGroup.Item>
        </ListGroup>
        <Button
          variant="primary"
          onClick={handleClick}
          disabled={max_quantity - quantityFromCart === 0}
        >
          {t("Add to Cart")} 🛒
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
