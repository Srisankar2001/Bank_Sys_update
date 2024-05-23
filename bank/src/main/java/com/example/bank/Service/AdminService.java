package com.example.bank.Service;

import com.example.bank.Config.Response;
import com.example.bank.Entity.Role;
import com.example.bank.Entity.Transaction;
import com.example.bank.Entity.Type;
import com.example.bank.Entity.User;
import com.example.bank.Repository.TransactionRepository;
import com.example.bank.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    TransactionRepository transactionRepository;

    public Response<?> unblockUser(Integer adminId,Integer userId) {
        if(isAdmin(adminId)){
            Optional<User> existingUser = userRepository.findById(userId);
            if(existingUser.isPresent()){
                User user = existingUser.get();
                if(!user.getIs_active()){
                    user.setIs_active(true);
                    userRepository.save(user);
                    return Response.builder()
                            .status(true)
                            .build();
                }else{
                    return Response.builder()
                            .status(false)
                            .error("User not blocked")
                            .build();
                }
            }else{
                return Response.builder()
                        .status(false)
                        .error("User not found")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }

    }

    public Response<?> blockUser(Integer adminId,Integer userId) {
        if(isAdmin(adminId)){
            Optional<User> existingUser = userRepository.findById(userId);
            if(existingUser.isPresent()){
                User user = existingUser.get();
                if(user.getIs_active()){
                    user.setIs_active(false);
                    userRepository.save(user);
                    return Response.builder()
                            .status(true)
                            .build();
                }else{
                    return Response.builder()
                            .status(false)
                            .error("User already blocked")
                            .build();
                }
            }else{
                return Response.builder()
                        .status(false)
                        .error("User not found")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }

    }

    public Response<?> getAllUsers(Integer id) {
        if(isAdmin(id)){
            List<User> users = userRepository.findAllByRole(Role.USER);
            return Response.builder()
                    .status(true)
                    .data(users)
                    .build();
        }else {
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }
    }

    public Response<?> getAllAdmins(Integer id) {
        if(isAdmin(id)){
            List<User> admins = userRepository.findAllByRole(Role.ADMIN);
            return Response.builder()
                    .status(true)
                    .data(admins)
                    .build();
        }else {
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }
    }

    public Response<?> getAllBlockedUsers(Integer id) {
        if(isAdmin(id)){
            List<User> users = userRepository.findAllByRole(Role.USER);
            List<User> blockedUsers = users.stream()
                    .filter(user -> !user.getIs_active())
                    .collect(Collectors.toList());

            return Response.builder()
                    .status(true)
                    .data(blockedUsers)
                    .build();
        }else {
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }

    }

    public Response<?> getAllUnblockedUsers(Integer id) {
        if(isAdmin(id)){
            List<User> users = userRepository.findAllByRole(Role.USER);
            List<User> unblockedUsers = users.stream()
                    .filter(user -> user.getIs_active())
                    .collect(Collectors.toList());

            return Response.builder()
                    .status(true)
                    .data(unblockedUsers)
                    .build();
        }else {
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }

    }

    public boolean isAdmin(Integer id){
        Optional<User> admin = userRepository.findById(id);
        if(admin.isPresent()){
            if(admin.get().getRole() == Role.ADMIN){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }

    public Response<?> getAllDeposits(Integer adminId) {
        if(isAdmin(adminId)){
            List<Transaction> transactions = transactionRepository.findByType(Type.DEPOSIT);
            return Response.builder()
                    .status(true)
                    .data(transactions)
                    .build();
        }else{
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }
    }

    public Response<?> getAllWithdraws(Integer adminId) {
        if(isAdmin(adminId)){
            List<Transaction> transactions = transactionRepository.findByType(Type.WITHDRAW);
            return Response.builder()
                    .status(true)
                    .data(transactions)
                    .build();
        }else{
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }
    }

    public Response<?> getAllTransfers(Integer adminId) {
        if(isAdmin(adminId)){
            List<Transaction> transactions = transactionRepository.findByType(Type.TRANSFER);
            return Response.builder()
                    .status(true)
                    .data(transactions)
                    .build();
        }else{
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }
    }

    public Response<?> getAllTransactions(Integer adminId) {
        if(isAdmin(adminId)){
            List<Transaction> transactions = transactionRepository.findAll();
            return Response.builder()
                    .status(true)
                    .data(transactions)
                    .build();
        }else{
            return Response.builder()
                    .status(false)
                    .error("Admin can only access this")
                    .build();
        }
    }
}
