package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.ArchiveCommentary;
import com.incubateur.codrive.entity.Commentary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchiveCommentaryRepository  extends JpaRepository<ArchiveCommentary, Long> {
}
