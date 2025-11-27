import React, { useState, useContext, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { CrudContext } from "../../context/crudContext";

export default function Admin() {
  const {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    reload,
  } = useContext(CrudContext);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image1: "",
    image2: "",
  });
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState(null);

  const allProducts = useMemo(() => {
    const arr = [];
    Object.keys(products || {}).forEach((cat) => {
      (products[cat] || []).forEach((p) => arr.push({ ...p, category: cat }));
    });
    return arr;
  }, [products]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      price: "",

      image1: "",
      image2: "",
    });
    setErrors([]);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title || "",
      description: p.description || "",
      price: p.price || "",
      category: p.category || categories[0] || "",
      image1: (p.images && p.images[0]) || p.thumbnail || "",
      image2: (p.images && p.images[1]) || "",
    });
    setErrors([]);
    setShowModal(true);
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = [];
    if (!form.title || !form.title.trim()) errs.push("title");
    if (!form.description || form.description.length < 10)
      errs.push("description");
    if (
      !form.price ||
      Number(form.price) <= 0 ||
      Number.isNaN(Number(form.price))
    )
      errs.push("price");
    return errs;
  };

  const handleSubmit = async () => {
    const v = validate();
    if (v.length) {
      setErrors(v);
      return;
    }

    const images = [];
    if (form.image1 && form.image1.trim()) images.push(form.image1.trim());
    if (form.image2 && form.image2.trim()) images.push(form.image2.trim());

    if (editing) {
      const payload = {
        ...editing,
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        images,
      };
      const res = await updateProduct(payload);
      if (res && res.ok) {
        setMsg("Producto actualizado.");
        setShowModal(false);
      } else {
        setErrors(res.errors || [res.message || "error"]);
      }
    } else {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        images,
      };
      const res = await createProduct(payload);
      if (res.ok) {
        setMsg("Producto creado.");
        setShowModal(false);
      } else {
        setErrors(res.errors || ["error"]);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    await deleteProduct(id);
    setMsg("Producto eliminado.");
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>Administrar Productos</h2>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" onClick={() => reload()}>
            Recargar
          </Button>{" "}
          <Button onClick={openCreate}>Agregar producto</Button>
        </Col>
      </Row>

      {msg && (
        <Row>
          <Col>
            <Alert variant="success" onClose={() => setMsg(null)} dismissible>
              {msg}
            </Alert>
          </Col>
        </Row>
      )}

      {error && (
        <Row>
          <Col>
            <Alert variant="danger">Error: {String(error)}</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Título</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th style={{ width: 160 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5">Cargando...</td>
                </tr>
              ) : allProducts.length === 0 ? (
                <tr>
                  <td colSpan="5">No hay productos.</td>
                </tr>
              ) : (
                allProducts.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{Number(p.price).toFixed(2)}</td>
                    <td>{p.category}</td>
                    <td>{p.description?.slice(0, 80)}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => openEdit(p)}
                      >
                        Editar
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "Editar producto" : "Nuevo producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errors.length > 0 && (
            <Alert variant="danger">
              Validación: {errors.join(", ")} (title, description &gt;=10, price
              &gt; 0)
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                name="category"
                value={form.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Imagen 1 (URL)</Form.Label>
              <Form.Control
                name="image1"
                value={form.image1}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Imagen 2 (URL)</Form.Label>
              <Form.Control
                name="image2"
                value={form.image2}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
