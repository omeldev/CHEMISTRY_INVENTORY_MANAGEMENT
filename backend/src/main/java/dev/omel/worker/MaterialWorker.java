package dev.omel.worker;

import dev.omel.bean.MaterialBean;
import dev.omel.entity.MaterialEntity;
import dev.omel.repository.LabwareRepository;
import dev.omel.repository.MaterialRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MaterialWorker {

  private final MaterialRepository materialRepository;
  private final LabwareRepository labwareRepository;

  public MaterialWorker(MaterialRepository materialRepository, LabwareRepository labwareRepository) {
    this.materialRepository = materialRepository;
    this.labwareRepository = labwareRepository;
  }

  public MaterialBean getMaterialById(Long id) {
    return materialRepository.findById(id)
      .map(MaterialBean::from)
      .orElse(null);
  }

  public List<MaterialBean> getMaterials() {
    return materialRepository.findAll()
      .stream()
      .map(MaterialBean::from)
      .toList();
  }

  public MaterialBean createMaterial(MaterialBean materialBean) {
    if (materialRepository.findByName(materialBean.name()) != null) {
      return null;
    }
    MaterialEntity entity = new MaterialEntity();
    entity.setName(materialBean.name());
    materialRepository.save(entity);
    return MaterialBean.from(entity);
  }

  public MaterialBean updateMaterial(Long id, MaterialBean materialBean) {
    MaterialEntity entity = materialRepository.findById(id).orElse(null);
    if (entity == null) {
      return null;
    }
    entity.setName(materialBean.name());
    materialRepository.save(entity);
    return MaterialBean.from(entity);
  }

  public Boolean deleteMaterial(Long id) {
    if (!materialRepository.existsById(id)) {
      return false;
    }
    labwareRepository.findAll().forEach(labware -> {
      if (labware.getMaterial() != null && labware.getMaterial().getId().equals(id)) {
        labware.setMaterial(null);
        labwareRepository.save(labware);
      }
    });

    materialRepository.deleteById(id);
    return true;
  }
}
