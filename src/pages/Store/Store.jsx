import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Nav, Spinner, Alert } from "react-bootstrap";
import ProductCard from "../../components/ProductCard/ProductCard";
import { productsContext } from "../../context/productsContext";
import { useCart } from "../../context/cartContext";

const Category = ["laptops", "smartphones", "tablets"];

function Store() {
  const { products } = useContext(productsContext);
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("laptops");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMsg, setCartMsg] = useState(null);

  useEffect(() => {
    if (products && Object.keys(products).length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [products]);

  const handleAddCart = (product) => {
    addToCart(product);
    setCartMsg({
      type: "success",
      text: `Producto "${product.title}" agregado al carrito.`,
    });
    setTimeout(() => {
      setCartMsg(null);
    }, 3000);
  };

  return (
    <Container className="mt-4 containerStore">
      {cartMsg && (
        <Row>
          <Col>
            <Alert
              variant={cartMsg.type}
              onClose={() => setCartMsg(null)}
              dismissible
            >
              {cartMsg.text}
            </Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <h2>Nuestro catálogo de Productos.</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Nav
            variant="tabs"
            activeKey={activeTab}
            className="mb-3 justify-content-center"
          >
            {Category.map((cat) => (
              <Nav.Item key={cat}>
                <Nav.Link eventKey={cat} onClick={() => setActiveTab(cat)}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      </Row>
      <Row>
        {loading && (
          <Col className="text-center">
            <Spinner animation="border" variant="primary" />
          </Col>
        )}
        {error && (
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        )}
        {!loading &&
          !error &&
          (products[activeTab] || []).map((prod) => (
            <Col md={4} className="mb-4" key={prod.id}>
              <ProductCard prod={prod} addToCart={handleAddCart} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Store;
