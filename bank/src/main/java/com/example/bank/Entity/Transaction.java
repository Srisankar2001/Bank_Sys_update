package com.example.bank.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    private Integer receiverId;
    private String userAccountNumber;
    private String receiverAccountNumber;
    private Type type;
    private Double amount;
    private Double total;
    private LocalDate localDate;
    private LocalTime localTime;
}
