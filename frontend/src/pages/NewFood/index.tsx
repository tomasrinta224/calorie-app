import { Box, Paper, TextField, Typography, Button } from "@mui/material";

import { useForm, Controller } from "react-hook-form";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useCreateFood } from "hooks/api/foods";
import { IFood } from "types";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

type FormData = Omit<IFood, "id">;

export default function NewFood() {
  const navigate = useNavigate();
  const { mutate: createFood, isLoading: isCreating } = useCreateFood();

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<FormData>({
    defaultValues: {},
  });

  const onSubmit = (data: FormData) => {
    createFood(data, {
      onSuccess: () => {
        navigate("/food-list");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ margin: 2, padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">New Food</Typography>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Controller
              name="tookAt"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={field.value ? field.value : null}
                    onChange={(value) => field.onChange({ target: { value } })}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </>
              )}
            />
            <ErrorMessage errors={errors} name="tookAt" />
            <TextField
              id="name"
              label="Food Name"
              placeholder="Please input name"
              variant="outlined"
              sx={{ marginTop: 4, marginBottom: 4 }}
              error={!!errors["foodName"]}
              helperText={<ErrorMessage errors={errors} name="foodName" />}
              {...register("foodName", {
                required: "Food name required",
                maxLength: {
                  value: 30,
                  message: "Max length is 30",
                },
              })}
            />
            <TextField
              id="name"
              label="Food Calorie"
              placeholder="Please input calorie"
              variant="outlined"
              sx={{ marginBottom: 4 }}
              error={!!errors["calorie"]}
              helperText={<ErrorMessage errors={errors} name="calorie" />}
              {...register("calorie", {
                required: "Calorie required",
                validate: {
                  isNumber: (value: any) =>
                    !isNaN(parseInt(value)) || "Number required",
                  positive: (v: any) => parseInt(v) > 0 || "Positive",
                  lessThanTen: (v: any) =>
                    parseInt(v) < 100000 || "Less than 100000",
                },
                valueAsNumber: true,
              })}
            />
            <Button variant="contained" type="submit" disabled={isCreating}>
              Create
            </Button>
          </Box>
        </Box>
      </Paper>
    </form>
  );
}
