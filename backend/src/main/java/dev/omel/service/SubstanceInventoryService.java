package dev.omel.service;

import dev.omel.bean.SubstanceEntryBean;

import java.util.List;

public interface SubstanceInventoryService {
  SubstanceEntryBean createSubstanceEntry(SubstanceEntryBean substanceEntryBean) throws Exception;

  List<SubstanceEntryBean> getAllSubstanceEntries();

  SubstanceEntryBean patchSubstanceEntry(Long id, SubstanceEntryBean substanceEntryBean) throws Exception;

  SubstanceEntryBean getSubstanceEntryById(Long id) throws Exception;

  boolean deleteSubstanceEntryById(Long id) throws Exception;
}
