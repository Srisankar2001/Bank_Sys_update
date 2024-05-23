package com.example.bank.Repository;


import com.example.bank.Entity.Transaction;
import com.example.bank.Entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {

    public List<Transaction> findByUserId(Integer id);
    public List<Transaction> findByUserIdAndType(Integer id, Type type);

    public  List<Transaction> findByUserIdAndTypeOrReceiverIdAndType(Integer userId, Type userType, Integer receiverId, Type receiverType);

    public List<Transaction> findByUserIdOrReceiverId(Integer userId,Integer receiverId);

    public List<Transaction> findByType(Type type);


}
