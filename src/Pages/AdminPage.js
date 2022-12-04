import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DisplayNetworkCount from "../Components/DisplayNetworkCount";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

function AdminPage({ getAdmin }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const allContactNumber = useSelector((state) => state.AllContactNumber);
  const allNetwork = useSelector((state) => state.AllNetwork);
  const navigate = useNavigate();
  useEffect(() => {
    if (getAdmin === "") {
      navigate("/log-admin");
    }
  }, [navigate, getAdmin]);

  const networkCount = (networkType) => {
    let result = allContactNumber.map((user) => {
      return user.contacts.filter((networkItem) => {
        return networkItem.network === networkType;
      });
    });
    let filterResult = result.filter((item) => {
      return item.length > 0;
    });
    return filterResult.length;
  };

  const data = {
    labels: allNetwork.map((network) => {
      return network;
    }),
    datasets: [
      {
        label: "Registered Contact Number per Network",
        data: [
          networkCount("SMART"),
          networkCount("TNT"),
          networkCount("GLOBE"),
          networkCount("TM"),
          networkCount("DITO"),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <p className="navbar-nav text-white fs-4">{getAdmin}</p>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarToggler"
            >
              <ul className="navbar-nav mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <a className="nav-link active" type="button" href="/">
                    Log out
                  </a>
                </li>
                <li className="nav-item"></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="">
        <div className="d-flex justify-content-center align-items-center p-3 flex-wrap gap-3">
          {allNetwork.map((network) => {
            return (
              <DisplayNetworkCount
                key={network}
                network={network}
                count={networkCount(network)}
              />
            );
          })}
        </div>
        <div className="d-flex justify-content-center align-items-center p-3">
          <div className="doughnut-container">
            <Doughnut data={data} />;
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
