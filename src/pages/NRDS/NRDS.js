import { useState } from "react";
import ActionButton from "../../components/ActionButton/ActionButton";
import ActionTab from "../../components/ActionTab/ActionTab";
import CustomizeDoughnutChart from "../../components/CustomizeDoughnutChart/CustomizeDoughnutChart";
import CustomizeLineChart from "../../components/CustomizeLineChart/CustomizeLineChart";
import PlusButton from "../../components/PlusButton/PlusButton";
import { doughnutChartColorData } from "../../helpers/chart.helper";
import "./NRDS.css";

function NRDS() {
  const lineChartData = {
    label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [1320, 932, 901, 1300, 1290, 1330, 1320],
  };

  const doughnutChartData = {
    label: ["first", "second", "third", "fourth", "fifth", "sixth"],
    data: [100, 120, 124, 300, 145, 50],
  };

  const tabData = ["NRD's", "Database", "Archive"];
  const [tab, setTab] = useState(tabData[0]);

  const handleTab = (e) => {
    setTab(e);
  };

  return (
    <>
      <div className="nrdsRoot">
        <div className="nrdsTitle">NRD's</div>
        <div className="nrdsHeaderRoot">
          <ActionTab
            data={tabData}
            onSelect={(e) => handleTab(e)}
            select={tab}
          />
          <PlusButton content="+ New task" action={() => {}} />
        </div>
        <div className="chartContainer">
          <div className="chartHeader">
            <div className="databasePart">
              <div className="headerItemTitle">Database Items</div>
              <div className="chartTools">
                <ActionButton
                  name="Show"
                  content="This Week"
                  className="chartPeriod"
                />
                <ActionButton
                  content="Compare"
                  type="common"
                  className="chartCompare"
                />
              </div>
            </div>
            <div className="casesPart">
              <div className="headerItemTitle">Cases</div>
            </div>
          </div>
          <div className="chartContent">
            <div className="databasePart">
              <div className="descriptionRoot">
                <div
                  className="descriptionItem borderNone"
                  style={{
                    paddingTop: "0px !important",
                    paddingBottom: "27px",
                  }}
                >
                  <div className="descriptionItemTitle">
                    Total items this week
                  </div>
                  <div
                    className="descriptionItemCount"
                    style={{
                      fontSize: "40px",
                      color: "#75b3ff",
                      fontWeight: 400,
                    }}
                  >
                    10,324
                  </div>
                </div>
                <div
                  className="descriptionItem"
                  style={{ paddingTop: "26px", paddingBottom: "30px" }}
                >
                  <div className="descriptionItemTitle">
                    Changes from last week
                  </div>
                  <div
                    className="descriptionItemCount"
                    style={{ color: "#0fdf63" }}
                  >
                    +12%
                  </div>
                </div>
                <div
                  className="descriptionItem"
                  style={{
                    paddingTop: "26px",
                    paddingBottom: "0px !important",
                  }}
                >
                  <div className="descriptionItemTitle">Total items in DB</div>
                  <div
                    className="descriptionItemCount"
                    style={{ color: "#fff" }}
                  >
                    5,403
                  </div>
                </div>
              </div>
              <div className="lineChartRoot">
                <CustomizeLineChart
                  axis={lineChartData.label}
                  ayis={lineChartData.data}
                />
              </div>
            </div>
            <div className="casesPart">
              <div className="descriptionRoot">
                <div className="descriptionItem borderNone topPaddingNone">
                  <div className="descriptionItemTitle">Lorem ipsum</div>
                  <div
                    className="descriptionItemCount"
                    style={{ color: "#fff" }}
                  >
                    53
                  </div>
                </div>
                <div className="descriptionItem">
                  <div className="descriptionItemTitle">Lorem ipsum</div>
                  <div
                    className="descriptionItemCount"
                    style={{ color: "#fff" }}
                  >
                    +2
                  </div>
                </div>
                <div
                  className="descriptionItem"
                  style={{ paddingBottom: "0px !important" }}
                >
                  <div className="descriptionItemTitle">Lorem ipsum</div>
                  <div
                    className="descriptionItemCount"
                    style={{ color: "#fff" }}
                  >
                    Lorem ipsum
                  </div>
                </div>
              </div>
              <div className="doughnutChartRoot">
                <CustomizeDoughnutChart
                  data={doughnutChartData.data}
                  label={doughnutChartData.label}
                  colorInfo={doughnutChartColorData}
                />
                <div className="doughnutChartDes">
                  {doughnutChartData.label.map((item, index) => {
                    return (
                      <div className="doughnutChartDesItem" key={index}>
                        <div
                          className="doughnutChartIcon"
                          style={{
                            background: `linear-gradient(238.95deg, ${doughnutChartColorData[index]?.first} 31.21%, ${doughnutChartColorData[index]?.last} 62.45%)`,
                          }}
                        ></div>
                        <div className="doughnutChartItemName">{item}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NRDS;