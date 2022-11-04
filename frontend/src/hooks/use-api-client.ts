import { useCallback } from "react";
import apiClient from "utils/api-client";
import { getAuthToken } from "utils/token";

const useApiClient = () => {
  const bearerToken = getAuthToken();

  return useCallback(
    (endpoint: string, config?: any) =>
      apiClient(endpoint, {
        ...config,
        bearerToken,
      }),
    [bearerToken]
  );
};

export default useApiClient;
