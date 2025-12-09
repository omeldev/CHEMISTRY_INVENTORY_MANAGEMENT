package dev.omel.backend.type;

import lombok.Getter;

public enum Unit {

  UG(0.001, UnitType.MASS),
  MG(1, UnitType.MASS),         // mg (Base)
  G(1000, UnitType.MASS),
  KG(1_000_000, UnitType.MASS),

  UL(0.001, UnitType.VOLUME),
  ML(1, UnitType.VOLUME),       // mL (Base)
  L(1000, UnitType.VOLUME),

  PIECE(1, UnitType.COUNT),
  BOTTLE(1, UnitType.COUNT),
  PACK(1, UnitType.COUNT),
  BOX(1, UnitType.COUNT),
  CANISTER(1, UnitType.COUNT),
  BAG(1, UnitType.COUNT);

  private final double factorToBase;
  @Getter
  private final UnitType type;

  Unit(double factorToBase, UnitType type) {
    this.factorToBase = factorToBase;
    this.type = type;
  }

  public double toBase(double value) {
    return value * factorToBase;
  }

  public double fromBase(double baseValue) {
    return baseValue / factorToBase;
  }

}
