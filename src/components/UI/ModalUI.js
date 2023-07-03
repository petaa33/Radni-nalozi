import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";

const ModalUI = ({
  modalMat,
  modalSubmat,
  toggleStatus,
  toggleEdit,
  materials,
  submaterials,
  setSubmaterials,
  setMaterials,
  warrantId,
}) => {
  const [quantityInput, setQuantityInput] = useState(true);
  const findMaterialById = (id) => {
    console.log("This is id: ", id);
    return materials.findIndex((mat) => mat.id === id);
  };

  const updateSubmaterialQuantity = (id, quantity) => {
    const updatedArr = submaterials.map((sm) => {
      if (sm.sub_material_id === id) {
        return {
          ...sm,
          quantity: parseInt(quantity),
        };
      }
      return sm;
    });

    setSubmaterials(updatedArr);
  };

  const updateMaterialQuantity = (id, quantity) => {
    const updatedArr = materials.map((mat) => {
      if (mat.mat_id === id) {
        return {
          ...mat,
          quantity: parseInt(quantity),
        };
      }
      return mat;
    });

    setMaterials(updatedArr);
  };

  const handleUpdateWarrant = async () => {
    const warrant = {
      id: materials[findMaterialById(warrantId)].id,
      quantity: materials[findMaterialById(warrantId)].quantity,
      submaterials,
    };

    try {
      const { data } = await axios.put(
        process.env.REACT_APP_WARRANTS_UPDATE_WARRANT,
        { warrant }
      );

    } catch (error) {
      if (error) throw error;
    }
  };

  const handleUpdateQuantity = async () => {
    const warrant = {
      submaterials,
      material_id: materials[findMaterialById(warrantId)].material_id,
      quantity: materials[findMaterialById(warrantId)].quantity,
      factory_id: materials[findMaterialById(warrantId)].wh_id,
      id: warrantId,
    };
    try {
      const data = await axios.put(
        process.env.REACT_APP_WARRANTS_UPDATE_QUANTITY,
        { warrant }
      );

    } catch (error) {
      if (error) throw error;
    }
  };

  return (
    <>
      <Modal isOpen={modalMat} toggle={toggleStatus}>
        <ModalHeader toggle={toggleStatus}>
          Status proizvodnog naloga
        </ModalHeader>
        <ModalBody>
          <div>
            Ukoliko je proizvodni nalog završen/odrađen možeš pritisnuti zeleni
            gumb <strong style={{ color: "green" }}>Završi</strong>.
          </div>
          <div>
            Ukoliko želiš izbrisati proizvodni nalog možeš pritisnuti crveni
            gumb <strong style={{ color: "red" }}>Izbriši</strong>.
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              toggleStatus();
              handleUpdateQuantity();
            }}
          >
            Završi
          </Button>{" "}
          <Button color="danger" onClick={toggleStatus}>
            Izbriši
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalSubmat} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Status submaterijala</ModalHeader>
        <ModalBody>
          <div>
            Ukoliko želiš promijeniti količinu materijala ili submaterijala
            pritisni gumb uredi.
          </div>
          <Button
            color="primary"
            onClick={() => setQuantityInput(!quantityInput)}
          >
            Uredi
          </Button>
          <Table responsive>
            <thead>
              <tr key={1234}>
                <th>ID</th>
                <th>Ime materijala</th>
                <th>Količina</th>
                <th>Mj. jedinica</th>
              </tr>
            </thead>
            <tbody>
              {submaterials[0] !== undefined && ( // Main material
                <tr key={materials[findMaterialById(warrantId)].material_id}>
                  <td>
                    {materials[findMaterialById(warrantId)].material_id}
                  </td>
                  <td>{materials[findMaterialById(warrantId)].mat_name}</td>
                  <td>
                    <Input
                      value={materials[findMaterialById(warrantId)].quantity}
                      disabled={quantityInput}
                      onChange={(e) =>
                        updateMaterialQuantity(
                          materials[
                            findMaterialById(submaterials[0].warrant_id)
                          ].mat_id,
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>{materials[findMaterialById(warrantId)].measure}</td>
                </tr>
              )}

              {submaterials.map((sm) => (
                <>
                  <tr key={sm.sub_material_id}>
                    <th>ID</th>
                    <th>Ime submaterijala</th>
                    <th>Količina</th>
                  </tr>
                  <tr key={sm.sub_material_id + 1}>
                    <td>{sm.sub_material_id}</td>
                    <td>{sm.name}</td>
                    <td>
                      <Input
                        value={sm.quantity}
                        disabled={quantityInput}
                        onChange={(e) =>
                          updateSubmaterialQuantity(
                            sm.sub_material_id,
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>{sm.measure}</td>
                  </tr>
                  </>
              ))}
            </tbody>
          </Table>
          <div>
            Ukoliko želiš spremiti promjene pritisni gumb{" "}
            <strong style={{ color: "green" }}>Spremi</strong>.
          </div>
          <div>
            Ukoliko želiš vratiti promjene na staro pritisni gumb{" "}
            <strong style={{ color: "red" }}>Natrag</strong>.
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              handleUpdateWarrant();
              toggleEdit();
            }}
          >
            Spremi
          </Button>{" "}
          <Button color="danger" onClick={toggleEdit}>
            Natrag
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalUI;
