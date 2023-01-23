import React, { useState } from "react";
import { Box, List, Divider, Button, Alert } from "@mui/material";
import { Form } from ".";
import { Graph } from "./Graph";
import { Loader } from "./Loader";
import { Result } from "./Result";
import { FIRST_GRAPH, SECOND_GRAPH, API_URL } from "../constants";
import axios from "axios";

export const MainPanel = (props) => {
  const [firstGraphLength, setFirstGraphLength] = useState();
  const [secondGraphLength, setSecondGraphLength] = useState();
  const [firstGraphEdges, setFirstGraphEdges] = useState([]);
  const [secondGraphEdges, setSecondGraphEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [subgraphs, setSubgraphs] = useState([]);

  const pushToEdges = (edges, setEdges) => (item) => {
    setEdges([...edges, item]);
  };

  const reset = (setEdges) => () => setEdges([]);

  const handleFind = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(API_URL, {
        aLength: firstGraphLength,
        bLength: secondGraphLength,
        aEdges: firstGraphEdges,
        bEdges: secondGraphEdges,
      });
      setSubgraphs(data.data);
      setOpen(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Form
          title={"Исходый граф"}
          length={firstGraphLength}
          setLength={setFirstGraphLength}
          pushToEdges={pushToEdges(firstGraphEdges, setFirstGraphEdges)}
          reset={reset(setFirstGraphEdges)}
          edges={firstGraphEdges}
        />
        <Divider />
        <Form
          title={"Искомый граф"}
          length={secondGraphLength}
          setLength={setSecondGraphLength}
          pushToEdges={pushToEdges(secondGraphEdges, setSecondGraphEdges)}
          reset={reset(setSecondGraphEdges)}
          edges={secondGraphEdges}
        />

        <Button
          onClick={handleFind}
          disabled={!firstGraphLength || !secondGraphLength}
        >
          Рассчитать
        </Button>
        {loading && <Loader />}
      </Box>

      <Box sx={{ width: "100%" }}>
        <Graph
          title={"Исходый граф"}
          length={firstGraphLength}
          edges={firstGraphEdges}
          color={FIRST_GRAPH}
        />
        <Graph
          title={"Искомый граф"}
          length={secondGraphLength}
          edges={secondGraphEdges}
          color={SECOND_GRAPH}
        />
      </Box>

      <Result
        open={open}
        result={subgraphs}
        length={firstGraphLength}
        edges={firstGraphEdges}
        setOpen={setOpen}
      />
      {error && (
        <Alert
          severity="error"
          sx={{ position: "absolute", bottom: 0, right: 0, left: 0 }}
        >
          Произошла ошибка
        </Alert>
      )}
    </List>
  );
};
