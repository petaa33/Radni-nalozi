import {useState} from "react";
import { ListGroup, ListGroupItem, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useWarrant } from "../../context/WarrantContext";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const W_Form2 = ({ hidden }) => {
  const {warrant} = useWarrant();
  const {auth} = useUser();

  const getDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const date = dd + "/" + mm + "/" + yyyy;

    return date;
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleWarrant = async() => {

    const warrantModel = {
      user_id: auth.user.id,
      material_id: warrant.material.id,
      quantity: warrant.material.quantity,
      factory_id: warrant.factory.id,
      subwarrants: warrant.subwarrants,
    }

    try {
      axios.defaults.withCredentials = true;
      console.log("Sending warrant model", warrantModel);

      const res = await axios.post(process.env.REACT_APP_WARRANTS_NEW_WARRANT, {
        warrant: warrantModel});

      console.log("Response baseWARRATN 3", res);

      toggle();
    } catch (error) {
      if(error) throw error;
    }
  }

  return (
    !hidden && (
      <div>
        <div>
            Matični podaci
        <ListGroup horizontal>
          <ListGroupItem>
            ID Osobe <div>{auth.user.id}</div>
          </ListGroupItem>
          <ListGroupItem>
            Ime <div>{auth.user.first_name}</div>
          </ListGroupItem>
          <ListGroupItem>
            Prezime <div>{auth.user.last_name}</div>
          </ListGroupItem>
          <ListGroupItem>
            Datum <div>{getDate()}</div>
          </ListGroupItem>
          <ListGroupItem>
            Proizvodni nalog <div>3155</div>
          </ListGroupItem>
        </ListGroup>
        </div>
        <div>
            Podaci o materijalu
        <ListGroup horizontal>
          <ListGroupItem>
            Sifra materijala <div>{warrant.material.id}</div>
          </ListGroupItem>
          <ListGroupItem>
            Materijal <div>{warrant.material.name}</div>
          </ListGroupItem>
          <ListGroupItem>
            Kolicina <div>{warrant.material.quantity}</div>
          </ListGroupItem>
          <ListGroupItem>
            Mj. jedinica <div>{warrant.material.measure}</div>
          </ListGroupItem>
        </ListGroup>
        </div>
        <div>Podaci o utrošnom materijalu</div>
        <div style={{height: "150px", overflow: "hidden", overflowY: "visible"}}>
          {warrant.subwarrants.map((sw)=> 
            <ListGroup horizontal style={{margin: "5px 0"}}>
              <ListGroupItem>
                ID <div>{sw.id}</div>
              </ListGroupItem>
              <ListGroupItem>
                Materijal <div>{sw.name}</div>
              </ListGroupItem>
              <ListGroupItem>
                Količina <div>{sw.quantity}</div>
              </ListGroupItem>
              <ListGroupItem>
                Mj. jedinica <div>{sw.measure}</div>
              </ListGroupItem>
            </ListGroup>
          )}
        </div>
        <div className="mt-2">
          Finalna izrada materijala obavalja se u tvornici <strong>{warrant.factory.name}</strong>.
          Utrošni materijali dolaze iz različith skladišta.
        </div>

        <Button outline color="success" style={{width: "100%", marginTop: "10px"}} onClick={toggle} disabled={warrant.factory.id === null}>
            Izvrši proizvodni nalog
        </Button>

        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>handleWarrant()}>
            Do Something
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  );
};

export default W_Form2;
