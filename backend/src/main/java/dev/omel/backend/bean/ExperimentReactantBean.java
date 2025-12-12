package dev.omel.backend.bean;

import dev.omel.backend.entity.ExperimentReactantEntity;
import dev.omel.backend.type.Unit;

public record ExperimentReactantBean(
  Long id,
  Long substanceEntryId,
  Double quantity,
  Unit unit
) {
  public static ExperimentReactantBean from(ExperimentReactantEntity entity) {
    return new ExperimentReactantBean(
      entity.getId(),
      entity.getInventorySubstance().getId(),
      entity.getQuantity(),
      entity.getUnit()
    );
  }
}
