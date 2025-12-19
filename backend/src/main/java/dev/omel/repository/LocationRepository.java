package dev.omel.repository;

import dev.omel.entity.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, Long> {
  Optional<LocationEntity> findByName(String name);
}
