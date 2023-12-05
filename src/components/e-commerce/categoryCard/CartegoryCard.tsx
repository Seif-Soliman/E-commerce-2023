import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { CategoryType } from "../../../store/category/categoryTypes";
import { fetchProduct } from "../../../store/filteredProduct/filterProductSlice";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

type props = {
  category: CategoryType;
};

const CartegoryCard = ({ category }: props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleClick(cat_prefix: string) {
    dispatch(fetchProduct(cat_prefix)).then(() => {
      navigate(`/categories/${cat_prefix}`, {
        state: { cat_prefix },
      });
    });
  }

  return (
    <Card style={{ width: "18rem" }} key={category.id}>
      <Card.Img variant="top" src={category.img} />
      <Card.Body>
        <Card.Title>{category.title}</Card.Title>
        <Button variant="primary" onClick={() => handleClick(category.prefix)}>
          Available Products
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartegoryCard;
