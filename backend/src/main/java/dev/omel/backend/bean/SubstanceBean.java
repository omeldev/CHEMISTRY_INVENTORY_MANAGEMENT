package dev.omel.backend.bean;

import dev.omel.backend.entity.SubstanceEntity;
import dev.omel.backend.type.SpecifiedHazard;

public record SubstanceBean(
  Long id,
  String name,
  String casNumber,
  String molecularFormula,
  String supplier,
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
      entity.getSupplier().getName(),
      entity.getNfpa704Health(),
      entity.getNfpa704Flammability(),
      entity.getNfpa704Reactivity(),
      entity.getNfpa704SpecifiedHazard()
    );
  }
}
