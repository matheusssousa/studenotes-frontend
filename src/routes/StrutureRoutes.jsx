import { useAuth } from "../context/Authenticate/AuthContext";

// ROTAS
import PublicRoutes from "./Public/PublicRoutes";
import PrivateRoutesUser from "./User/PrivateUserRoutes";
import PrivateRoutesAdmin from "./Admin/PrivateAdminRoutes";
import EmailVerifyRouteUser from "./User/EmailVerifyRouteUser";

// COMPONENTES
import SidebarAdmin from "../components/Admin/Sidebar";
import Footer from "../components/Commons/Footer";
import SidebarUser from "../components/User/Sidebar";

export default function StrutureRoute({ route }) {
    const { user } = useAuth();

    switch (route) {
        case 'Public':
            return (
                <>
                    <PublicRoutes />
                </>
            );
        case 'PrivateUser':
            if (user.email_verified_at === null) {
                return <EmailVerifyRouteUser />
            } else {
                return (
                    <div className="page-body flex">
                        <SidebarUser />
                        <div className="subpage">
                            <PrivateRoutesUser />
                            <Footer />
                        </div>
                    </div>
                );
            }
        case 'PrivateAdmin':
            return (
                <div className="page-body flex">
                    <SidebarAdmin />
                    <div className="subpage">
                        <PrivateRoutesAdmin />
                        <Footer />
                    </div>
                </div>
            );
        default:
            break;
    }
}