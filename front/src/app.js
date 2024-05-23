import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Signin from "./Components/signin";
import Signup from "./Components/signup";
import NavBar from "./Components/Navbar";
import UserDashboard from "./Components/User/dashboard";
import AdminDashboard from "./Components/Admin/dashboard";
import * as NavbarFunction from "./Functions/navbar_function"
import UserDeposit from "./Components/User/deposit";
import UserWithdraw from "./Components/User/withdraw";
import UserTransfer from "./Components/User/transfer";
import UserTransaction from "./Components/User/transaction";
import UserAllDeposit from "./Components/User/alldeposit";
import UserAllWithdraw from "./Components/User/allwithdraw";
import UserAllTransfer from "./Components/User/alltransfer";
import AdminAllUser from "./Components/Admin/alluser";
import AdminAllBlockedUser from "./Components/Admin/allblockeduser";
import AdminAllUnblockedUser from "./Components/Admin/allunblockeduser";
import AdminAllAdmin from "./Components/Admin/alladmin";
import AdminAllDeposit from "./Components/Admin/alldeposit";
import AdminAllWithdraw from "./Components/Admin/allwithdraw";
import AdminAllTransfer from "./Components/Admin/alltransfer";
import AdminAddAdmin from "./Components/Admin/addadmin";

function App(){
    const isAuthendicated = NavbarFunction.isAuthendicated()
    const isAdmin = NavbarFunction.isAdmin()
    return(
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Signin/>} />
                    <Route path="/signup" element={<Signup/>} />
                    {(isAuthendicated && !isAdmin) && (
                    <>
                        <Route path="user/dashboard" element={<UserDashboard/>}/>
                        <Route path="user/deposit" element={<UserDeposit/>}/>
                        <Route path="user/withdraw" element={<UserWithdraw/>}/>
                        <Route path="user/transfer" element={<UserTransfer/>}/>
                        <Route path="user/transaction" element={<UserTransaction/>}/>
                        <Route path="user/alldeposits" element={<UserAllDeposit/>}/>
                        <Route path="user/allwithdraws" element={<UserAllWithdraw/>}/>
                        <Route path="user/alltransfers" element={<UserAllTransfer/>}/>
                    </>)
                    }
                    {(isAuthendicated && isAdmin) && (
                    <>
                        <Route path="admin/dashboard" element={<AdminDashboard/>}/>
                        <Route path="admin/allusers" element={<AdminAllUser/>}/>
                        <Route path="admin/allblockedusers" element={<AdminAllBlockedUser/>}/>
                        <Route path="admin/allunblockedusers" element={<AdminAllUnblockedUser/>}/>
                        <Route path="admin/alladmins" element={<AdminAllAdmin/>}/>
                        <Route path="admin/alldeposits" element={<AdminAllDeposit/>}/>
                        <Route path="admin/allwithdraws" element={<AdminAllWithdraw/>}/>
                        <Route path="admin/alltransfers" element={<AdminAllTransfer/>}/>
                        <Route path="admin/addadmin" element={<AdminAddAdmin/>}/>
                    </>)
                    }

                    
                </Routes>
            </Router>
    )
}

export default App;