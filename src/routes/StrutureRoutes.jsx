import PublicRoutes from "./Public/PublicRoutes";
import PrivateRoutesUser from "./User/PrivateUserRoutes";
import PrivateRoutesAdmin from "./Admin/PrivateAdminRoutes";

export default function StrutureRoute({ route }) {
    switch (route) {
        case 'Public':
            return (
                <>
                    <PublicRoutes />
                </>
            );
        case 'PrivateUser':
            return (
                <>
                    <PrivateRoutesUser />
                </>
            );
        case 'PrivateAdmin':
            return (
                <>
                    <PrivateRoutesAdmin />
                </>
            );
        default:
            break;
    }
}