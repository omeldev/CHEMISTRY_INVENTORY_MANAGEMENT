package dev.omel.backend.service.impl;

import dev.omel.backend.bean.ChemicalSubstanceBean;
import dev.omel.backend.service.ChemicalSubstanceService;
import dev.omel.backend.worker.ChemicalSubstanceWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChemicalSubstanceServiceImpl implements ChemicalSubstanceService {

  private final ChemicalSubstanceWorker chemicalSubstanceWorker;

  public ChemicalSubstanceServiceImpl(ChemicalSubstanceWorker chemicalSubstanceWorker) {
    this.chemicalSubstanceWorker = chemicalSubstanceWorker;
  }

  @Override
  @Transactional
  public ChemicalSubstanceBean createChemicalSubstance(ChemicalSubstanceBean chemicalSubstanceBean) throws Exception {
    return chemicalSubstanceWorker.createSubstance(chemicalSubstanceBean);
  }

  @Override
  public List<ChemicalSubstanceBean> getAllChemicalSubstances() {
    return chemicalSubstanceWorker.getAllChemicalSubstances();
  }
}
