import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});//Xác định đường dẫn chuyển hướng
//Code truy cập thẳng vào link trang chủ, xác thực true thì gọi wrapperDisplayName, còn false thì gọi  redirectPath
export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});
//Code đang ở link login, xác thực true thì gọi wrapperDisplayName, còn false thì gọi  redirectPath
export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});