import React from "react";
import ReactECharts from "echarts-for-react";
import { graphConfig } from "../utils";

export const Graph = (props) => {
  const { title, length, edges, color, selected, i} = props;

  return (
    <>
    <ReactECharts
      option={graphConfig(title, length, edges, color, selected, i)}
      style={{ width: "100%", height: "225px" }}
      />
      </>
  );
};
