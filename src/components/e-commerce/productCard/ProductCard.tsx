import { useTranslation } from "react-i18next";
import { addToCart, getQuantityById } from "../../../store/cart/cartSlice";
import { ProductType } from "../../../store/product/productTypes";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import styles from "./ProductCard.module.css";
import { Row } from "react-bootstrap";
import { updateQuantityFilterProduct } from "../../../store/product/productSlice";

interface Props extends ProductType {}

const ProductCard: React.FC<Props> = ({
  id,
  title,
  price,
  cat_prefix,
  img,
  max_quantity,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const quantityFromCart = useAppSelector((state) =>
    getQuantityById(state, id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, cat_prefix, img, max_quantity }));
    dispatch(
      updateQuantityFilterProduct({
        id: id.toString(),
        quantity: max_quantity - quantityFromCart,
      })
    );
  };

  const translatedCategory: string = t(`Category_${cat_prefix}`);
  const productName: string = t(`ProductName_${title}`);

  return (
    <Row className="justify-content-center align-items-center mb-4 " key={id}>
      <Col className="mb-4">
        <Card className={styles.customCard}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{productName}</Card.Title>
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
              onClick={handleAddToCart}
              disabled={max_quantity - quantityFromCart === 0}
            >
              {t("Add to Cart")} 🛒
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductCard;
