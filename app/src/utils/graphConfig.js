import { SELECTED } from "../constants";

export const graphConfig = (title, length, edges, color, selected = [], i=0) => {
const subGraph = `${i} подграф`
  return {
    color: [color, SELECTED],
    legend: {
      data: [title, i && subGraph],
    },
    series: [
      {
        type: "graph",
        layout: "force",
        animation: false,
        draggable: false,
        data: Array.from({ length }, (v, k) => ({
          id: k,
          name: `${k + 1}`,
          value: k,
          category: selected.includes(`${k+1}`) ? 1: 0,
        })),
        categories: [{ name: title, base: title },  i && { name: subGraph, base: subGraph }],
        force: {
          initLayout: "circular",
          repulsion: 20,
          edgeLength: 15,
          gravity: 0.1,
        },
        edges: edges.map((edge) => ({
          source: edge[0] - 1,
          target: edge[1] - 1,
        })),
        lineStyle: {
          color: 'target',
        },
      },
    ],
  };
};
