package dev.omel.repository;

import dev.omel.entity.LabwareEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabwareRepository extends JpaRepository<LabwareEntity, Long> {
}
