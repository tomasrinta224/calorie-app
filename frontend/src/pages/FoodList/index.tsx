import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useDeleteFood, useGetFoods } from "hooks/api/foods";
import moment from "moment";
import { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { toDollar } from "utils/currency";

export default function FoodList() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>();
  const { mutate: deleteFood } = useDeleteFood();
  const navigate = useNavigate();

  const handleEdit = (id: string) => navigate(`/edit-food/${id}`);
  const handleClose = () => setIsOpenModal(false);
  const handleOpenDelete = (id: string) => {
    setIsOpenModal(true);
    setSelectedId(id);
  };
  const handleDelete = () => {
    if (selectedId) deleteFood(selectedId);
    handleClose();
  };

  const { data: foods, isLoading: areFoodsLoading } = useGetFoods({
    startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : undefined,
    endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : undefined,
  });

  const totalCalorie = useMemo(() => {
    return (foods || []).reduce((p, food) => p + food.calorie, 0);
  }, [foods]);

  if (!foods) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", margin: 2, padding: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Start Date:
        </Typography>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={startDate}
          onChange={setStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <Typography variant="h6" sx={{ marginLeft: 4, marginRight: 2 }}>
          End Date:
        </Typography>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={endDate}
          onChange={setEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      {areFoodsLoading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {foods && foods.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Calorie</TableCell>
                <TableCell>Price($)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foods.map((food) => (
                <TableRow key={food.foodEntryId}>
                  <TableCell component="th" scope="row">
                    {food.foodEntryId}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {food.username}
                  </TableCell>
                  <TableCell>
                    {moment(food.tookAt).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell>{food.foodName}</TableCell>
                  <TableCell>{food.calorie}</TableCell>
                  <TableCell>${toDollar(food.price)}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleOpenDelete(food.foodEntryId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(food.foodEntryId)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">
          Total Calorie: {totalCalorie.toFixed(2)}
        </Typography>
      </Box>
      <Dialog
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to remove this entry?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
