package dev.omel.backend.repository;

import dev.omel.backend.entity.SubstanceLocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubstanceLocationRepository extends JpaRepository<SubstanceLocationEntity, Long> {
}
