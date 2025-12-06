package dev.omel.backend.controller;

import dev.omel.backend.bean.SubstanceBean;
import dev.omel.backend.service.ChemicalSubstanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/substance")
public class SubstanceController {

  private final ChemicalSubstanceService chemicalSubstanceService;

  public SubstanceController(ChemicalSubstanceService chemicalSubstanceService) {
    this.chemicalSubstanceService = chemicalSubstanceService;
  }

  @PostMapping("/create")
  public ResponseEntity<SubstanceBean> createChemicalSubstance(@RequestBody SubstanceBean substanceBean) throws Exception {

    return ResponseEntity.ok(chemicalSubstanceService.createChemicalSubstance(substanceBean));
  }

  @GetMapping("/all")
  public ResponseEntity<List<SubstanceBean>> getAllChemicalSubstances() {
    return ResponseEntity.ok(chemicalSubstanceService.getAllChemicalSubstances());
  }

  @PatchMapping("/{id}/")
  public ResponseEntity<SubstanceBean> patchChemicalSubstance(@PathVariable Long id, @RequestBody SubstanceBean substanceBean) throws Exception {
    SubstanceBean updatedBean = chemicalSubstanceService.patchChemicalSubstance(id, substanceBean);
    if (updatedBean == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(updatedBean);
  }

  @GetMapping("/{id}/")
  public ResponseEntity<SubstanceBean> getChemicalSubstanceById(@PathVariable Long id) throws Exception {
    SubstanceBean bean = chemicalSubstanceService.getChemicalSubstanceById(id);
    if (bean == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(bean);
  }
}
