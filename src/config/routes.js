import Authentication from '../components/Authentication/Authentication';
import Dashboard from '../components/Dashboard/Dashboard';

// Add routes here.
// Authentication routes should not be modified.
// Public routes are always rendered and visibles in the navbar.
// Private routes are rendered and visible in the navbar only for authentified users.
// Note: even though private components are not rendered for unauthorized users,
// keep in mind that it's all JavaScript.
// The code is running on the client side and by consequent accessible.

const routes = {
    default: {
        path: '/dashboard',
    },
    authentication: {
        login: {
            name: 'login',
            path: '/login',
            component: Authentication,
            minimalLayout: true,
            inNav: false

        },
    },
    protected: [
        {
            name: 'dashboard',
            path: '/dashboard',
            component: Dashboard,
            minimalLayout: false,
            inNav: true
        }
    ],
    public: [],
    admin: [],
};

export default routes;
