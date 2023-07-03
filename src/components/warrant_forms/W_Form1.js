import { Col, Row, ListGroup, ListGroupItem } from "reactstrap";
import { BsBuilding } from "react-icons/bs";
import BaseDropdown from "../../base_components/BaseDropdown";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useWarrant } from "../../context/WarrantContext";
import { factoryIcon, warehouseIcon } from "../../base_components/reactleafletMarker";

const W_Form1 = ({ hidden }) => {
  const {
    assets: [factory,,warehouses],
    isLoading,
  } = useWarrant();

  const setMarker = (item, icon) => {
    return  <Marker key={item.id}
    position={[item.location.x, item.location.y]}
    icon={icon}
  />
  }

  return (
    !hidden && (
      <>
        <Row>
          <Col>
            <div>
              Tvornica <BsBuilding />
            </div>
            <BaseDropdown
              index={0}
              assetKey={"factory"}
            />
          </Col>
          <Col>
            <div>
              Popis Skladišta <BsBuilding />
            </div>
            <ListGroup horizontal>{warehouses.map((whs)=>{
              return (<ListGroupItem>{whs.name}</ListGroupItem>)
            })}</ListGroup>
            
          </Col>
        </Row>
        <MapContainer
          center={[45.1, 16]}
          zoom={7}
          scrollWheelZoom={false}
          style={{
            zIndex: 1,
            height: "80%",
            width: "95%",
            margin: "10px 0"
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {!isLoading && factory.map((fct)=> setMarker(fct, factoryIcon))}
          {!isLoading && warehouses.map((whs) => setMarker(whs, warehouseIcon))}
         
        </MapContainer>
      </>
    )
  );
};

export default W_Form1;
