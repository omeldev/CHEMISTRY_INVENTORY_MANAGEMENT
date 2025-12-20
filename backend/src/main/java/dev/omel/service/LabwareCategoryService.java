package dev.omel.service;

import dev.omel.bean.LabwareCategoryBean;

import java.util.List;

public interface LabwareCategoryService {

  LabwareCategoryBean createLabwareCategory(LabwareCategoryBean labwareCategoryBean);

  LabwareCategoryBean updateLabwareCategory(Long id, LabwareCategoryBean labwareCategoryBean);

  Boolean deleteLabwareCategory(Long id);

  List<LabwareCategoryBean> getLabwareCategories();

  LabwareCategoryBean getLabwareCategory(Long id);
}
