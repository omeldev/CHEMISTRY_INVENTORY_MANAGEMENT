package dev.omel.backend.repository;

import dev.omel.backend.entity.ChemicalSubstanceEntryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChemicalSubstanceEntryRepository extends JpaRepository<ChemicalSubstanceEntryEntity, Long> {
}
