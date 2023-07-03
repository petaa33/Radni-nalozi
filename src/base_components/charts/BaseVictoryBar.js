import { VictoryChart, VictoryBar } from "victory";
import { useState, useEffect } from "react";
import axios from "axios";

const BaseVictoryBar = () => {
  const[data, setData] = useState([]);

  useEffect(()=>{

    const fetchDates = async() => {
      try {
        const {data} = await axios.get(process.env.REACT_APP_DASHBOARD_WAREHOUSES);
        console.log("bokb", data);
        data.data.map(item=>setData((prevData)=>[...prevData, {x: `${item.warehouse_id} / ${item.material_id}`, y: parseInt(item.num_of_items)}]))
  
      } catch (error) {
        if(error) throw error;
      }
    }
    fetchDates();

    return () => {
      setData([]);
    }
  }, []);

  return (
    <VictoryChart >
      <VictoryBar
        style={{ data: { fill: "indigo", strokeWidth: "2" } }}
        data={data}
        alignment="start"
        width={300} height={300} padding={{left: 10, right: 10}}
      />
    </VictoryChart>
  );
};

export default BaseVictoryBar;
