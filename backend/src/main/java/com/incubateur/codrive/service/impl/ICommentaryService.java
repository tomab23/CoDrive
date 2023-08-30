package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.Commentary;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICommentaryService {

    Integer countCommentary(Long id);

    Double findNoteByUser(Long id);

    Commentary findById(Long id);

    List<Commentary> listCommentaries (Long id);

    Commentary saveCommentary(Commentary entity);

    List<Commentary> findAll();

    Double noteOfTravel(Long infoId);
}
