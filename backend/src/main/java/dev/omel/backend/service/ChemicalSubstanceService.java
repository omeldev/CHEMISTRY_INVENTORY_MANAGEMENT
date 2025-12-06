package dev.omel.backend.service;

import dev.omel.backend.bean.ChemicalSubstanceBean;

import java.util.List;

public interface ChemicalSubstanceService {

  ChemicalSubstanceBean createChemicalSubstance(ChemicalSubstanceBean chemicalSubstanceBean) throws Exception;
  List<ChemicalSubstanceBean> getAllChemicalSubstances();
}
