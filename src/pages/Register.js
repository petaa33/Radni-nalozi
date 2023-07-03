import RegisterForm from "../components/RegisterForm";
import ShowcaseWindow from "../components/ShowcaseWindow";
import { Row, Col, Container } from "reactstrap";

// TREBA PROMJENIT EMAIL ID TYPEFOR...
const Register = () => {
  return (
    <Container fluid style={{height: "100%", backgroundColor: "whitesmoke"}}>
      <Row className="h-100">
        <Col md="6" style={{backgroundColor:"#26ff67", padding: "0 10px 0 0"}}>
          <ShowcaseWindow />
        </Col>
        <Col md="6" style={{margin: "auto auto"}}>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
