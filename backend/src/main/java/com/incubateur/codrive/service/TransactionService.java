package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.Transaction;
import com.incubateur.codrive.repository.TransactionRepository;
import com.incubateur.codrive.service.impl.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService implements ITransactionService {

    @Autowired
    private TransactionRepository transactionRepo;

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepo.saveAndFlush(transaction);
    }

    @Override
    public Integer getSumCreditsBuy(Long id) {
        return transactionRepo.sumCreditsBuy(id);
    }

    @Override
    public Integer getSumCreditsSell(Long id) {
        return transactionRepo.sumCreditsSell(id);
    }

    @Override
    public Integer getCountTransaction(Long id) {
        return transactionRepo.countTransaction(id);
    }

    @Override
    public Integer getSumCreditsUse(Long id) {
        return transactionRepo.sumCreditsUse(id);
    }

    @Override
    public List<Transaction> findAll() {
        return transactionRepo.findAll();
    }
}
