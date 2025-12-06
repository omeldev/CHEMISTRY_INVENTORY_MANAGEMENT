package dev.omel.backend.service;

import dev.omel.backend.bean.SubstanceBean;

import java.util.List;

public interface ChemicalSubstanceService {

  SubstanceBean createChemicalSubstance(SubstanceBean substanceBean) throws Exception;

  List<SubstanceBean> getAllChemicalSubstances();

  SubstanceBean patchChemicalSubstance(Long id, SubstanceBean substanceBean) throws Exception;

  SubstanceBean getChemicalSubstanceById(Long id) throws Exception;

}
