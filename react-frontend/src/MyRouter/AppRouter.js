import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleUserPage from "../components/app_components/UserPage/SingleUserPage";
import UserProjectLayoutPage from "../components/app_components/UserPage/UserProjectLayoutPage";
import SingleCategoryPage from "../components/app_components/CategoryPage/SingleCategoryPage";
import CategoryProjectLayoutPage from "../components/app_components/CategoryPage/CategoryProjectLayoutPage";
import SingleVoucherPage from "../components/app_components/VoucherPage/SingleVoucherPage";
import VoucherProjectLayoutPage from "../components/app_components/VoucherPage/VoucherProjectLayoutPage";
import SingleCartItemPage from "../components/app_components/CartItemPage/SingleCartItemPage";
import CartItemProjectLayoutPage from "../components/app_components/CartItemPage/CartItemProjectLayoutPage";
import SingleCartItemHistoryPage from "../components/app_components/CartItemHistoryPage/SingleCartItemHistoryPage";
import CartItemHistoryProjectLayoutPage from "../components/app_components/CartItemHistoryPage/CartItemHistoryProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/user/:singleUserId" exact element={<SingleUserPage />} />
<Route path="/user" exact element={<UserProjectLayoutPage />} />
<Route path="/category/:singleCategoryId" exact element={<SingleCategoryPage />} />
<Route path="/category" exact element={<CategoryProjectLayoutPage />} />
<Route path="/voucher/:singleVoucherId" exact element={<SingleVoucherPage />} />
<Route path="/voucher" exact element={<VoucherProjectLayoutPage />} />
<Route path="/cartItem/:singleCartItemId" exact element={<SingleCartItemPage />} />
<Route path="/cartItem" exact element={<CartItemProjectLayoutPage />} />
<Route path="/cartItemHistory/:singleCartItemHistoryId" exact element={<SingleCartItemHistoryPage />} />
<Route path="/cartItemHistory" exact element={<CartItemHistoryProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
