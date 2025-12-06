package dev.omel.backend.repository;

import dev.omel.backend.entity.ChemicalSubstanceSupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChemicalSubstanceSupplierRepository extends JpaRepository<ChemicalSubstanceSupplierEntity, Long> {
  Optional<ChemicalSubstanceSupplierEntity> findByName(String name);
}
