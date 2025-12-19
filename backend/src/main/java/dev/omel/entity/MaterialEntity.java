package dev.omel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "materials")
@Getter
public class MaterialEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", unique = true)
  @Setter
  private String name;

  public MaterialEntity() {
  }
}
