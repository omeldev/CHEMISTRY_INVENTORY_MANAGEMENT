package dev.omel.bean;

import dev.omel.entity.LabwareEntity;
import dev.omel.type.LabwareCondition;
import dev.omel.type.Unit;

import java.sql.Timestamp;
import java.util.Date;

public record LabwareBean(
  Long id,
  String name,
  LabwareCondition condition,
  String note,
  Date nextInspectionDate,
  Date lastInspectionDate,
  Timestamp createdAt,
  Timestamp updatedAt,
  Double weight,
  Unit weightUnit,
  Long materialId,
  Long locationId,
  Double volume,
  Unit volumeUnit,
  Long labwareCategoryId
) {

  public static LabwareBean from(LabwareEntity entity) {
    return new LabwareBean(
      entity.getId(),
      entity.getName(),
      entity.getCondition(),
      entity.getNote(),
      entity.getNextInspectionDate(),
      entity.getLastInspectionDate(),
      entity.getCreatedAt(),
      entity.getUpdatedAt(),
      entity.getWeight(),
      entity.getWeightUnit(),
      entity.getMaterial() != null ? entity.getMaterial().getId() : null,
      entity.getLocation() != null ? entity.getLocation().getId() : null,
      entity.getVolume(),
      entity.getVolumeUnit(),
      entity.getLabwareCategory() != null ? entity.getLabwareCategory().getId() : null
    );
  }
}
