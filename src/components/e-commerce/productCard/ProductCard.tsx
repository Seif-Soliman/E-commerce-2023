import { addToCart } from "../../../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ProductType } from "../../../store/product/productTypes";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { updateQuantityFilterProduct } from "../../../store/filteredProduct/filterProductSlice";
import { getQuantityById } from "../../../store/cart/cartSlice";
import { FC } from "react";

const ProductCard: FC<ProductType> = ({
  id,
  title,
  price,
  cat_prefix,
  img,
  max_quantity,
}) => {
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
        // quantity: quantityFromCart - 1,
        quantity: max_quantity - 1,
      })
    );
  };

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Category: {cat_prefix}</ListGroup.Item>
          <ListGroup.Item>Price: ${price}</ListGroup.Item>
          <ListGroup.Item>
            Available quantity: {max_quantity - quantityFromCart}
          </ListGroup.Item>
        </ListGroup>
        <Button
          variant="primary"
          onClick={handleClick}
          disabled={max_quantity - quantityFromCart === 0}
        >
          Add to Cart 🛒
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
