package dev.omel.repository;

import dev.omel.entity.ExperimentReactantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentReactantRepository extends JpaRepository<ExperimentReactantEntity, Long> {
}
