package com.incubateur.codrive.controller;

import com.incubateur.codrive.dto.TransactionDto;
import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.Transaction;
import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.mapper.TransactionMapper;
import com.incubateur.codrive.repository.UserRepository;
import com.incubateur.codrive.service.UserService;
import com.incubateur.codrive.service.impl.ITransactionService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@SpringBootApplication
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private ITransactionService transactionService;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public Transaction saveTransaction (@AuthenticationPrincipal @NonNull UserDetails userDetails,
                                        @RequestBody TransactionDto dto) {

        User user = userService.getUserByMail(userDetails.getUsername());

        Transaction transaction = TransactionMapper.INSTANCE.toTransactionEntity(dto);
        transaction.setUser(user);

        return transactionService.saveTransaction(transaction);
    }

    @PostMapping("/addRegister")
    public Transaction saveTransactionRegister (@RequestBody TransactionDto dto) {

        User user = userService.lastId();

        Transaction transaction = TransactionMapper.INSTANCE.toTransactionEntity(dto);
        transaction.setUser(user);

        return transactionService.saveTransaction(transaction);
    }


    @GetMapping("/credits/buy")
    public Integer getSumCreditsBuy(@AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());
        return transactionService.getSumCreditsBuy(user.getId());
    }

    @GetMapping("/credits/sell")
    public Integer getSumCreditsSell(@AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());
        return transactionService.getSumCreditsSell(user.getId());
    }

    @GetMapping("/transaction/count")
    public Integer getCountTransaction(@AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());
        return transactionService.getCountTransaction(user.getId());
    }

    @GetMapping("credits/use")
    public Integer getSumCreditsUse(@AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());
        return transactionService.getSumCreditsUse(user.getId());
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats(@AuthenticationPrincipal @NonNull UserDetails userDetails){
        User user = userService.getUserByMail(userDetails.getUsername());

        Integer creditsUse = transactionService.getSumCreditsUse(user.getId());
        Integer creditsSell = transactionService.getSumCreditsSell(user.getId());
        Integer creditsBuy = transactionService.getSumCreditsBuy(user.getId());
        Integer transactions = transactionService.getCountTransaction(user.getId());

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("creditsUse",creditsUse);
        userMap.put("creditsSell",creditsSell);
        userMap.put("creditsBuy",creditsBuy);
        userMap.put("transactions",transactions);

        return userMap;
    }

    @GetMapping("/list")
    public List<Transaction> getAllTransactionByUserDetails(@AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());
        List<Transaction> transactions = transactionService.findAll();

        return transactions.stream()
                .filter(transaction -> transaction.getUser().equals(user))
                .sorted(Comparator.comparing(Transaction::getId).reversed())
                .collect(Collectors.toList());
    }

}
