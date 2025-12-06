package dev.omel.backend.bean;

public record ChemicalSubstanceEntryBean(
    Long id,
    Long chemicalSubstanceId,
    String addedAt,
    String updatedAt,
    String quantity,
    String purity,
    String location,
    String note
) {
}
