import React, { useEffect, useState } from "react";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { useNavigate } from "react-router-dom";

function BubbleChart({ data, width, height }) {
  const navigate = useNavigate();
  const rangeMin = 30;
  const rangeMax = 100;
  const [mount, setMount] = useState(false);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [chartData, setChartData] = useState([]);

  const radiusScale = (value) => {
    const fx = d3
      .scaleSqrt()
      .range([rangeMin, rangeMax])
      .domain([minValue, maxValue]);
    return fx(value);
  };

  const simulatePositions = async (cData) => {
    d3.forceSimulation()
      .nodes(cData)
      .velocityDecay(0.5)
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.2))
      .force(
        "collide",
        d3.forceCollide((d) => {
          return radiusScale(d.amount) + 20;
        })
      )
      .on("tick", () => {
        setChartData(cData);
      })
      .on("end", () => {
        setMount(true);
      });
  };

  const init = async () => {
    if (data.length > 0) {
      setMinValue(
        0.95 *
          d3.min(data, (item) => {
            return item.amount;
          })
      );
      setMaxValue(
        1.05 *
          d3.max(data, (item) => {
            return item.amount;
          })
      );
      simulatePositions(data);
    }
  };

  const handleBubbleClick = (link) => {
    navigate(`/${link}`);
  };

  useEffect(() => {
    init();
  }, [mount]);

  return (
    <svg width={width} height={height}>
      <linearGradient
        spreadMethod="reflect"
        id="smartPurpleGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
        fr="10%"
      >
        <stop offset="0%" stopColor="#5D43FF" />
        <stop offset="98.25%" stopColor="#A5A4FF" />
      </linearGradient>
      <linearGradient
        spreadMethod="reflect"
        id="smartBlueGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
        fr="10%"
      >
        <stop offset="0%" stopColor="#90C2FF" />
        <stop offset="98.25%" stopColor="#60A7FF" />
      </linearGradient>
      {mount &&
        chartData.map((item, index) => {
          return (
            <g
              key={index}
              transform={`translate(${width / 2 + item.x}, ${
                height / 2 + item.y
              })`}
              style={{
                cursor: "pointer",
                filter: `${
                  item.link
                    ? "drop-shadow(rgba(117, 179, 255, 1) 0px 0px 10px)"
                    : ""
                }`,
              }}
              onClick={
                item.link ? () => handleBubbleClick(item.link) : () => {}
              }
            >
              <circle
                r={radiusScale(item.amount)}
                fill={`${
                  radiusScale(item.amount) >=
                  ((rangeMax - rangeMin) / 3) * 2 + rangeMin
                    ? "url(#smartBlueGradient)"
                    : radiusScale(item.amount) >=
                      (rangeMax - rangeMin) / 3 + rangeMin
                    ? "url(#smartPurpleGradient)"
                    : "#fff"
                }`}
              />
              <text
                dy="6"
                fill={`${
                  radiusScale(item.amount) >=
                  (rangeMax - rangeMin) / 3 + rangeMin
                    ? "#fff"
                    : "#000"
                }`}
                textAnchor="middle"
                fontSize={`${
                  radiusScale(item.amount) >=
                  ((rangeMax - rangeMin) / 3) * 2 + rangeMin
                    ? "30px"
                    : radiusScale(item.amount) >=
                      (rangeMax - rangeMin) / 3 + rangeMin
                    ? "23px"
                    : "16px"
                }`}
                fontWeight="400"
                fontFamily="Helvetica"
              >
                {item.category}
              </text>
            </g>
          );
        })}
    </svg>
  );
}

export default BubbleChart;
