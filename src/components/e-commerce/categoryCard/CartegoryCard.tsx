import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { CategoryType } from "../../../store/category/categoryTypes";
import { fetchProduct } from "../../../store/filteredProduct/filterProductSlice";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FC } from "react";

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

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button variant="primary" onClick={() => handleClickCategory(prefix)}>
          Available Products
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartegoryCard;
