package dev.omel.bean;

import dev.omel.entity.SupplierEntity;

public record SupplierBean(
  Long id,
  String name,
  String url
) {
  public static SupplierBean from(SupplierEntity supplierEntity) {
    return new SupplierBean(
      supplierEntity.getId(),
      supplierEntity.getName(),
      supplierEntity.getUrl()
    );
  }
}
