package dev.omel.repository;

import dev.omel.entity.SubstanceSupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubstanceSupplierRepository extends JpaRepository<SubstanceSupplierEntity, Long> {
  Optional<SubstanceSupplierEntity> findByName(String name);
}
