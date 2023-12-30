import { useEffect } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { fetchOrdersByUserId } from "../../store/order/thunk";
import style from "./order.module.css";

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
      <Col xs={12}>
        <Card className={`mb-4 mb-md-0 ${style.responsiveCard}`}>
          <Card.Body>
            <h5>{t("Order History")}</h5>
            <Accordion className={style.custom_accordion}>
              {orders.map((order, index) => (
                <Accordion.Item key={index} eventKey={`${index}`}>
                  <Accordion.Header className={style.accordion_header}>
                    {t("Order ID: ")}
                    {`${order.id}`}
                  </Accordion.Header>
                  <Accordion.Body className={style.accordion_body}>
                    {Array.isArray(order.orders) &&
                      order.orders.map((item, idx) => (
                        <Card key={idx} className={`${style.custom_card} mb-3`}>
                          <Card.Body className="card-body">
                            <div className={style.product_info}>
                              <Card.Img
                                src={item.product?.img}
                                alt="Product Image"
                                className={style.product_image}
                              />
                              <div className={style.product_details}>
                                <Card.Text className={style.product_text}>
                                  <span className={style.product_info_label}>
                                    {t("Quantity")}:
                                  </span>
                                  {item.quantity},
                                  <span className={style.product_info_label}>
                                    {t("Product")}:
                                  </span>
                                  {item.product?.title},
                                  <span className={style.product_info_label}>
                                    {t("Price")}:
                                  </span>
                                  ${item.product?.price}
                                </Card.Text>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderHistory;
