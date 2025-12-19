package dev.omel.bean;

import dev.omel.entity.LocationEntity;

public record LocationBean(
  Long id,
  String name
) {
  public static LocationBean from(LocationEntity locationEntity) {
    return new LocationBean(
      locationEntity.getId(),
      locationEntity.getName()
    );
  }
}
