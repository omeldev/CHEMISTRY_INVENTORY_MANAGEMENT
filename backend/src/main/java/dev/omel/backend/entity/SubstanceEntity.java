package dev.omel.backend.entity;

import dev.omel.backend.type.SpecifiedHazard;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "chemical_substance")
@Getter
public class SubstanceEntity {
  @Id
  @Nullable
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  @Setter
  @Nonnull
  private String name;

  @Column(name = "cas_number")
  @Setter
  @Nullable
  private String casNumber;

  @Column(name = "molecular_formula")
  @Setter
  @Nullable
  private String molecularFormula;


  @Column(name = "nfpa_704_health")
  @Setter
  @Nullable
  private Integer nfpa704Health;

  @Column(name = "nfpa_704_flammability")
  @Setter
  @Nullable
  private Integer nfpa704Flammability;

  @Column(name = "nfpa_704_reactivity")
  @Setter
  @Nullable
  private Integer nfpa704Reactivity;

  @Column(name = "nfpa_704_specified_hazard")
  @Setter
  @Nullable
  @Enumerated(EnumType.STRING)
  private SpecifiedHazard nfpa704SpecifiedHazard;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "supplier_id")
  private SubstanceSupplierEntity supplier;

  public SubstanceEntity() {
  }

}
