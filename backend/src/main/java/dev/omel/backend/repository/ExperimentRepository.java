package dev.omel.backend.repository;

import dev.omel.backend.entity.ExperimentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentRepository extends JpaRepository<ExperimentEntity, Long> {
}
