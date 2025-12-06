package dev.omel.backend.bean;

import dev.omel.backend.entity.ChemicalSubstanceEntity;

public record ChemicalSubstanceBean(
    Long id,
    String name,
    String casNumber,
    String molecularFormula,
    String supplier,
    Integer nfpaHealth,
    Integer nfpaFlammability,
    Integer nfpaReactivity,
    String nfpaSpecifiedHazard
) {
  public static ChemicalSubstanceBean from(ChemicalSubstanceEntity entity) {
    return new ChemicalSubstanceBean(
        entity.getId(),
        entity.getName(),
        entity.getCasNumber(),
        entity.getMolecularFormula(),
        entity.getSupplier().getName(),
        entity.getNfpa704Health(),
        entity.getNfpa704Flammability(),
        entity.getNfpa704Reactivity(),
        entity.getNfpa704SpecifiedHazard()
    );
  }
}
