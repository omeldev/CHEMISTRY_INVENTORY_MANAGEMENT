package dev.omel.worker;

import dev.omel.bean.SupplierBean;
import dev.omel.entity.SupplierEntity;
import dev.omel.repository.SupplierRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SupplierWorker {

  private final SupplierRepository supplierRepository;

  public SupplierWorker(SupplierRepository supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  public SupplierBean getSupplierById(Long id) {
    return supplierRepository.findById(id)
      .map(SupplierBean::from)
      .orElse(null);
  }

  public List<SupplierBean> getSuppliers() {
    return supplierRepository.findAll()
      .stream()
      .map(SupplierBean::from)
      .toList();
  }

  public SupplierBean createSupplier(SupplierBean supplierBean) {
    if (supplierRepository.findByName(supplierBean.name()).isPresent()) return null;

    SupplierEntity entity = new SupplierEntity();
    entity.setName(supplierBean.name());
    entity.setUrl(supplierBean.url());
    supplierRepository.save(entity);
    return SupplierBean.from(entity);
  }

  public SupplierBean updateSupplier(Long id, SupplierBean supplierBean) {
    SupplierEntity entity = supplierRepository.findById(id).orElse(null);
    if (entity == null) return null;

    entity.setName(supplierBean.name());
    entity.setUrl(supplierBean.url());
    supplierRepository.save(entity);
    return SupplierBean.from(entity);
  }
}
