package dev.omel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "suppliers")
@Getter
public class SupplierEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Setter
  @Column(name = "name")
  private String name;

  @Column(name = "url")
  @Setter
  private String url;

  public SupplierEntity() {
  }

}
