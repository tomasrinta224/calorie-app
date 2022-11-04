import React from "react";
import moment from "moment";
import { AppBar, Box, Toolbar, Typography, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { useAuth } from "context/AuthContext";
import { useGetWarningDates, useGetWarningMonths } from "hooks/api/foods";

function App() {
  const { userInfo } = useAuth();
  const { data: warningDates } = useGetWarningDates();
  const { data: warningMonths } = useGetWarningMonths();

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/new-food">
              <Typography
                variant="h6"
                component="div"
                color="white"
                sx={{ marginRight: 2 }}
              >
                New Food
              </Typography>
            </Link>
            <Link to="/food-list">
              <Typography
                variant="h6"
                component="div"
                color="white"
                sx={{ marginRight: 2 }}
              >
                Food List
              </Typography>
            </Link>
            {userInfo.isAdmin && (
              <Link to="/report">
                <Typography variant="h6" component="div" color="white">
                  Report
                </Typography>
              </Link>
            )}
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              <Typography variant="h6">
                {userInfo.firstName} {userInfo.lastName}
                {userInfo.isAdmin && "(Admin)"}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            {warningDates?.map((date, i) => {
              return (
                <Alert severity="warning" key={`date-${i}`}>
                  Calorie limit exceed {moment(date.date).format("MM/DD/YYYY")}
                </Alert>
              );
            })}
            {warningMonths?.map((month, i) => {
              return (
                <Alert severity="warning" key={`month-${i}`}>
                  Montly budge limit exceed {month.month}
                </Alert>
              );
            })}
            <Router />
          </LocalizationProvider>
        </Box>
      </Box>
    </div>
  );
}

export default App;
