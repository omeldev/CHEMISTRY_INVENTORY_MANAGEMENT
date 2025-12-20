package dev.omel.controller;

import dev.omel.bean.LabwareCategoryBean;
import dev.omel.service.LabwareCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/labwarecategory")
public class LabwareCategoryController {

  private final LabwareCategoryService labwareCategoryService;

  public LabwareCategoryController(LabwareCategoryService labwareCategoryService) {
    this.labwareCategoryService = labwareCategoryService;
  }

  @GetMapping
  public ResponseEntity<List<LabwareCategoryBean>> getLabwareCategories() {
    List<LabwareCategoryBean> categories = labwareCategoryService.getLabwareCategories();
    return ResponseEntity.ok(categories);
  }

  @GetMapping("/{id}")
  public ResponseEntity<LabwareCategoryBean> getCategory(@PathVariable Long id) {
    LabwareCategoryBean category = labwareCategoryService.getLabwareCategory(id);
    return ResponseEntity.ok(category);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<LabwareCategoryBean> updateCategory(@PathVariable Long id, @RequestBody LabwareCategoryBean categoryBean) {
    LabwareCategoryBean updatedCategory = labwareCategoryService.updateLabwareCategory(id, categoryBean);
    return ResponseEntity.ok(updatedCategory);
  }

  @PostMapping
  public ResponseEntity<LabwareCategoryBean> createCategory(@RequestBody LabwareCategoryBean categoryBean) {
    LabwareCategoryBean createdCategory = labwareCategoryService.createLabwareCategory(categoryBean);
    return ResponseEntity.ok(createdCategory);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteCategory(@PathVariable Long id) {
    Boolean deleted = labwareCategoryService.deleteLabwareCategory(id);
    return ResponseEntity.ok(deleted);
  }
}
