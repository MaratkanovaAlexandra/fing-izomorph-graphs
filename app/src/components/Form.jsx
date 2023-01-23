import React, { useState } from "react";
import { Box, List, TextField, Typography, IconButton } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const Form = (props) => {
  const { title, length, setLength, pushToEdges, reset, edges } = props;
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);

  const handleClick = () => {
    if (+start > +length) setStartError(true);
    if (+end > +length) setEndError(true);
    
    if (+start > +length || +end > +length) return;

    pushToEdges([start, end]);
    setStart("");
    setEnd("");
  };

  const handleChangeStart = (event) => {
    setStartError(false);
    setStart(event.target.value);
  };

  const handleChangeEnd = (event) => {
    setEndError(false);
    setEnd(event.target.value);
  };

   const handleReset = () => {
    setStartError(false);
    setEndError(false);
    setStart('');
    setEnd('');
    setLength('')
    reset()
   }

  return (
    <Box sx={{ m: "10px 0", position: 'relative' }}>
      <Typography>{title}</Typography>

      <IconButton color="warning"  sx={{ m: "10px 0", position: "absolute", top: 0, right: 0 }} onClick={handleReset} >
          <RestartAltIcon />
        </IconButton>

      <TextField
        label="Количество вершин"
        variant="outlined"
        type="number"
        size="small"
        sx={{ margin: "10px 0" }}
        value={length}
        onChange={(event) => setLength(event.target.value)}
      />

      <Typography sx={{ fontSize: "0.8rem", color: "#686868" }}>
        Вершины
      </Typography>

      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "5%",
          alignItems: "center",
        }}
      >
        <TextField
          label="Из вершины"
          variant="outlined"
          type="number"
          size="small"
          value={start}
          onChange={handleChangeStart}
          error={startError}
        />
        -
        <TextField
          label="В вершину"
          variant="outlined"
          type="number"
          size="small"
          value={end}
          onChange={handleChangeEnd}
          error={endError}
        />

        <IconButton color="primary" onClick={handleClick} disabled={!length || edges.length === (length*(length-1))/2 }>
          <DoubleArrowIcon />
        </IconButton>
      </List>
    </Box>
  );
};
