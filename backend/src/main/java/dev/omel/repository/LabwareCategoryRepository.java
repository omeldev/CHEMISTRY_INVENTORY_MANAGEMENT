package dev.omel.repository;

import dev.omel.entity.LabwareCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabwareCategoryRepository extends JpaRepository<LabwareCategoryEntity, Long> {
}
