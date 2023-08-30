package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserId(Long userId);

    @Query(value = """
            SELECT SUM(credits) FROM `transaction` t WHERE use_id = :id AND buy = 1""", nativeQuery = true)
    Integer sumCreditsBuy(@Param("id") Long id);

    @Query(value = """
            SELECT SUM(credits) FROM `transaction` t WHERE use_id = :id AND buy = 0""", nativeQuery = true)
    Integer sumCreditsSell(@Param("id") Long id);

    @Query(value = """
            SELECT COUNT(1) FROM `transaction` t WHERE use_id = :id""", nativeQuery = true)
    Integer countTransaction(@Param("id") Long id);

    @Query(value = "SELECT SUM(b.credits) FROM user_booking ub \n" +
            "INNER JOIN booking b ON b.id = ub.boo_id \n" +
            "INNER JOIN `user` u ON u.id = ub.use_id \n" +
            "WHERE ub.use_id = :id AND b.status = \"ACCEPTED\"",nativeQuery = true)
    Integer sumCreditsUse(@Param("id") Long id);
}
