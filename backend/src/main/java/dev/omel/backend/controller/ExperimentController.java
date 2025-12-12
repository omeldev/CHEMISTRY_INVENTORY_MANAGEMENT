package dev.omel.backend.controller;

import dev.omel.backend.bean.ExperimentBean;
import dev.omel.backend.service.ExperimentService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/experiment")
public class ExperimentController {

  private final ExperimentService experimentService;

  public ExperimentController(ExperimentService experimentService) {
    this.experimentService = experimentService;
  }

  @PostMapping("/create")
  public ResponseEntity<ExperimentBean> createExperiment(@RequestBody ExperimentBean experimentBean) {
    return ResponseEntity.ok(experimentService.createExperiment(experimentBean.title(), experimentBean.note(), experimentBean.reactants()));
  }

  @GetMapping("/all")
  public ResponseEntity<Iterable<ExperimentBean>> getAllExperiments() {
    return ResponseEntity.ok(experimentService.getAllExperiments());
  }

  @PutMapping("/{id}/finalize")
  public ResponseEntity<Boolean> finalizeExperiment(@PathVariable Long id) {
    return ResponseEntity.ok(experimentService.finalizeExperiment(id));
  }

}
