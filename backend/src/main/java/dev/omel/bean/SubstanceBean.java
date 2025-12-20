package dev.omel.bean;

import dev.omel.entity.SubstanceEntity;
import dev.omel.type.SpecifiedHazard;

public record SubstanceBean(
  Long id,
  String name,
  String casNumber,
  String molecularFormula,
  Long supplierId,
  Integer nfpaHealth,
  Integer nfpaFlammability,
  Integer nfpaReactivity,
  SpecifiedHazard nfpaSpecifiedHazard
) {
  public static SubstanceBean from(SubstanceEntity entity) {
    return new SubstanceBean(
      entity.getId(),
      entity.getName(),
      entity.getCasNumber(),
      entity.getMolecularFormula(),
      entity.getSupplier() != null ? entity.getSupplier().getId() : null,
      entity.getNfpa704Health(),
      entity.getNfpa704Flammability(),
      entity.getNfpa704Reactivity(),
      entity.getNfpa704SpecifiedHazard()
    );
  }
}
