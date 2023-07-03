import { Table } from "reactstrap";
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalUI from "./UI/ModalUI";

const WarrantTable = () => {
  const [materials, setMaterials] = useState([]);
  const [submaterials, setSubmaterials] = useState([]);
  const [modalMat, setModalMat] = useState(false);
  const [modalSubmat, setModalSubmat] = useState(false);
  const [warrantId, setWarrantId] = useState(null);

  const toggleStatus = () => setModalMat(!modalMat);
  const toggleEdit = () => setModalSubmat(!modalSubmat);

  useEffect(() => {
    const getWarrants = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          process.env.REACT_APP_WARRANTS_ALL
        );

        setMaterials(data.warrants);
      } catch (error) {
        if (error) throw error;
      }
    };

    getWarrants();

    return () => {
      setMaterials([]);
      setWarrantId(null);
    };
  }, []);

  const getSubMaterials = async (id) => {
    const warrant_id = { id };
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_WARRANTS_SUBWARRANTS,
        { warrant_id }
      );

      setSubmaterials([]);
      setSubmaterials(data.data);
    } catch (error) {
      if (error) throw error;
    }
  };

  useEffect(() => {
    warrantId !== null && getSubMaterials(warrantId);
  }, [warrantId]);

  return (
    <>
      <Table hover>
        <thead>
          <tr key={1231}>
            <th>
              Proizvodni Nalog <div>ID</div>
            </th>
            <th>Skladište ID</th>
            <th>Skladište Ime</th>
            <th>Materijal ID</th>
            <th>Materijal Ime</th>
            <th>Količina</th>
            <th>Mjerna jedinica</th>
            <th>Datum / Vrijeme</th>
            <th>Status</th>
            <th>Uredi / Završi</th>
          </tr>
        </thead>

        <tbody>
          {materials.length > 0 &&
            materials.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.wh_id}</td>
                  <td>{item.wh_name}</td>
                  <td>{item.material_id}</td>
                  <td>{item.mat_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.measure}</td>
                  <td>{item.date_of_warrant.slice(0, 10)} / {item.time.slice(0,8)}</td>
                  <td style={{ color: item.status ? "green" : "orange" }}>
                    {item.status ? "Završen" : "U tijeku"}
                    <div>{item.date_end_of_warrant !== null && item.date_end_of_warrant.slice(0,10)} / {item.time_end_of_warrant !== null && item.time_end_of_warrant.slice(0,8)}</div>
                  </td>
                  <td
                    style={{
                      backgroundColor: "#00FFAB",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setWarrantId(item.id);
                      toggleEdit();
                    }}
                  >
                    <AiFillEdit
                      style={{
                        fontSize: "2rem",
                        color: "white",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: item.status ? "lavender" : "#00FFAB",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: item.status === true ? "default" : "pointer"
                    }}
                    onClick={() => {
                      setWarrantId(item.id);
                      !item.status && toggleStatus();
                    }}
                  >
                    <AiFillCheckCircle
                      style={{
                        fontSize: "2rem",
                        color: "white",
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ModalUI
        materials={materials}
        submaterials={submaterials}
        toggleStatus={toggleStatus}
        toggleEdit={toggleEdit}
        modalMat={modalMat}
        modalSubmat={modalSubmat}
        setMaterials={setMaterials}
        setSubmaterials={setSubmaterials}
        warrantId={warrantId}
      />
    </>
  );
};

export default WarrantTable;
