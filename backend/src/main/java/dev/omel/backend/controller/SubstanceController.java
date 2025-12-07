package dev.omel.backend.controller;

import dev.omel.backend.bean.SubstanceBean;
import dev.omel.backend.service.SubstanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/substance")
public class SubstanceController {

  private final SubstanceService substanceService;

  public SubstanceController(SubstanceService substanceService) {
    this.substanceService = substanceService;
  }

  @PostMapping("/create")
  public ResponseEntity<SubstanceBean> createChemicalSubstance(@RequestBody SubstanceBean substanceBean) throws Exception {

    return ResponseEntity.ok(substanceService.createChemicalSubstance(substanceBean));
  }

  @GetMapping("/all")
  public ResponseEntity<List<SubstanceBean>> getAllChemicalSubstances() {
    return ResponseEntity.ok(substanceService.getAllChemicalSubstances());
  }

  @PatchMapping("/{id}/")
  public ResponseEntity<SubstanceBean> patchChemicalSubstance(@PathVariable Long id, @RequestBody SubstanceBean substanceBean) throws Exception {
    SubstanceBean updatedBean = substanceService.patchChemicalSubstance(id, substanceBean);
    if (updatedBean == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(updatedBean);
  }

  @GetMapping("/{id}/")
  public ResponseEntity<SubstanceBean> getChemicalSubstanceById(@PathVariable Long id) throws Exception {
    SubstanceBean bean = substanceService.getChemicalSubstanceById(id);
    if (bean == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(bean);
  }
}
