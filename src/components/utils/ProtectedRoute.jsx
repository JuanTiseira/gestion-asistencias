import { selectUser } from "@/features/user/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    canActivate,
    redirectpath = '/login'
}) => {
    const user = useSelector(selectUser)

    if(!user) {
        return <Navigate to={redirectpath} replace/>
    }
    return <Outlet/>;
}
export default ProtectedRoute;