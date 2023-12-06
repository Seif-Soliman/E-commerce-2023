import { removeFromCart, updateQuantity } from "../../../store/cart/cartSlice";
import { ProductType } from "../../../store/product/productTypes";
import styles from "./Cart.module.css";
import { CheckoutState } from "../../../store/cart/cartTypes";
import { useAppDispatch } from "../../../store/hooks";

type props = {
  items: { [productID: string]: number };
  products: { [id: string]: ProductType };
  checkoutState: CheckoutState;
  errorMsg: string;
  totalPrice: string;
};

const CartCard = ({ items, products }: props) => {
  const dispatch = useAppDispatch();

  function onQuantityChanged(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ quantity, id }));
  }

  return (
    <main>
      <tbody>
        {Object.entries(items).map(
          (
            [id, quantity] //obj.entry split entry into array of arrays
          ) => (
            <tr key={id}>
              <td>{products[id].title}</td>
              <td>
                <select
                  className={styles.input}
                  value={quantity}
                  onChange={(e) => onQuantityChanged(e, id)}
                >
                  {[...Array(products[id].max_quantity)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </td>
              <td>${products[id].price}</td>
              <td>
                <button
                  aria-label={`Remove ${products[id].title} from Shopping Cart`}
                  onClick={() => dispatch(removeFromCart(id))}
                >
                  X
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </main>
  );
};

export default CartCard;
