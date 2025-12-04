import React, { useContext } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../context/cartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  const handleQtyChange = (id, value) => {
    const qty = Number(value) || 0;
    updateQuantity(id, qty);
  };

  return (
    <Container className="mt-4">
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th style={{ width: 140 }}>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{Number(item.price).toFixed(2)} €</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="0"
                      value={item.quantity || 1}
                      onChange={(e) => handleQtyChange(item.id, e.target.value)}
                    />
                  </td>
                  <td>
                    {(Number(item.price) * (item.quantity || 1)).toFixed(2)} €
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      alt="Eliminar del carrito"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faTrash} />
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="mt-3">
            <Col>
              <strong>Total: {getCartTotal().toFixed(2)} €</strong>
            </Col>
            <Col className="text-end">
              <Button
                variant="secondary"
                onClick={clearCart}
                alt="Vaciar carrito"
              >
                <FontAwesomeIcon icon={faTrash} /> Vaciar carrito
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;
