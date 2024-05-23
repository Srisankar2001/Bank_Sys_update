package com.example.bank.Controller;

import com.example.bank.Config.Response;
import com.example.bank.Dto.AdminDto;
import com.example.bank.Dto.AdminRegisterDto;
import com.example.bank.Dto.AdminSignupDto;
import com.example.bank.Service.AdminService;
import com.example.bank.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    AdminService adminService;
    @Autowired
    AuthService authService;

    @PostMapping("/block")
    public Response<?> blockUser(@RequestBody AdminDto adminDto){
        return adminService.blockUser(adminDto.getAdminId(),adminDto.getUserId());
    }

    @PostMapping("/unblock")
    public Response<?> unblockUser(@RequestBody AdminDto adminDto){
        return adminService.unblockUser(adminDto.getAdminId(),adminDto.getUserId());
    }

    @PostMapping("/register")
    public Response<?> adminRegister(@RequestBody AdminRegisterDto adminRegisterDto){
        if(!authService.isEmailUnique(adminRegisterDto.getEmail())){
            return Response.builder()
                    .status(false)
                    .error("Email already exist")
                    .build();
        }
        else{
            AdminSignupDto adminSignupDto = AdminSignupDto.builder()
                    .name(adminRegisterDto.getName())
                    .email(adminRegisterDto.getEmail())
                    .password(adminRegisterDto.getPassword())
                    .birthdate(adminRegisterDto.getBirthdate()).build();
            return authService.adminRegister(adminSignupDto);
        }
    }

    @PostMapping("/getAllUsers")
    public Response<?> getAllUsers(@RequestBody AdminDto adminDto){
        return adminService.getAllUsers(adminDto.getAdminId());
    }
    @PostMapping("/getAllBlocked")
    public Response<?> getAllBlockedUsers(@RequestBody AdminDto adminDto){
        return adminService.getAllBlockedUsers(adminDto.getAdminId());
    }
    @PostMapping("/getAllUnblocked")
    public Response<?> getAllUnblockedUsers(@RequestBody AdminDto adminDto){
        return adminService.getAllUnblockedUsers(adminDto.getAdminId());
    }

    @PostMapping("/getAllAdmins")
    public Response<?> getAllAdmins(@RequestBody AdminDto adminDto){
        return adminService.getAllAdmins(adminDto.getAdminId());
    }

    @PostMapping("/getAllDeposit")
    public Response<?> getAllDeposits(@RequestBody AdminDto adminDto){
        return adminService.getAllDeposits(adminDto.getAdminId());
    }
    @PostMapping("/getAllWithdraw")
    public Response<?> getAllWithdraws(@RequestBody AdminDto adminDto){
        return adminService.getAllWithdraws(adminDto.getAdminId());
    }
    @PostMapping("/getAllTransfer")
    public Response<?> getAllTransfers(@RequestBody AdminDto adminDto){
        return adminService.getAllTransfers(adminDto.getAdminId());
    }
    @PostMapping("/getAllTransaction")
    public Response<?> getAllTransactions(@RequestBody AdminDto adminDto){
        return adminService.getAllTransactions(adminDto.getAdminId());
    }
}
