import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as NavbarFunction from "../Functions/navbar_function";
import "../style/navbar.css";

import UserDashboard from "./User/dashboard";
import AdminDashboard from "./Admin/dashboard";
import UserDeposit from "./User/deposit";
import UserWithdraw from "./User/withdraw";
import UserTransfer from "./User/transfer";
import UserTransaction from "./User/transaction";
import UserAllDeposit from "./User/alldeposit";
import UserAllWithdraw from "./User/allwithdraw";
import UserAllTransfer from "./User/alltransfer";import AdminAllUser from "./Admin/alluser";
import AdminAllBlockedUser from "./Admin/allblockeduser";
import AdminAllUnblockedUser from "./Admin/allunblockeduser";
import AdminAllAdmin from "./Admin/alladmin";
import AdminAllDeposit from "./Admin/alldeposit";
import AdminAllWithdraw from "./Admin/allwithdraw";
import AdminAllTransfer from "./Admin/alltransfer";
import AdminAddAdmin from "./Admin/addadmin";
;

function NavBar() {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const authenticated = NavbarFunction.isAuthendicated();
        const admin = NavbarFunction.isAdmin();
        setIsAuthenticated(authenticated);
        setIsAdmin(admin);
    });

    const handleLogout = async () => {
        try {
            await NavbarFunction.clear();
            navigate("/");
        } catch (error) {
            console.error("Error occurred while clearing data:", error);
        }
    };
    return (
        isAuthenticated && (
            <nav className="navbar_container">
                <ul className="navbar_ul">
                    {!isAdmin && (
                        <>
                            <li className="navbar_list"><Link to="user/dashboard" element={<UserDashboard/>}>Dashboard</Link></li>
                            <li className="navbar_list"><Link to="user/deposit" element={<UserDeposit/>}>Deposit</Link></li>
                            <li className="navbar_list"><Link to="user/withdraw" element={<UserWithdraw/>}>Withdraw</Link></li>
                            <li className="navbar_list"><Link to="user/transfer" element={<UserTransfer/>}>Transfer</Link></li>
                            <li className="navbar_list"><Link to="user/transaction" element={<UserTransaction/>}>Transaction</Link></li>
                            <li className="navbar_list"><Link to="user/alldeposits" element={<UserAllDeposit/>}>Deposit History</Link></li>
                            <li className="navbar_list"><Link to="user/allwithdraws" element={<UserAllWithdraw/>}>Withdraw History</Link></li>
                            <li className="navbar_list"><Link to="user/alltransfers" element={<UserAllTransfer/>}>Transfer History</Link></li>
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <li className="navbar_list"><Link to="admin/dashboard" element={<AdminDashboard/>}>Dashboard</Link></li>
                            <li className="navbar_list"><Link to="admin/allusers" element={<AdminAllUser/>}>All Users</Link></li>
                            <li className="navbar_list"><Link to="admin/allblockedusers" element={<AdminAllBlockedUser/>}>All Blocked Users</Link></li>
                            <li className="navbar_list"><Link to="admin/allunblockedusers" element={<AdminAllUnblockedUser/>}>All Unblocked Users</Link></li>
                            <li className="navbar_list"><Link to="admin/alladmins" element={<AdminAllAdmin/>}>All Admins</Link></li>
                            <li className="navbar_list"><Link to="admin/alldeposits" element={<AdminAllDeposit/>}>All Deposits</Link></li>
                            <li className="navbar_list"><Link to="admin/allwithdraws" element={<AdminAllWithdraw/>}>All Withdraws</Link></li>
                            <li className="navbar_list"><Link to="admin/alltransfers" element={<AdminAllTransfer/>}>All Transfers</Link></li>
                            <li className="navbar_list"><Link to="admin/addadmin" element={<AdminAddAdmin/>}>Add Admin</Link></li>
                        </>
                    )}
                    <li className="navbar_list"><Link to="#" onClick={handleLogout}>Logout</Link></li>
                </ul>
            </nav>
        )
    );
} 

export default NavBar;
