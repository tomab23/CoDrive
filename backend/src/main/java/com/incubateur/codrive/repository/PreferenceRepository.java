package com.incubateur.codrive.repository;
import com.incubateur.codrive.entity.Preference;
import com.incubateur.codrive.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PreferenceRepository {

    public interface preferenceRepository extends JpaRepository<Preference, Long> {
        public Optional<Preference> findById(Long id);

    }
}
