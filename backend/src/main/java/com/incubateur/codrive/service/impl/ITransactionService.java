package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.Transaction;

import java.util.List;

public interface ITransactionService {

    Transaction saveTransaction(Transaction transaction);

    Integer getSumCreditsBuy(Long id);

    Integer getSumCreditsSell(Long id);

    Integer getCountTransaction(Long id);

    Integer getSumCreditsUse(Long id);

    List<Transaction> findAll();
}
