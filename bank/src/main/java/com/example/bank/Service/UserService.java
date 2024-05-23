package com.example.bank.Service;

import com.example.bank.Config.Response;
import com.example.bank.Entity.Role;
import com.example.bank.Entity.Transaction;
import com.example.bank.Entity.Type;
import com.example.bank.Entity.User;
import com.example.bank.Repository.TransactionRepository;
import com.example.bank.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    TransactionRepository transactionRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username){
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("user not found"));
            }
        };
    }



    public Response<?> deposit(Integer id, Double cash) {
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            if(existingUser.get().getIs_active()){
                User user = existingUser.get();
                user.setCash(user.getCash() + cash);
                userRepository.save(user);
                Transaction transaction = Transaction.builder()
                        .userId(id)
                        .receiverId(null)
                        .userAccountNumber(user.getAccountNumber())
                        .receiverAccountNumber(null)
                        .amount(cash)
                        .total(user.getCash())
                        .localTime(LocalTime.now())
                        .localDate(LocalDate.now())
                        .type(Type.DEPOSIT)
                        .build();
                transactionRepository.save(transaction);
                return Response.builder()
                        .status(true)
                        .build();
            }else{
                return Response.builder()
                        .status(false)
                        .error("User is Blocked")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not Found")
                    .build();
        }
    }

    public Response<?> transfer(Integer id, String accountNumber, Double cash) {
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            if(existingUser.get().getIs_active()){
                if(isReceiverExist(accountNumber)){
                    Optional<User> existingReceiver = userRepository.findByAccountNumber(accountNumber);
                    if (existingReceiver.get().getIs_active()){
                        if(existingReceiver.get().getRole() == Role.USER){
                            if(existingUser.get().getId() == existingReceiver.get().getId()){
                                return Response.builder()
                                        .status(false)
                                        .error("This is your account number")
                                        .build();
                            }else{
                                if(existingUser.get().getCash() < cash){
                                    return Response.builder()
                                            .status(false)
                                            .error("Not sufficient balance")
                                            .build();
                                }else{
                                    User user = existingUser.get();
                                    user.setCash(user.getCash() - cash);
                                    userRepository.save(user);
                                    User receiver = existingReceiver.get();
                                    receiver.setCash(receiver.getCash() + cash);
                                    userRepository.save(receiver);
                                    Transaction transaction = Transaction.builder()
                                            .userId(id)
                                            .receiverId(receiver.getId())
                                            .userAccountNumber(user.getAccountNumber())
                                            .receiverAccountNumber(receiver.getAccountNumber())
                                            .amount(cash)
                                            .total(user.getCash())
                                            .localTime(LocalTime.now())
                                            .localDate(LocalDate.now())
                                            .type(Type.TRANSFER)
                                            .build();
                                    transactionRepository.save(transaction);
                                    return Response.builder()
                                            .status(true)
                                            .build();
                                }
                            }
                        }else{
                            return Response.builder()
                                    .status(false)
                                    .error("Invalid Account Number")
                                    .build();
                        }
                    }else{
                        return Response.builder()
                                .status(false)
                                .error("Receiver is Blocked")
                                .build();
                    }
                }else{
                    return Response.builder()
                            .status(false)
                            .error("Receiver not Found")
                            .build();
                }

            }else{
                return Response.builder()
                        .status(false)
                        .error("User is Blocked")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not Found")
                    .build();
        }
    }

    public Response<?> withdraw(Integer id, Double cash) {
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            if(existingUser.get().getIs_active()){
                User user = existingUser.get();
                if(user.getCash() < cash ){
                    return Response.builder()
                            .status(false)
                            .error("Not sufficient balance")
                            .build();
                }else{
                    user.setCash(user.getCash() - cash);
                    userRepository.save(user);
                    Transaction transaction = Transaction.builder()
                            .userId(id)
                            .receiverId(null)
                            .userAccountNumber(user.getAccountNumber())
                            .receiverAccountNumber(null)
                            .amount(cash)
                            .total(user.getCash())
                            .localTime(LocalTime.now())
                            .localDate(LocalDate.now())
                            .type(Type.WITHDRAW)
                            .build();
                    transactionRepository.save(transaction);
                    return Response.builder()
                            .status(true)
                            .build();
                }
            }else{
                return Response.builder()
                        .status(false)
                        .error("User is Blocked")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not Found")
                    .build();
        }
    }

    public boolean isReceiverExist(String accountNumber){
        Optional<User> user = userRepository.findByAccountNumber(accountNumber);
        return user.isPresent();
    }

    public Response<?> getDetails(Integer id) {
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            if(existingUser.get().getIs_active()){
                return Response.builder()
                        .status(true)
                        .data(existingUser.get())
                        .build();
            }else{
                return Response.builder()
                        .status(false)
                        .error("User is Blocked")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not Found")
                    .build();
        }
    }

    public Response<?> getDeposits(Integer id) {
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            if(existingUser.get().getIs_active()){
                List<Transaction> transactions = transactionRepository.findByUserIdAndType(id,Type.DEPOSIT);
                return Response.builder()
                        .status(true)
                        .data(transactions)
                        .build();
            }else{
                return Response.builder()
                        .status(false)
                        .error("User is Blocked")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not Found")
                    .build();
        }
    }

    public Response<?> getWithdraws(Integer id) {
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            if(existingUser.get().getIs_active()){
                List<Transaction> transactions = transactionRepository.findByUserIdAndType(id,Type.WITHDRAW);
                return Response.builder()
                        .status(true)
                        .data(transactions)
                        .build();
            }else{
                return Response.builder()
                        .status(false)
                        .error("User is Blocked")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not Found")
                    .build();
        }
    }

    public Response<?> getTransfers(Integer id) {
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            if(existingUser.get().getIs_active()){
                List<Transaction> transactions = transactionRepository.findByUserIdAndTypeOrReceiverIdAndType(id,Type.TRANSFER,id,Type.TRANSFER);
                return Response.builder()
                        .status(true)
                        .data(transactions)
                        .build();
            }else{
                return Response.builder()
                        .status(false)
                        .error("User is Blocked")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not Found")
                    .build();
        }
    }

    public Response<?> getTransactions(Integer id) {
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            if(existingUser.get().getIs_active()){
                List<Transaction> transactions = transactionRepository.findByUserIdOrReceiverId(id,id);
                return Response.builder()
                        .status(true)
                        .data(transactions)
                        .build();
            }else{
                return Response.builder()
                        .status(false)
                        .error("User is Blocked")
                        .build();
            }
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not Found")
                    .build();
        }
    }
}
