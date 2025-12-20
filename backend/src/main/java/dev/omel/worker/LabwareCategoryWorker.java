package dev.omel.worker;

import dev.omel.bean.LabwareCategoryBean;
import dev.omel.entity.LabwareCategoryEntity;
import dev.omel.repository.LabwareCategoryRepository;
import dev.omel.repository.LabwareRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LabwareCategoryWorker {

  private final LabwareCategoryRepository labwareCategoryRepository;
  private final LabwareRepository labwareRepository;

  public LabwareCategoryWorker(LabwareCategoryRepository labwareCategoryRepository, LabwareRepository labwareRepository) {
    this.labwareCategoryRepository = labwareCategoryRepository;
    this.labwareRepository = labwareRepository;
  }

  public LabwareCategoryBean getLabwareCategory(long id) {
    return LabwareCategoryBean.from(labwareCategoryRepository.findById(id).orElseThrow(
      () -> new IllegalArgumentException("Labware category with id " + id + " not found"
      )));
  }

  public List<LabwareCategoryBean> getLabwareCategories() {
    return labwareCategoryRepository.findAll().stream()
      .map(LabwareCategoryBean::from)
      .toList();
  }

  public LabwareCategoryBean createLabwareCategory(LabwareCategoryBean categoryBean) {
    if (labwareRepository.findByName(categoryBean.name()) != null) {
      throw new IllegalArgumentException("Labware category with name " + categoryBean.name() + " already exists");
    }

    LabwareCategoryEntity categoryEntity = new LabwareCategoryEntity();
    categoryEntity.setName(categoryBean.name());
    labwareCategoryRepository.save(categoryEntity);
    return LabwareCategoryBean.from(categoryEntity);
  }

  public LabwareCategoryBean updateLabwareCategory(long id, LabwareCategoryBean categoryBean) {
    LabwareCategoryEntity categoryEntity = labwareCategoryRepository.findById(id).orElseThrow(
      () -> new IllegalArgumentException("Labware category with id " + id + " not found"
      ));

    categoryEntity.setName(categoryBean.name());
    labwareCategoryRepository.save(categoryEntity);

    return LabwareCategoryBean.from(categoryEntity);
  }

  public Boolean deleteLabwareCategory(long id) {

    labwareRepository.findAll().forEach(labware -> {
      if (labware.getLabwareCategoryEntity().getId().equals(id)) {
        labware.setLabwareCategoryEntity(null);
      }
    });

    if (!labwareCategoryRepository.existsById(id)) {
      throw new IllegalArgumentException("Labware category with id " + id + " not found");
    }

    labwareCategoryRepository.deleteById(id);

    return true;
  }


}
