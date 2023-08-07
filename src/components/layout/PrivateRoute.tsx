import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const PrivateRoute = () => {
  const { userInfo } = useSelector((state : any) => state.auth);

  return (
    userInfo ? <Outlet /> : 
    <>
      <Navigate to='/login' replace />
      {toast.error('Please login to continue')}
    </>
  )
}

export default PrivateRoute