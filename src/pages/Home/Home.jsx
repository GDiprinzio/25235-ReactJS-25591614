import { Container, Row, Col, Carousel } from "react-bootstrap";
import "./Home.css";
export default function Home() {
  return (
    <Container className="containerHome">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Tienda de Hardware</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={10} xl={12}>
          <div className="carousel-wrapper">
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block carouselImg"
                  src="/CarouselHome/ASRock _ AMD AM4 Ser.png"
                  alt="Motherboard Asrock"
                />
                <Carousel.Caption>
                  <h3>Motherboards</h3>
                  <p>Variedad de modelos y marcas</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block carouselImg"
                  src="/CarouselHome/ASUS X870E_X870_B850.png"
                  alt="Motherboard Asus"
                />
                <Carousel.Caption>
                  <h3>Motherboards</h3>
                  <p>Variedad de modelos y marcas</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block carouselImg"
                  src="/CarouselHome/Procesadores de 14ª .png"
                  alt="Procesadores Intel"
                />
                <Carousel.Caption>
                  <h3>Pro</h3>
                  <p>Variedad de modelos y marcas</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block carouselImg"
                  src="/CarouselHome/Procesadores AMD Ryz.png"
                  alt="Procesadores AMD"
                />
                <Carousel.Caption>
                  <h3>Procesadores</h3>
                  <p>Intel y AMD al mejor precio</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block carouselImg"
                  src="/CarouselHome/Kingston FURYTM Beas.png"
                  alt="Memorias RAM Kingston"
                />
                <Carousel.Caption>
                  <h3>Memorias RAM</h3>
                  <p>DDR4 y DDR5 disponibles</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block carouselImg"
                  src="/CarouselHome/Computer Memory _ DD.png"
                  alt="Memorias RAM Crusial"
                />
                <Carousel.Caption>
                  <h3>Memorias RAM</h3>
                  <p>DDR4 y DDR5 disponibles</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <h4>Nosotros</h4>
          <p>
            Bienvenido a nuestra tienda de hardware. Encontrar los mejores
            componentes para armar tu PC gamer o workstation.
          </p>
        </Col>
        <Col md={6}>
          <h4>Servicios</h4>
          <p>
            Ofrecemos motherboards, procesadores, memorias RAM, SSDs y mucho
            más, con precios actualizados y garantía oficial. Ofrecemos el
            asesoramiento que necesitas para elegir los mejores componentes
            según tus necesidades y presupuesto. Además contamos con servicio
            técnico especializado para resolver todas tus dudas, y ayudarte a
            armar la PC de tus sueños o actualizar tu equipo actual.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
