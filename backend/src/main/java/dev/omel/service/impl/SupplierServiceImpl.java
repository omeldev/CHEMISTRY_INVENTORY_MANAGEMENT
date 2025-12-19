package dev.omel.service.impl;

import dev.omel.bean.SupplierBean;
import dev.omel.service.SupplierService;
import dev.omel.worker.SupplierWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {
  private final SupplierWorker supplierWorker;

  public SupplierServiceImpl(SupplierWorker supplierWorker) {
    this.supplierWorker = supplierWorker;
  }

  @Override
  public SupplierBean getSupplierById(Long id) {
    return supplierWorker.getSupplierById(id);
  }

  @Override
  public List<SupplierBean> getSuppliers() {
    return supplierWorker.getSuppliers();
  }

  @Override
  @Transactional
  public SupplierBean createSupplier(SupplierBean supplierBean) {
    return supplierWorker.createSupplier(supplierBean);
  }

  @Override
  @Transactional
  public SupplierBean updateSupplier(Long id, SupplierBean supplierBean) {
    return supplierWorker.updateSupplier(id, supplierBean);
  }
}
