import BaseDropdown from "../base_components/BaseDropdown";
import BaseUnitDropdown from "../base_components/BaseUnitDropdown";
import { Row, Col, Label, Button } from "reactstrap";
import { useState} from "react";
import { useWarrant } from "../context/WarrantContext";
import { VictoryPie } from "victory";
import axios from "axios";
import BaseWarrantTable from "../base_components/BaseWarrantTable";

const MaterialsDashboard = () => {
  const [unit, setUnit] = useState(null);
  const [stats, setStats] = useState([]);
  const [hideTable, setHideTable] = useState(true);
  const {
    warrant: {
      factory: { id },
    },
  } = useWarrant();

  const handleGraphs = async () => {
    const info = {
      wh_id: id,
      unit,
    };
    setStats([]);
    setHideTable(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3001/dashboard/statistics",
        { info }
      );

      console.log("This is handleGraphsUn", data);
      for (let i = 0; i < 8; i++) {
        if (data.rows[i] === undefined) {
          return;
        }
        setStats((prevStats) => [
          ...prevStats,
          {
            x: data.rows[i].name,
            y: data.rows[i].num_of_items,
            z: data.rows[i].measure,
          },
        ]);
        setHideTable(false);
      }
    } catch (error) {
      if (error) throw error;
    }
  };

  return (
    <div>
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Label style={{ fontSize: "1.3rem" }}>Odaberi skladište</Label>
        </Col>
        <Col>
          <BaseDropdown index={0} assetKey={"factories"} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label style={{ fontSize: "1.3rem" }}>Odaberi mjernu jedinicu</Label>
        </Col>
        <Col>
          <BaseUnitDropdown setUnit={setUnit} />
        </Col>
      </Row>
      <Row>
        <Button
          color="success"
          style={{ margin: "10px 0" }}
          onClick={() => handleGraphs()}
        >
          Prikaži
        </Button>
      </Row>
      {!hideTable && (
        <Row>
          <Col>
            <VictoryPie
              data={stats}
              height={10}
              innerRadius={10}
              labelRadius={({ innerRadius }) => innerRadius + 30}
              radius={80}
              colorScale={[
                "indigo",
                "blue",
                "magenta",
                "darkblue",
                "plum",
                "lightpink",
                "violet",
                "purple",
              ]}
              
              padAngle={2}
              style={{labels: { fontSize: ({ text }) => text.length > 10 ? 8 : 12, fill: "white" }}}
            />
            <BaseWarrantTable materials={stats} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default MaterialsDashboard;
