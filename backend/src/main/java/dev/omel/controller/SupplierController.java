package dev.omel.controller;

import dev.omel.bean.SupplierBean;
import dev.omel.service.SupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierController {

  private final SupplierService supplierService;

  public SupplierController(SupplierService supplierService) {
    this.supplierService = supplierService;
  }

  @PostMapping
  public ResponseEntity<SupplierBean> createSupplier(@RequestBody SupplierBean supplierBean) {
    SupplierBean createdSupplier = supplierService.createSupplier(supplierBean);
    return ResponseEntity.ok(createdSupplier);
  }

  @GetMapping
  public ResponseEntity<List<SupplierBean>> getAllSuppliers() {
    List<SupplierBean> suppliers = supplierService.getSuppliers();
    return ResponseEntity.ok(suppliers);
  }

  @GetMapping("/{id}")
  public ResponseEntity<SupplierBean> getSupplierById(@PathVariable Long id) {
    SupplierBean supplier = supplierService.getSupplierById(id);
    if (supplier != null) {
      return ResponseEntity.ok(supplier);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PatchMapping("/{id}")
  public ResponseEntity<SupplierBean> updateSupplier(@PathVariable Long id, @RequestBody SupplierBean supplierBean) {
    SupplierBean updatedSupplier = supplierService.updateSupplier(id, supplierBean);
    if (updatedSupplier != null) {
      return ResponseEntity.ok(updatedSupplier);
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
