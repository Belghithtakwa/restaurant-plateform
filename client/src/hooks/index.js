import { useLocation } from "react-use";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
