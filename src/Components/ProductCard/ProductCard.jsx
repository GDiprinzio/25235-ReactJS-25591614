import React from "react";
import { Card, Button } from "react-bootstrap";

export default function ProductCard({ prod, addCart }) {
  return (
    <Card className="card-product h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={prod.thumbnail}
        alt={prod.title}
        className="card-img-top"
      />
      <Card.Body>
        <Card.Title>{prod.title}</Card.Title>
        <Card.Text className="text-muted">{prod.category}</Card.Text>
        <Card.Text>
          {prod.description.length > 60
            ? prod.description.slice(0, 60) + "..."
            : prod.description}
        </Card.Text>
        <Card.Text className="fw-bold text-primary">${prod.price}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button variant="primary" size="sm" onClick={() => addCart(prod)}>
          Comprar
        </Button>
      </Card.Footer>
    </Card>
  );
}
