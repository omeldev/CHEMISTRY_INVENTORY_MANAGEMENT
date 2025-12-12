package dev.omel.backend.bean;

import dev.omel.backend.entity.ExperimentEntity;

import java.util.Date;
import java.util.List;

public record ExperimentBean(
  Long id,
  String title,
  Boolean finalized,
  String note,
  Date created,
  List<ExperimentReactantBean> reactants
) {

  public static ExperimentBean from(ExperimentEntity entity) {

    List<ExperimentReactantBean> reactants = entity.getReactants().stream()
      .map(ExperimentReactantBean::from)
      .toList();

    return new ExperimentBean(
      entity.getId(),
      entity.getTitle(),
      entity.getFinalized() != null && entity.getFinalized(),
      entity.getNote(),
      entity.getCreated(),
      reactants
    );
  }

}
