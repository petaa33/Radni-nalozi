import WarrantForm from "../components/WarrantForm";
import { Container, Row, Col } from "reactstrap";
import WarrantInfo from "../components/WarrantInfo";
import PrimaryTheme from "../themes/PrimaryTheme";

const WarrantWorkspace = () => {
  return (
    <Container
      fluid
      className="container-main"
    >
      <Row style={{height: "95%"}}>
        <Col md={6} style={{...PrimaryTheme, height: "100%"}}>
          <WarrantForm />
        </Col>
        <Col md={5} style={{...PrimaryTheme, height: "100%"}}>
          <WarrantInfo />
        </Col>
      </Row>
    </Container>
  );
};

export default WarrantWorkspace;
