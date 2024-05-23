package com.example.bank.Repository;

import com.example.bank.Entity.Role;
import com.example.bank.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    public Optional<User> findByEmail(String email);
    public Optional<User> findByEmailAndPassword(String email,String password);
    public Optional<User> findByAccountNumber(String accountNumber);
    public List<User> findAllByRole(Role role);
}
