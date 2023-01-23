import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { a11yProps } from "./utils";
import { TabItem, MainPanel, HowToUse } from "./components";


function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Рассчет" {...a11yProps(0)} />
          <Tab label="Как использовать" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabItem value={value} index={0}>
        <MainPanel />
      </TabItem>
      <TabItem value={value} index={1}>
        <HowToUse />
      </TabItem>
    </div>
  );
}

export default App;
