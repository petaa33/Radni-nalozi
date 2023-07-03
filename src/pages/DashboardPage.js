import { Row, Col, Container } from "reactstrap";
import BaseHeader from "../base_components/BaseHeader";
import MaterialsDashboard from "../components/MaterialsDashboard";
import { WarrantContext } from "../context/WarrantContext";
import BaseVictoryPolar from "../base_components/charts/BaseVictoryPolar";
import BaseVictoryBar from "../base_components/charts/BaseVictoryBar";
import PrimaryTheme from "../themes/PrimaryTheme";

const DashboardPage = () => {
  return (
    <Container fluid className="container-main">
      <Row style={{ height: "50%" }}>
        <Col style={{ ...PrimaryTheme }}>
          <Row>
            <BaseHeader color="indigo" borderColor="#667eea">
              Količina materijala u skladištu
              Skaldište ID / Materijal ID
            </BaseHeader>

            <BaseVictoryBar />
          </Row>
          <Row>
            <BaseHeader color="indigo" borderColor="#667eea">
              Broj naloga u tjednu - MM/DD
            </BaseHeader>
            <BaseVictoryPolar />
          </Row>
        </Col>
        <Col style={{ ...PrimaryTheme }}>
          <BaseHeader color="indigo" borderColor="#667eea">
            Materijali po mjernoj jedinici
          </BaseHeader>
          <WarrantContext>
            <MaterialsDashboard />
          </WarrantContext>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
