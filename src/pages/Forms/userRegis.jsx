import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function UserRegis() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validación email usando regex común.
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validación de password según la política requerida
  const validarPassword = (password) =>
    /^(?=.*[A-Z])(?=.*[@#$&!+\*\-])(?=(?:.*\d){2,}).{8,}$/.test(password);

  // Maneja los cambios en los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestión del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido) newErrors.apellido = "El apellido es obligatorio";
    if (!validarEmail(formData.email)) newErrors.email = "Email inválido";
    if (!validarPassword(formData.password))
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un símbolo @#$&!+*- y dos dígitos numéricos";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aquí se puede enviar/guardar el formulario
      console.log("Formulario enviado:", formData);
      // Limpiar formulario si se desea
      setFormData({ nombre: "", apellido: "", email: "", password: "" });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-dark text-white p-4 rounded mt-4"
      style={{ maxWidth: 480, margin: "0 auto" }}
    >
      <Form.Group className="mb-3" controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          isInvalid={!!errors.nombre}
        />
        <Form.Control.Feedback type="invalid">
          {errors.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formApellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          isInvalid={!!errors.apellido}
        />
        <Form.Control.Feedback type="invalid">
          {errors.apellido}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          autoComplete="email"
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          autoComplete="new-password"
          // El atributo pattern ayuda, pero la validación real está en JS
        />
        <Form.Text className="text-light">
          La contraseña debe tener al menos 8 caracteres, una mayúscula, un
          símbolo especial (@#$&!+*-) y dos dígitos numéricos.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-2 w-100">
        Registrarse
      </Button>
    </Form>
  );
}

export default UserRegis;
