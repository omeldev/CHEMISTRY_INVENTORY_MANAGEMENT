package dev.omel.backend.service.impl;

import dev.omel.backend.bean.SubstanceBean;
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
  public SubstanceBean createChemicalSubstance(SubstanceBean substanceBean) throws Exception {
    return chemicalSubstanceWorker.createSubstance(substanceBean);
  }

  @Override
  public List<SubstanceBean> getAllChemicalSubstances() {
    return chemicalSubstanceWorker.getAllChemicalSubstances();
  }

  @Override
  @Transactional
  public SubstanceBean patchChemicalSubstance(Long id, SubstanceBean substanceBean) throws Exception {
    return chemicalSubstanceWorker.patchChemicalSubstance(id, substanceBean);
  }

  @Override
  public SubstanceBean getChemicalSubstanceById(Long id) throws Exception {
    return chemicalSubstanceWorker.getChemicalSubstanceById(id);
  }
}
