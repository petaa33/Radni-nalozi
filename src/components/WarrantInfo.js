import WarrantTable from "./WarrantTable";
import { useUser } from "../context/UserContext";
import BaseHeader from "../base_components/BaseHeader";
import {Row, Column} from "reactstrap";

const WarrantInfo = () => {
  const {auth} = useUser();

  return (
    <Row style={{ height: "500px", overflow: "hidden", overflowY: "visible"}}>
      <BaseHeader color={"indigo"} borderColor={"#667eea"}>Moji proizvodni nalozi</BaseHeader>
      <h4>Korisnik - {auth.user.first_name} - {auth.user.id}</h4>
      <WarrantTable />
    </Row>
  );
};

export default WarrantInfo;
