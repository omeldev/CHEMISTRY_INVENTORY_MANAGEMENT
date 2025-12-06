package dev.omel.backend.repository;

import dev.omel.backend.entity.SubstanceEntryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubstanceEntryRepository extends JpaRepository<SubstanceEntryEntity, Long> {
}
