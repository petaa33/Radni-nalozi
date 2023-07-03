import React from "react";
import {Table, Input} from "reactstrap";
import { useWarrant } from "../context/WarrantContext";
import { useState, useEffect } from "react";
import axios from "axios";

const BaseWarrantTable = ({assetKey}) => {
  const {warrant, setWarrant} = useWarrant();
  const[submaterials, setSubmaterials] = useState([
    {
      id: null,
      name: null,
      quantity: 0,
      measure: null,
    }
  ]);

  const handleSubmaterials = async(quantity, id) => {
    console.log("Quantity: ", quantity);
    const updatedArr = submaterials.map((sm)=> {
      if(sm.id === id) {
        return {...sm, quantity: parseInt(quantity)}
      }
      return sm;
    });

    setSubmaterials(updatedArr);
  }

  const fetchSubmaterials = async() => {
    try {
      axios.defaults.withCredentials = true;
      const material = {id: warrant.material.id}
      const {data} = await axios.post(process.env.REACT_APP_WARRANTS_SUBMATERIALS, {material});

      setSubmaterials(data.rows);
    } catch (error) {
      if(error) throw error;
    }
  }

  useEffect(()=>{
    fetchSubmaterials();

    return () => {
      setSubmaterials([]);
    }
  }, [warrant.material.id]);

  useEffect(()=>{
    setWarrant((prevState)=> ({...prevState, [assetKey]: submaterials}));
  }, [submaterials]);

  return (
    <Table responsive style={{height: "300px"}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Utrošni materijal</th>
          <th>Količina</th>
          <th>Mj. Jedinica</th>
        </tr>
      </thead>
      <tbody>
        {submaterials.map((mat)=>{
            return (
              <tr key={mat.id}>
                <td>{mat.id}</td>
                <td>{mat.name}</td>
                <td>
                  <Input
                  name="quantity"
                  placeholder="Količina..."
                  type="text"
                  value={submaterials.quantity}
                  onChange={(e)=>handleSubmaterials(e.target.value, mat.id)}
                />
              </td>
                <td>{mat.measure}</td>
              </tr>
            )
        })}
      </tbody>
    </Table>
  );
};

export default BaseWarrantTable;
