import React from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useReport } from "hooks/api/foods";

export default function Report() {
  const { data: report, isFetching } = useReport();
  if (!report || isFetching) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Box>
        <Typography variant="h5">
          Number of added entries in the last 7 days:{" "}
          {report?.oneWeekBeforeCount}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5">
          Number of added entries the week before: {report?.twoWeekBeforeCount}
        </Typography>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Average Calorie for last 7 days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.averageCalories.map((average) => {
            return (
              <TableRow key={average.userId}>
                <TableCell component="th" scope="row">
                  {average.username}
                </TableCell>
                <TableCell>{average.dailyAverage.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
