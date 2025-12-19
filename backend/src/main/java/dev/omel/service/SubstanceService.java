package dev.omel.service;

import dev.omel.bean.SubstanceBean;

import java.util.List;

public interface SubstanceService {

  SubstanceBean createChemicalSubstance(SubstanceBean substanceBean) throws Exception;

  List<SubstanceBean> getAllChemicalSubstances();

  SubstanceBean patchChemicalSubstance(Long id, SubstanceBean substanceBean) throws Exception;

  SubstanceBean getChemicalSubstanceById(Long id) throws Exception;

}
