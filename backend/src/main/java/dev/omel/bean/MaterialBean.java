package dev.omel.bean;

import dev.omel.entity.MaterialEntity;

public record MaterialBean(
  Long id,
  String name
) {

  public static MaterialBean from(MaterialEntity materialEntity) {
    return new MaterialBean(
      materialEntity.getId(),
      materialEntity.getName()
    );
  }
}
