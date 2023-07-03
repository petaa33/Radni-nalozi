import { VictoryArea, VictoryChart, VictoryPolarAxis } from "victory";
import { useState, useEffect } from "react";
import axios from "axios";

const BaseVictoryPolar = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async() => {
        try {
            const {data} = await axios.get(process.env.REACT_APP_DASHBOARD_DATES);
            console.log(data.data);

            data.data.map((item)=>setData((prevData)=>[...prevData, {x: item.date_of_warrant.slice(5, 10), y: parseInt(item.count)}]))
        } catch (error) {
            if(error) throw error;
        }
    }

    fetchData();

  }, []);
  return (
    <VictoryChart>
      <VictoryArea
        data={data}
        style={{
          data: { fill: "whitesmoke", stroke: "#302387", strokeWidth: "2" },
        }}
        labels={({datum})=>datum.y}
        interpolation="monotoneX"
      />
    </VictoryChart>
  );
};

export default BaseVictoryPolar;
