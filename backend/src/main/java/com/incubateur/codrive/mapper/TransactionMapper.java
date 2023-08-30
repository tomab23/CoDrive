package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.TransactionDto;
import com.incubateur.codrive.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TransactionMapper {

    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    TransactionDto toTransactionDto(Transaction transaction);

    Transaction toTransactionEntity(TransactionDto transactionDto);
}
