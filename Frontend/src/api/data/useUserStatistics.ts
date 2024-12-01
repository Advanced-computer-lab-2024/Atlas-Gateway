import { useQuery } from "@tanstack/react-query";

import { apiFetchUserStatistics } from "../service/userStatistics";

export function useUserStatistics() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: apiFetchUserStatistics,
    queryKey: ["userStatistics"],
  });

  return {
    data: data?.data, 
    isLoading,        
    isError,         
    refetch,          
  };
}
