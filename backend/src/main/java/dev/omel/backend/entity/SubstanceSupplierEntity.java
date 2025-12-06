package dev.omel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "chemical_substance_supplier")
@Getter
public class SubstanceSupplierEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Setter
  @Column(name = "name")
  private String name;

  @Column(name = "url")
  @Setter
  private String url;

  public SubstanceSupplierEntity() {
  }

}
