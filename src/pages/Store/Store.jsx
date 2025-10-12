import { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Spinner, Alert } from "react-bootstrap";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Category = ["laptops", "smartphones", "tablets"];

function Store() {
  const [products, setProducts] = useState({});
  const [activeTab, setActiveTab] = useState("laptops");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all(
          Category.map((cat) =>
            fetch(`https://dummyjson.com/products/category/${cat}`).then(
              (res) => res.json()
            )
          )
        );
        const data = {};
        Category.forEach((cat, i) => {
          data[cat] = response[i].products;
        });
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Error al traer productos");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddCart = (prod) => {
    alert(`El producto ${prod.title} se agrego al carrito.`);
  };

  return (
    <Container className="mt-4 containerStore">
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
          products[activeTab]?.map((prod) => (
            <Col md={4} className="mb-4" key={prod.id}>
              <ProductCard prod={prod} addCart={handleAddCart} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Store;
