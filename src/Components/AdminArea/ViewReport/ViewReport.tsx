import "./ViewReport.css";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useLocation,useNavigate} from "react-router-dom";
import { CategoryScale, Chart ,registerables} from "chart.js";

import { useSelector } from "react-redux"

Chart.register(...registerables);

function ViewReport(): JSX.Element {

  const navigate = useNavigate();
  let user = useSelector((state: any) => state.authSlice);

  useEffect(() => {
      if (user.userData==null) {
          navigate("/login"); 
      }
  },[user.userData]);
  
  const {state} = useLocation();
  const { vacations } = state;

  const [chartData, setChartData] = useState({
      labels: vacations.map((vac: any) => vac.destination), 
      datasets: [
        {
          label: "Users Gained ",
          data: vacations.map((vac: any) => vac.count),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
          ],
          borderColor: "black",
          borderWidth: 2
        }
      ]
  });
    
  return(
       <div>
          <div className="chart-container">
          <h2 style={{ textAlign: "center" }}> vacations - likes</h2>
          <Bar
              data={chartData}
              options={{
              plugins: {
                  title: {
                  display: true,
                  text: "vacations likes"
                  },
                  legend: {
                  display: false
                  }
              }
              }}
          />
          </div>
        </div>
  );
}

export default ViewReport;

