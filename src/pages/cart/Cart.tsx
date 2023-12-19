import React from "react";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  getTotalPrice,
  removeFromCart,
  updateQuantity,
} from "../../store/cart/cartSlice";
import { checkoutCart, itemInCart } from "../../store/cart/thunk";
import styles from "./Cart.module.css";
import { updateQuantityFilterProduct } from "../../store/filteredProduct/filterProductSlice";
import { updateOrder } from "../../store/order/orderSlice";
import { CartState } from "../../store/cart/initialState";

export function Cart() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.product.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
  const errorMsg = useAppSelector((state) => state.cart.errorMsg);
  const id = useAppSelector((state) => state.auth.currentUser?.user.id);

  const handleClickQuanatityRemove = (
    productId: string,
    max_quantity: number
  ) => {
    dispatch(removeFromCart(parseInt(productId)));
    dispatch(
      updateQuantityFilterProduct({
        id: parseInt(productId),
        quantity: max_quantity,
      })
    );
  };

  function handleClickID(id: string) {
    dispatch(itemInCart(id));
  }

  function onQuantityChanged(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ quantity, id }));
    dispatch(updateQuantityFilterProduct({ id, quantity }));
  }

  const item = useAppSelector((state) => state.cart.receivedItems);

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cart: CartState = {
      items,
      checkoutState,
      errorMsg,
      receivedItems: item,
    };

    const userId = id;
    dispatch(checkoutCart());
    dispatch(updateOrder({ cart, userId }));
  }

  //classname to join different conditional classes for css
  const tableClasses = classNames({
    [styles.table]: true,
    [styles.checkoutError]: checkoutState === "Error",
    [styles.checkoutLoading]: checkoutState === "Loading",
  });

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([id, quantity]: [string, number]) => {
            const productId = parseInt(id); // Parse the ID string to a number
            const product = products.find((prod) => prod.id === productId); // Find the product by ID

            return (
              <tr key={id}>
                <td onClick={() => handleClickID(id)}>{product?.title}</td>
                <td>
                  <select
                    className={styles.input}
                    value={quantity}
                    onChange={(e) => onQuantityChanged(e, productId)} // Convert the ID back to string for compatibility
                  >
                    {[...Array(product?.max_quantity || 0)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>${product?.price}</td>
                <td>
                  <button
                    aria-label={`Remove ${product?.title} from Shopping Cart`}
                    onClick={() =>
                      handleClickQuanatityRemove(
                        productId.toString(),
                        product?.max_quantity || 0
                      )
                    }
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={onCheckout}>
        {checkoutState === "Error" && errorMsg ? (
          <p className={styles.errorBox}>{errorMsg}</p>
        ) : null}
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
