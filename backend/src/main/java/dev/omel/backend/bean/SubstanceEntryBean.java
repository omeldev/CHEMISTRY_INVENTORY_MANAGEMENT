package dev.omel.backend.bean;

import dev.omel.backend.entity.SubstanceEntryEntity;
import dev.omel.backend.type.Unit;

public record SubstanceEntryBean(
  Long id,
  Long chemicalSubstanceId,
  String addedAt,
  String updatedAt,
  double quantityBase,  // Menge in Basis-Einheit (mg, mL, Stück)
  Unit unit,            // z.B. MG, G, ML, L, PIECE
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
      entity.getQuantityBase(),           // Basiswert direkt übernehmen
      entity.getUnit(),                   // Enum direkt übernehmen
      entity.getPurity(),
      entity.getLocation() != null ? entity.getLocation().getLocation() : null,
      entity.getNote()
    );
  }
}
