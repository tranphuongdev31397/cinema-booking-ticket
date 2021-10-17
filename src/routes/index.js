import AdminPage from "containers/admin/AdminPage"
import MovieManagement from "containers/admin/movie-management/MovieManagement"
import ShowMovieManagement from "containers/admin/show-movie-management/ShowMovieManagement"
import UserManagement from "containers/admin/user-management/UserManagement"
import HomePage from "containers/home-module/HomePage"
import MovieDetail from "containers/home-module/MovieDetail/MovieDetail"
import LoginPage from "containers/auth/login/LoginPage"
import SeatPlan from "containers/home-module/SeatPlan/SeatPlan"

import Register from "containers/auth/register/Register"
import EditProfile from "containers/auth/profileUser/EditProfile/EditProfile"
import MovieDetailPage from "containers/admin/movie-management/movie-detail-page/MovieDetailPage"

export const clientRoutes = [
    {
        path: '/login',
        component: LoginPage,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/register',
        component: Register,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/edit-profile',
        component: EditProfile,
        exact: true,
        isPrivate: true,
    },
    {
        path: '/',
        component: HomePage,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/movie-detail/:movieId',
        component: MovieDetail,
        exact: false,
        isPrivate: false,
    },  
    {
        path: '/seat-plan/:showTimeId',
        component: SeatPlan,
        exact: false,
        isPrivate: true,
    },  
   

    
    
]

export const adminRoutes = [
   
    {
        path: '/admin/user-management',
        component: UserManagement,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/admin/movie-management',
        component: MovieManagement,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/admin/show-movie-management',
        component: ShowMovieManagement,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/admin/movie-management/:movieId',
        component: MovieDetailPage,
        exact: false
    }
]