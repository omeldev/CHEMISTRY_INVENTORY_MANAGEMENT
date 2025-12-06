package dev.omel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "chemical_substance_location")
@Getter
public class SubstanceLocationEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "location", unique = true)
  @Setter
  private String location;

  public SubstanceLocationEntity() {
  }

}
