package dev.omel.bean;

import dev.omel.entity.ExperimentReactantEntity;
import dev.omel.type.Unit;

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
