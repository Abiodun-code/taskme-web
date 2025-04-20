import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../services/store/Store";
import { fetchCurrentUser } from "../services/store/authenticated/update-user/UpdateSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error } = useSelector((state: RootState) => state.updateUser);

  useEffect(() => {
    if (!user) { // Only fetch if not already fetched
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);
  
  return { user, isLoading, error };
};

export default useCurrentUser;
