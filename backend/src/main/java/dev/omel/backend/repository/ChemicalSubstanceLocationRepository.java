package dev.omel.backend.repository;

import dev.omel.backend.entity.ChemicalSubstanceLocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChemicalSubstanceLocationRepository extends JpaRepository<ChemicalSubstanceLocationEntity, Long> {
}
