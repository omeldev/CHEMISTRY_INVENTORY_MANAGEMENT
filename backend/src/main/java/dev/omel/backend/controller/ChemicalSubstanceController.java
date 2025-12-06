package dev.omel.backend.controller;

import dev.omel.backend.bean.ChemicalSubstanceBean;
import dev.omel.backend.service.ChemicalSubstanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/substance")
public class ChemicalSubstanceController {

  private final ChemicalSubstanceService chemicalSubstanceService;

  public ChemicalSubstanceController(ChemicalSubstanceService chemicalSubstanceService) {
    this.chemicalSubstanceService = chemicalSubstanceService;
  }

  @PostMapping("/create")
  public ResponseEntity<ChemicalSubstanceBean> createChemicalSubstance(@RequestBody ChemicalSubstanceBean chemicalSubstanceBean) throws Exception {

    return ResponseEntity.ok(chemicalSubstanceService.createChemicalSubstance(chemicalSubstanceBean));
  }

  @GetMapping("/all")
  public ResponseEntity<List<ChemicalSubstanceBean>> getAllChemicalSubstances() {
    return ResponseEntity.ok(chemicalSubstanceService.getAllChemicalSubstances());
  }
}
