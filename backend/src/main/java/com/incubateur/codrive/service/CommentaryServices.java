package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.Commentary;
import com.incubateur.codrive.repository.CommentaryRepository;
import com.incubateur.codrive.service.impl.ICommentaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaryServices implements ICommentaryService {

    @Autowired
    CommentaryRepository commentaryRepository;
    @Override
    public Integer countCommentary(Long id) {
        return commentaryRepository.countCommentary(id);
    }
    @Override
    public Double findNoteByUser(Long id){return commentaryRepository.findNoteByUser(id);}

    @Override
    public Commentary findById(Long id) {
        return commentaryRepository.getReferenceById(id);
    }

    @Override
    public List<Commentary> listCommentaries(Long id) {
        return commentaryRepository.listCommentaries(id);
    }

    @Override
    public Commentary saveCommentary(Commentary entity) {
        return commentaryRepository.saveAndFlush(entity);
    }

    @Override
    public List<Commentary> findAll() {
        return commentaryRepository.findAll();
    }

    /**
     * Get the note of the travel by is id
     * @param infoId id of {@link com.incubateur.codrive.entity.Info}
     * @return Double note of travel
     */
    @Override
    public Double noteOfTravel(Long infoId) {
        return commentaryRepository.noteOfTravel(infoId);
    }
}
