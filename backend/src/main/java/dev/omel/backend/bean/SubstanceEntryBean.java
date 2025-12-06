package dev.omel.backend.bean;

import dev.omel.backend.entity.SubstanceEntryEntity;

public record SubstanceEntryBean(
  Long id,
  Long chemicalSubstanceId,
  String addedAt,
  String updatedAt,
  String quantity,
  String purity,
  String location,
  String note
) {
  public static SubstanceEntryBean from(SubstanceEntryEntity entity) {
    return new SubstanceEntryBean(
      entity.getId(),
      entity.getSubstance().getId(),
      entity.getAddedAt() != null ? entity.getAddedAt().toString() : null,
      entity.getUpdatedAt() != null ? entity.getUpdatedAt().toString() : null,
      entity.getQuantity(),
      entity.getPurity(),
      entity.getLocation() != null ? entity.getLocation().getLocation() : null,
      entity.getNote()
    );
  }
}
