package dev.omel.controller;

import dev.omel.bean.MaterialBean;
import dev.omel.service.MaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/material")
public class MaterialController {
  private final MaterialService materialService;

  public MaterialController(MaterialService materialService) {
    this.materialService = materialService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<MaterialBean> getMaterialById(@PathVariable Long id) {
    MaterialBean materialBean = materialService.getMaterialById(id);
    if (materialBean == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(materialBean);
  }

  @GetMapping
  public ResponseEntity<List<MaterialBean>> getMaterials() {
    List<MaterialBean> materials = materialService.getMaterials();
    return ResponseEntity.ok(materials);
  }

  @PostMapping
  public ResponseEntity<MaterialBean> createMaterial(@RequestBody MaterialBean materialBean) {
    MaterialBean createdMaterial = materialService.createMaterial(materialBean);
    if (createdMaterial == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(createdMaterial);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<MaterialBean> updateMaterial(@PathVariable Long id, @RequestBody MaterialBean materialBean) {
    MaterialBean updatedMaterial = materialService.updateMaterial(id, materialBean);
    if (updatedMaterial == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(updatedMaterial);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteMaterial(@PathVariable Long id) {
    Boolean deleted = materialService.deleteMaterial(id);
    if (!deleted) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(true);
  }

}
