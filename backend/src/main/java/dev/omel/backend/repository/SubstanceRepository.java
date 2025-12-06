package dev.omel.backend.repository;

import dev.omel.backend.entity.SubstanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubstanceRepository extends JpaRepository<SubstanceEntity, Long> {

  Optional<SubstanceEntity> findByName(String name);

}
