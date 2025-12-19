package dev.omel.service;

import dev.omel.bean.SupplierBean;

import java.util.List;

public interface SupplierService {
  SupplierBean getSupplierById(Long id);

  List<SupplierBean> getSuppliers();

  SupplierBean createSupplier(SupplierBean supplierBean);

  SupplierBean updateSupplier(Long id, SupplierBean supplierBean);
}
