package com.example.bank.Controller;

import com.example.bank.Config.Response;
import com.example.bank.Dto.DepositDto;
import com.example.bank.Dto.TransferDto;
import com.example.bank.Dto.UserDto;
import com.example.bank.Dto.WithdrawDto;
import com.example.bank.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/detail")
    public Response<?> getDetails(@RequestBody UserDto userDto){
        return userService.getDetails(userDto.getId());
    }

    @PostMapping("/getDeposits")
    public Response<?> getDeposits(@RequestBody UserDto userDto){
        return userService.getDeposits(userDto.getId());
    }

    @PostMapping("/getWithdraws")
    public Response<?> getWithdraws(@RequestBody UserDto userDto){
        return userService.getWithdraws(userDto.getId());
    }


    @PostMapping("/getTransfers")
    public Response<?> getTransfers(@RequestBody UserDto userDto){
        return userService.getTransfers(userDto.getId());
    }

    @PostMapping("/getAllTransactions")
    public Response<?> getTransactions(@RequestBody UserDto userDto){
        return userService.getTransactions(userDto.getId());
    }

    @PostMapping("/deposit")
    public Response<?> deposit(@RequestBody DepositDto depositDto){
        return userService.deposit(depositDto.getId(),depositDto.getCash());
    }

    @PostMapping("/withdraw")
    public Response<?> withdraw(@RequestBody WithdrawDto withdrawDto){
        return userService.withdraw(withdrawDto.getId(),withdrawDto.getCash());
    }

    @PostMapping("/transfer")
    public Response<?> transfer(@RequestBody TransferDto transferDto){
        return userService.transfer(transferDto.getId(),transferDto.getAccountNumber(),transferDto.getCash());
    }
}
