package dev.omel.backend.service.impl;

import dev.omel.backend.bean.ExperimentBean;
import dev.omel.backend.bean.ExperimentReactantBean;
import dev.omel.backend.service.ExperimentService;
import dev.omel.backend.worker.ExperimentWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperimentServiceImpl implements ExperimentService {

  private final ExperimentWorker experimentWorker;

  public ExperimentServiceImpl(ExperimentWorker experimentWorker) {
    this.experimentWorker = experimentWorker;
  }

  @Override
  @Transactional
  public ExperimentBean createExperiment(String name, String note, List<ExperimentReactantBean> reactants) {
    return experimentWorker.createExperiment(name, note, reactants);
  }

  @Override
  public ExperimentBean getExperiment(long id) {
    return experimentWorker.getExperiment(id);
  }

  @Override
  @Transactional
  public boolean finalizeExperiment(long id) {
    return experimentWorker.finalizeExperiment(id);
  }

  @Override
  public List<ExperimentBean> getAllExperiments() {
    return experimentWorker.getExperiments();
  }
}
