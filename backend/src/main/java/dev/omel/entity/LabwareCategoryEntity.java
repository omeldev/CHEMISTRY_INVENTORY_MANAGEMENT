package dev.omel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "labware_categories")
@Getter
public class LabwareCategoryEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", unique = true)
  @Setter
  private String name;

  public LabwareCategoryEntity() {
  }
}
