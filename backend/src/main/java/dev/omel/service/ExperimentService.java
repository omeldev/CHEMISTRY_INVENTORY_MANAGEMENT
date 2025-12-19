package dev.omel.service;

import dev.omel.bean.ExperimentBean;
import dev.omel.bean.ExperimentReactantBean;

import java.util.List;

public interface ExperimentService {

  ExperimentBean createExperiment(String name, String note, List<ExperimentReactantBean> reactants);

  ExperimentBean getExperiment(long id);

  boolean finalizeExperiment(long id);

  List<ExperimentBean> getAllExperiments();


}
