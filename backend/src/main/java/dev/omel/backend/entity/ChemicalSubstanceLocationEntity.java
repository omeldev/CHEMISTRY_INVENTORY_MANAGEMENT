package dev.omel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity(name = "chemical_substance_location")
@Getter
public class ChemicalSubstanceLocationEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "location")
  private String location;

  public ChemicalSubstanceLocationEntity() {}

}
