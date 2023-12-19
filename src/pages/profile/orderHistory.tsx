import { useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { fetchOrdersByUserId } from "../../store/order/thunk";

const OrderHistory = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.order.orders);

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const userDetails = currentUser?.user || {};
  const userId = userDetails.id;

  useEffect(() => {
    dispatch(fetchOrdersByUserId(userId));
  }, [dispatch, userId]);

  return (
    <Row>
      <Col md="6">
        <Card className="mb-4 mb-md-0">
          <Card.Body>
            <h5>{t("Order History")}</h5>
            <ListGroup className="rounded-3">
              {orders.map((order) => (
                <ListGroup.Item key={order.id}>
                  Order ID: {order.id},
                  {Array.isArray(order.orders) ? (
                    order.orders.map((item, index) => (
                      <div key={index}>
                        <img src={item.img} />
                        <p>Quantity: {item.quantity},</p>
                        <p>
                          Product:
                          {item.product?.title}
                        </p>
                        <p>Price: ${item.product?.price}</p>
                      </div>
                    ))
                  ) : (
                    <div>
                      <img src={order.orders?.product?.img} />
                      <p>Quantity: {order.orders?.quantity},</p>
                      <p>
                        Product:
                        {order.orders?.product?.title},
                      </p>
                      <p>Price: ${order.orders?.product?.price}</p>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderHistory;
