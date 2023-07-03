import LoginForm from "../components/LoginForm";
import LoginImage from "../images/vaporwaveRobot.png";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <Container fluid className="container-main">
      <Row style={{height: "100%"}}>
        <Col lg={6} style={{padding: "0", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor:"white"}}>
          <div style={{display:"flex", flexDirection: "column", alignItems: "center", fontSize:"1.5rem", fontWeight: 600}}>
            <div>Dobrodošli u ERPIS</div>
            <div>Ulogirajte se da nastavite</div>
          </div>
          <div style={{display:"flex", flexDirection: "column", alignItems: "center", margin: "20px 0"}}>
            <div>Nemate korisnički račun?</div>
            <Link to="/register" style={{color: "#26ff67",}}>Kreiraj korisnički račun</Link>
          </div>
          <LoginForm />
        </Col>
        <Col lg={6} style={{ backgroundColor: "#5cff8d", padding: "0", height: "100%"}}>
          <img src={LoginImage} alt="login-image" style={{height: "100%", width: "100%"}}/>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
