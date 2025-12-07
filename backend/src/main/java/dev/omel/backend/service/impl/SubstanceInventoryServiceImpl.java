package dev.omel.backend.service.impl;

import dev.omel.backend.bean.SubstanceEntryBean;
import dev.omel.backend.service.SubstanceInventoryService;
import dev.omel.backend.worker.SubstanceInventoryWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubstanceInventoryServiceImpl implements SubstanceInventoryService {

  private final SubstanceInventoryWorker substanceInventoryWorker;

  public SubstanceInventoryServiceImpl(SubstanceInventoryWorker substanceInventoryWorker) {
    this.substanceInventoryWorker = substanceInventoryWorker;
  }

  @Override
  @Transactional
  public SubstanceEntryBean createSubstanceEntry(SubstanceEntryBean substanceEntryBean) throws Exception {
    return substanceInventoryWorker.createInventoryEntry(substanceEntryBean);
  }

  @Override
  public List<SubstanceEntryBean> getAllSubstanceEntries() {
    return substanceInventoryWorker.getAllSubstanceEntries();
  }

  @Override
  @Transactional
  public SubstanceEntryBean patchSubstanceEntry(Long id, SubstanceEntryBean substanceEntryBean) throws Exception {
    return substanceInventoryWorker.patchInventoryEntry(id, substanceEntryBean);
  }

  @Override
  public SubstanceEntryBean getSubstanceEntryById(Long id) throws Exception {
    return substanceInventoryWorker.getSubstanceEntryById(id);
  }

  @Override
  @Transactional
  public boolean deleteSubstanceEntryById(Long id) throws Exception {
    return substanceInventoryWorker.deleteSubstanceEntryById(id);
  }
}
