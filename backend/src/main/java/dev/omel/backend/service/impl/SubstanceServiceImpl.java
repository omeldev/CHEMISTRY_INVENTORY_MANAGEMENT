package dev.omel.backend.service.impl;

import dev.omel.backend.bean.SubstanceBean;
import dev.omel.backend.service.SubstanceService;
import dev.omel.backend.worker.SubstanceWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubstanceServiceImpl implements SubstanceService {

  private final SubstanceWorker substanceWorker;

  public SubstanceServiceImpl(SubstanceWorker substanceWorker) {
    this.substanceWorker = substanceWorker;
  }

  @Override
  @Transactional
  public SubstanceBean createChemicalSubstance(SubstanceBean substanceBean) throws Exception {
    return substanceWorker.createSubstance(substanceBean);
  }

  @Override
  public List<SubstanceBean> getAllChemicalSubstances() {
    return substanceWorker.getAllChemicalSubstances();
  }

  @Override
  @Transactional
  public SubstanceBean patchChemicalSubstance(Long id, SubstanceBean substanceBean) throws Exception {
    return substanceWorker.patchChemicalSubstance(id, substanceBean);
  }

  @Override
  public SubstanceBean getChemicalSubstanceById(Long id) throws Exception {
    return substanceWorker.getChemicalSubstanceById(id);
  }
}
