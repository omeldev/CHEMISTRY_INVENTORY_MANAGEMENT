package dev.omel.service.impl;

import dev.omel.bean.LabwareCategoryBean;
import dev.omel.service.LabwareCategoryService;
import dev.omel.worker.LabwareCategoryWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabwareCategoryServiceImpl implements LabwareCategoryService {

  private final LabwareCategoryWorker labwareCategoryWorker;

  public LabwareCategoryServiceImpl(LabwareCategoryWorker labwareCategoryWorker) {
    this.labwareCategoryWorker = labwareCategoryWorker;
  }

  @Override
  @Transactional
  public LabwareCategoryBean createLabwareCategory(LabwareCategoryBean labwareCategoryBean) {
    return labwareCategoryWorker.createLabwareCategory(labwareCategoryBean);
  }

  @Override
  @Transactional
  public LabwareCategoryBean updateLabwareCategory(Long id, LabwareCategoryBean labwareCategoryBean) {
    return labwareCategoryWorker.updateLabwareCategory(id, labwareCategoryBean);
  }

  @Override
  @Transactional
  public Boolean deleteLabwareCategory(Long id) {
    return labwareCategoryWorker.deleteLabwareCategory(id);
  }

  @Override
  public List<LabwareCategoryBean> getLabwareCategories() {
    return labwareCategoryWorker.getLabwareCategories();
  }

  @Override
  public LabwareCategoryBean getLabwareCategory(Long id) {
    return labwareCategoryWorker.getLabwareCategory(id);
  }
}
