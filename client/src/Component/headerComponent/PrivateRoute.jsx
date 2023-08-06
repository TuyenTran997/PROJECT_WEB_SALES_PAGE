// PrivateRoute.js
import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ isAuthenticated, isAdmin, component, ...rest }) {
    if (isAuthenticated) {
        if (isAdmin) {
            return <Route {...rest} />;
        } else {
            // Điều hướng người dùng đến trang cấm truy cập (ví dụ: trang 404)
            return <Route {...props} />;
        }
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default PrivateRoute;
