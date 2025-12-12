package dev.omel.backend.entity;

import dev.omel.backend.type.Unit;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "experiment_substance")
@Getter
public class ExperimentReactantEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "inventory_substance_id", nullable = false)
  @Setter
  private SubstanceEntryEntity inventorySubstance;

  @Column(name = "quantity", nullable = false)
  @Setter
  private double quantity;

  @Enumerated(EnumType.STRING)
  @Column(name = "unit", nullable = false)
  @Setter
  private Unit unit;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "experiment_id", nullable = false)
  @Setter
  private ExperimentEntity experiment;

  public ExperimentReactantEntity() {
  }
}
