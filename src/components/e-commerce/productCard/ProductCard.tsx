import { addToCart } from "../../../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ProductType } from "../../../store/product/productTypes";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { updateQuantityFilterProduct } from "../../../store/filteredProduct/filterProductSlice";
// import { updateQuantity } from "../../../store/cart/cartSlice";
import { getQuantityById } from "../../../store/cart/cartSlice"; // Import the selector to get quantity from cart

type props = {
  product: ProductType;
};

const ProductCard = ({ product }: props) => {
  const dispatch = useAppDispatch();

  const quantity = useAppSelector(
    (state) => state.filterproduct.quantity[product.id] ?? product.max_quantity
  );
  const quantityFromCart = useAppSelector((state) =>
    getQuantityById(state, product.id)
  );

  const handleClick = () => {
    dispatch(addToCart(product));
    dispatch(
      updateQuantityFilterProduct({
        id: product.id,
        quantity: quantityFromCart - 1,
      })
    );
  };
  console.log(quantity);
  return (
    <Card style={{ width: "18rem" }} key={product.id}>
      <Card.Img variant="top" src={product.img} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Category: {product.cat_prefix}</ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>
            Available quantity: {product.max_quantity - quantityFromCart}
          </ListGroup.Item>
        </ListGroup>
        <Button
          variant="primary"
          onClick={handleClick}
          disabled={product.max_quantity - quantityFromCart === 0}
        >
          Add to Cart 🛒
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
