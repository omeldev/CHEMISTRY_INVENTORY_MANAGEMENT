package dev.omel.backend.entity;

import dev.omel.backend.type.Unit;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity(name = "chemical_substance_entry")
@Getter
public class SubstanceEntryEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "substance_id", nullable = false)
  @Setter
  private SubstanceEntity substance;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "location_id", nullable = false)
  private SubstanceLocationEntity location;

  @Column(name = "note")
  @Setter
  private String note;

  @Column(name = "added_at")
  @Setter
  private Timestamp addedAt;

  @Column(name = "updated_at")
  @Setter
  private Timestamp updatedAt;

  @Column(name = "deleted")
  @Setter
  private boolean deleted;

  @Column(name = "quantity_base", nullable = false)
  @Setter
  private double quantityBase;

  @Enumerated(EnumType.STRING)
  @Column(name = "unit", nullable = false)
  @Setter
  private Unit unit;

  @Column(name = "purity")
  @Setter
  @Nonnull
  private String purity;

  public SubstanceEntryEntity() {
  }


}
