import PublicRoutes from "./PublicRoutes";
import PrivateRoutesUser from "./User/PrivateRoutesUser";
import PrivateRoutesAdmin from "./Admin/PrivateRoutesAdmin";

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