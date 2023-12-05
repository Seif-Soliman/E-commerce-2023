import { addToCart } from "../../../store/cart/cartSlice";
import { useAppDispatch } from "../../../store/hooks";
import { ProductType } from "../../../store/product/productTypes";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

type props = {
  product: ProductType;
};

const ProductCard = ({ product }: props) => {
  const dispatch = useAppDispatch();

  return (
    <Card style={{ width: "18rem" }} key={product.id}>
      <Card.Img variant="top" src={product.img} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Category: {product.cat_prefix}</ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>
            Quantity available: {product.max_quantity}
          </ListGroup.Item>
        </ListGroup>
        <Button
          variant="primary"
          onClick={() => {
            dispatch(addToCart(product.id));
          }}
        >
          Add to Cart 🛒
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
