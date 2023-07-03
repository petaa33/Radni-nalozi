import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const Warrant = createContext();

export const WarrantContext = ({children}) => {
  const [warrant, setWarrant] = useState({
    id: null,
    factory: {
        id: null,
        name: null,
        location: null,
    },
    material: {
        id: null,
        name: null,
        measure: null,
        quantity: null
    },
    subwarrants: [
      {
        sub_material_id: null,
        quantity: null,
        warehouse_id: null,
      }
    ]
  });

  //Warrant states
  const [factories, setFactories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDropdownInfo = async () => {
      try {
        axios.defaults.withCredentials = true;
        const _materials = await axios.post(
          process.env.REACT_APP_WARRANTS_MATERIALS,
        );

        const buildings = await axios.post(
          process.env.REACT_APP_WARRANTS_WAREHOUSES,
        )

        const _factories = [];
        const _warehouses = [];

        buildings.data.rows.map((b)=>{
          if(b.isfactory) {
            return _factories.push(b);
          }
          return _warehouses.push(b);
        })

        setFactories(_factories);
        setWarehouses(_warehouses);
        setMaterials(_materials.data.rows);
        setIsLoading(false);
      } catch (error) {
        if (error) {
          setIsLoading(true);
          throw error
        }
      }
    };

    getDropdownInfo();
    if(warehouses.length < 1 || materials.length < 1 || factories.length < 1) setIsLoading(true);
    return () => {
      setWarehouses([]);
      setFactories([]);
      setMaterials([]);
      setIsLoading(true);
    };
  }, []);

  return (<Warrant.Provider
      value={{ warrant, setWarrant, assets: [factories, materials, warehouses], isLoading }}
    >{children}</Warrant.Provider>
  );
};

export const useWarrant = () => {
  return useContext(Warrant);
};

