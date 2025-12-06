package dev.omel.backend.repository;

import dev.omel.backend.entity.ChemicalSubstanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChemicalSubstanceRepository extends JpaRepository<ChemicalSubstanceEntity, Long> {

  Optional<ChemicalSubstanceEntity> findByName(String name);

}
