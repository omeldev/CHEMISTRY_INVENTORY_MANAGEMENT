package dev.omel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
public class ExperimentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "title")
  @Setter
  private String title;

  @Column(name = "note", columnDefinition = "TEXT")
  @Setter
  private String note;

  @Column(name = "created_at")
  @Setter
  private Timestamp created;

  @Column(name = "finalized")
  @Setter
  private Boolean finalized;

  @OneToMany(
    mappedBy = "experiment",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @Setter
  private List<ExperimentReactantEntity> reactants;

  public ExperimentEntity() {
  }
}
