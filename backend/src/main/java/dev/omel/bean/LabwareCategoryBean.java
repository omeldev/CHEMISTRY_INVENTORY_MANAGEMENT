package dev.omel.bean;

import dev.omel.entity.LabwareCategoryEntity;

public record LabwareCategoryBean(
  Long id,
  String name
) {

  public static LabwareCategoryBean from(LabwareCategoryEntity category) {
    return new LabwareCategoryBean(
      category.getId(),
      category.getName()
    );
  }
}
