import { useEffect } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { fetchOrdersByUserId } from "../../store/order/thunk";

const OrderHistory = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.order.orders);

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "sa") {
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
      <Col md="12">
        <Card className="mb-4 mb-md-0">
          <Card.Body>
            <h5>{t("Order History")}</h5>
            <Accordion className="rounded-3">
              {orders.map((order, index) => (
                <Accordion.Item key={index} eventKey={`${index}`}>
                  <Accordion.Header>
                    {t("Order ID: ")}
                    {`${order.id}`}
                  </Accordion.Header>
                  <Accordion.Body>
                    {Array.isArray(order.orders) ? (
                      order.orders.map((item, idx) => (
                        <Card key={idx}>
                          <Card.Body>
                            <Card.Img src={item.img} />
                            <Card.Text>
                              {t("Quantity")}: {item.quantity}, {t("Product")}:
                              {item.product?.title}, {t("Price")}: $
                              {item.product?.price}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <Card.Body>
                          <Card.Img src={order.orders?.product?.img} />
                          <Card.Text>
                            {t("Quantity")}: {order.orders?.quantity},{" "}
                            {t("Product")}:{order.orders?.product?.title},{" "}
                            {t("Price")}: ${order.orders?.product?.price}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            {/* <ListGroup className="rounded-3">
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
            </ListGroup> */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderHistory;
