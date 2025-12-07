package dev.omel.backend.controller;

import dev.omel.backend.bean.SubstanceEntryBean;
import dev.omel.backend.service.SubstanceInventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/inventory")
public class InventoryController {

  private final SubstanceInventoryService substanceInventoryService;

  public InventoryController(SubstanceInventoryService substanceInventoryService) {
    this.substanceInventoryService = substanceInventoryService;
  }

  @PostMapping("/substance/create")
  public ResponseEntity<SubstanceEntryBean> createSubstanceEntry(@RequestBody SubstanceEntryBean substanceEntryBean) throws Exception {
    return ResponseEntity.ok(substanceInventoryService.createSubstanceEntry(substanceEntryBean));
  }

  @GetMapping("/substance/all")
  public ResponseEntity<List<SubstanceEntryBean>> getAllSubstanceEntries() {
    return ResponseEntity.ok(substanceInventoryService.getAllSubstanceEntries());
  }

  @PatchMapping("/substance/{id}/")
  public ResponseEntity<SubstanceEntryBean> patchSubstanceEntry(@PathVariable Long id, @RequestBody SubstanceEntryBean substanceEntryBean) throws Exception {
    SubstanceEntryBean updatedBean = substanceInventoryService.patchSubstanceEntry(id, substanceEntryBean);
    if (updatedBean == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(updatedBean);
  }

  @GetMapping("/substance/{id}/")
  public ResponseEntity<SubstanceEntryBean> getSubstanceEntryById(@PathVariable Long id) throws Exception {
    SubstanceEntryBean bean = substanceInventoryService.getSubstanceEntryById(id);
    if (bean == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(bean);
  }

  @DeleteMapping("/substance/{id}/")
  public ResponseEntity<Boolean> deleteSubstanceEntryById(@PathVariable Long id) throws Exception {
    return ResponseEntity.ok(substanceInventoryService.deleteSubstanceEntryById(id));
  }

}
