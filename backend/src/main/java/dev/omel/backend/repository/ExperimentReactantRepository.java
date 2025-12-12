package dev.omel.backend.repository;

import dev.omel.backend.entity.ExperimentReactantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentReactantRepository extends JpaRepository<ExperimentReactantEntity, Long> {
}
