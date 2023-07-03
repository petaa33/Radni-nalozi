import { useState } from "react";
import { Form, Row, Progress, Button, ButtonGroup } from "reactstrap";
import W_Form1 from "./warrant_forms/W_Form1";
import W_Form2 from "./warrant_forms/W_Form2";
import W_Form3 from "./warrant_forms/W_Form3";
import { WarrantContext } from "../context/WarrantContext";
import BaseHeader from "../base_components/BaseHeader";

const WarrantForm = () => {
  const [form, setForm] = useState(1);

  return (
    <Row style={{height: "100%"}}>
      <BaseHeader color={"indigo"} borderColor={"#667eea"}>
        Izradi proizvodni nalog
      </BaseHeader>
      <Row style={{ justifyContent: "center", height: "65%" }}>
        <WarrantContext>
          <W_Form1 hidden={form === 1 ? false : true} />
          <W_Form2 hidden={form === 2 ? false : true} />
          <W_Form3 hidden={form === 3 ? false : true} />
        </WarrantContext>
      </Row>
      <Row style={{ width: "100%", justifyContent: "center"}}>
        <Progress value={33 * form} style={{ padding: 0, width: "96%" }}>
          {form}/3
        </Progress>
        <ButtonGroup style={{ height: "55px", margin: "10px 0" }}>
          <Button
            color="danger"
            outline
            disabled={form === 1}
            onClick={() => setForm((prevForm) => prevForm - 1)}
          >
            Nazad
          </Button>
          <Button
            color="primary"
            outline
            disabled={form === 3}
            onClick={() => setForm((prevForm) => prevForm + 1)}
          >
            Dalje
          </Button>
        </ButtonGroup>
      </Row>
    </Row>
  );
};

export default WarrantForm;
