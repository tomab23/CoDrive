package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.Commentary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentaryRepository extends JpaRepository<Commentary, Long> {

    @Query(value = """
            select count(*) from commentary c\s
            inner join info i ON i.id = c.inf_id\s
            where i.use_id = :id AND c.number_report < 4""", nativeQuery = true )
    Integer countCommentary(@Param("id") Long id);

    @Query(value = """
            select ROUND(AVG(c.note), 1) from commentary c\s 
            inner join info i ON i.id = c.inf_id\s            
            where i.use_id = :id""", nativeQuery = true )
    Double findNoteByUser(@Param("id") Long id);

    @Query(value = """
            select c.* from commentary c\s 
            join info i ON i.id = c.inf_id\s            
            where i.use_id = :id AND c.number_report < 4""", nativeQuery = true )
    List<Commentary> listCommentaries (@Param("id") Long id);

    @Query(value = """
            SELECT SUM(c.note) FROM commentary c
              INNER JOIN info i ON i.id = c.inf_id
              WHERE i.id = :id""", nativeQuery = true )
    Double noteOfTravel (@Param("id") Long id);





    List<Commentary> findByUserId(Long userId);
}
