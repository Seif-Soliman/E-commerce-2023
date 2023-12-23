import { useTranslation } from "react-i18next";
import { addToCart, getQuantityById } from "../../../store/cart/cartSlice";
import { ProductType } from "../../../store/product/productTypes";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateQuantityFilterProduct } from "../../../store/filteredProduct/filterProductSlice";

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
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={id}>
      <Card style={{ minWidth: "14rem" }}>
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
  );
};

export default ProductCard;
