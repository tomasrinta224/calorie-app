import { API_BASE_URL } from "../../constants";
import useApiClient from "hooks/use-api-client";
import { useQuery } from "react-query";

export const useGetUserInfo = () => {
  const apiClient = useApiClient();
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => apiClient(`${API_BASE_URL}/profile`),
  });
};
