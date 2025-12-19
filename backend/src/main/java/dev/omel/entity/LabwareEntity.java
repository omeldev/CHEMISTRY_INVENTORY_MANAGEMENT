package dev.omel.entity;

import dev.omel.type.LabwareCondition;
import dev.omel.type.Unit;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;

@Entity(name = "labwares")
@Getter
public class LabwareEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  @Setter
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(name = "condition")
  @Setter
  private LabwareCondition condition;

  @Column(name = "note", columnDefinition = "TEXT")
  @Setter
  private String note;

  @Column(name = "next_inspection_date")
  @Setter
  private Date nextInspectionDate;

  @Column(name = "last_inspection_date")
  @Setter
  private Date lastInspectionDate;

  @Column(name = "created_at")
  @Setter
  private Timestamp createdAt;

  @Column(name = "updated_at")
  @Setter
  private Timestamp updatedAt;

  @Column(name = "weight")
  @Setter
  private Double weight;

  @Column(name = "weight_unit")
  @Setter
  private Unit weightUnit;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "material_id")
  @Setter
  private MaterialEntity material;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "location_id")
  @Setter
  private LocationEntity location;

  @Column(name = "volume")
  @Setter
  private Double volume;

  @Column(name = "volume_unit")
  @Setter
  private Unit volumeUnit;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "labware_category_id")
  @Setter
  private LabwareCategory labwareCategory;

  public LabwareEntity() {
  }

}
