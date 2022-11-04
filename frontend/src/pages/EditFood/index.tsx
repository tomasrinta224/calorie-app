import { IFood } from "types";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useGetFood, useUpdateFood } from "hooks/api/foods";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

type FormData = Omit<IFood, "foodEntryId">;

function EditFood({ food }: { food: IFood }) {
  const { mutate: updateFood, isLoading: isUpdating } = useUpdateFood();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
  } = useForm<FormData>({
    defaultValues: { ...food, price: food.price / 100.0 },
  });

  useEffect(() => {
    reset({ ...food, price: food.price / 100.0 });
  }, [food, reset]);

  const onSubmit = (data: FormData) => {
    updateFood(
      { foodEntryId: food.foodEntryId, ...data },
      {
        onSuccess: () => {
          navigate("/food-list/");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ margin: 2, padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">Edit Food</Typography>
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
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={field.value ? field.value : null}
                  onChange={(value) => field.onChange({ target: { value } })}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
            <TextField
              id="name"
              label="Food Name"
              placeholder="Please input name"
              variant="outlined"
              sx={{ marginTop: 4, marginBottom: 4 }}
              {...register("foodName", { required: true })}
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
                setValueAs: (v: any) => parseFloat(v),
                validate: {
                  isNumber: (value: any) => !isNaN(value) || "Number required",
                  positive: (v: any) => v > 0 || "Positive",
                  lessThanTen: (v: any) => v < 100000 || "Less than 100000",
                },
                valueAsNumber: true,
              })}
            />
            <TextField
              id="name"
              label="Price($)"
              placeholder="Please input calorie"
              variant="outlined"
              sx={{ marginBottom: 4 }}
              error={!!errors["price"]}
              helperText={<ErrorMessage errors={errors} name="price" />}
              {...register("price", {
                required: "Price required",
                setValueAs: (v: any) => Math.floor(parseFloat(v) * 100),
                validate: {
                  isNumber: (value: any) => !isNaN(value) || "Number required",
                  positive: (v: any) => v > 0 || "Positive",
                  lessThanTen: (v: any) => v < 1000000 || "Less than $10000",
                },
              })}
            />
            <Button variant="contained" type="submit" disabled={isUpdating}>
              Update
            </Button>
          </Box>
        </Box>
      </Paper>
    </form>
  );
}

export default function EditFoodWrapper() {
  const { foodId } = useParams() as { foodId: string };
  const { data: food } = useGetFood(foodId);

  if (!food) return null;

  return <EditFood food={food} />;
}
