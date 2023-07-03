import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  FormGroup,
} from "reactstrap";
import { useWarrant } from "../../context/WarrantContext";
import BaseDropdown from "../../base_components/BaseDropdown";
import BaseWarrantTable from "../../base_components/BaseWarrantTable";

const W_Form2 = ({ hidden }) => {
  const {warrant, setWarrant} = useWarrant();

  return (
    !hidden && (
      <div style={{ height: "80%" }}>
        <Row>
          <Col md={8}>
            <div>Materijal</div>
            <FormGroup floating className="warrant-form">
              <BaseDropdown index={1} assetKey={"material"} useInput={true}/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <div>Količina</div>
            <InputGroup>
              <Input placeholder="0" value={warrant.quantity} onChange={(e)=>setWarrant((prevState)=>({...prevState, material: {...prevState.material, quantity: e.target.value}})) }/>
              <InputGroupText>{warrant.material.measure}</InputGroupText>
            </InputGroup>
          </Col>
        </Row>
        {warrant.material.id !== null &&
        <Row>
          <Col>
          <BaseWarrantTable assetKey={"subwarrants"}/>
          </Col>
        </Row> }
      </div>
    )
  );
};

export default W_Form2;
