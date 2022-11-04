import { API_BASE_URL } from "../../constants";
import useApiClient from "hooks/use-api-client";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IFood, IReport, IWarningDate, IWarningMonth } from "types";
import { makeQueryString } from "utils/api";

export const useCreateFood = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation(
    (data: Omit<IFood, "id">) =>
      apiClient(`${API_BASE_URL}/food`, {
        method: "POST",
        data,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("foods"),
    }
  );
};

export const useUpdateFood = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation(
    (data: IFood) =>
      apiClient(`${API_BASE_URL}/food/${data.foodEntryId}`, {
        method: "PUT",
        data,
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("foods");
        queryClient.invalidateQueries(["food", data.foodEntryId]);
      },
    }
  );
};

export const useGetFood = (id: string) => {
  const apiClient = useApiClient();
  return useQuery<IFood>({
    queryKey: ["food", id],
    queryFn: () => apiClient(`${API_BASE_URL}/food/${id}`),
  });
};

export const useGetFoods = (queryParams = {}) => {
  const apiClient = useApiClient();
  return useQuery<IFood[]>({
    queryKey: ["foods", queryParams],
    queryFn: () =>
      apiClient(`${API_BASE_URL}/food${makeQueryString(queryParams)}`),
  });
};

export const useDeleteFood = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) =>
      apiClient(`${API_BASE_URL}/food/${id}`, {
        method: "DELETE",
        noJsonInResponse: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("foods");
      },
    }
  );
};

export const useGetWarningDates = () => {
  const apiClient = useApiClient();
  return useQuery<IWarningDate[]>({
    queryKey: ["foods", "warnings", "date"],
    queryFn: () => apiClient(`${API_BASE_URL}/food/warning-dates`),
  });
};

export const useGetWarningMonths = () => {
  const apiClient = useApiClient();
  return useQuery<IWarningMonth[]>({
    queryKey: ["foods", "warnings", "month"],
    queryFn: () => apiClient(`${API_BASE_URL}/food/warning-months`),
  });
};

export const useReport = () => {
  const apiClient = useApiClient();
  return useQuery<IReport>({
    queryKey: ["foods", "report"],
    queryFn: () => apiClient(`${API_BASE_URL}/food/report`),
  });
};
