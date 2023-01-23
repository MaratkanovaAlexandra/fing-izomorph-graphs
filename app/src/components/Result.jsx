import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import {Graph} from './Graph'
import {FIRST_GRAPH} from '../constants'

export const Result = (props) => {
  const {result, length, edges, open ,setOpen} = props
   const isIsomorph = JSON.stringify(result) === '[["0"]]'

  return (
    <Dialog open={open} onClick={() => setOpen(false)}>
      <DialogTitle>Полученный результат</DialogTitle>

      <DialogContent sx={{width: 550}}>
      {isIsomorph && <Typography>Графы Изоморфны</Typography>}
        {result.map((result,i) => <Graph
          title={`${!isIsomorph ? 'Исходый г' : 'Г' }раф`}
          length={length}
          edges={edges}
          color={FIRST_GRAPH}
          selected={isIsomorph? Array.from({ length }, (v, k) => k) :result}
          i={isIsomorph? 0 : i+1}
        />)}
      </DialogContent>
    </Dialog>
  )
}