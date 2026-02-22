import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { handleError } from "../utils/utilsToast";

const useAuthAction = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const protect = async (callback) => {
    if (!user) {
      handleError("Please Login or Register First")
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    await callback();
  };

  return protect;
};

export default useAuthAction;