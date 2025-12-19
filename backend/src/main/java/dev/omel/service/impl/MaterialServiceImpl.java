package dev.omel.service.impl;

import dev.omel.bean.MaterialBean;
import dev.omel.service.MaterialService;
import dev.omel.worker.MaterialWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

  private final MaterialWorker materialWorker;

  public MaterialServiceImpl(MaterialWorker materialWorker) {
    this.materialWorker = materialWorker;
  }

  @Override
  @Transactional
  public MaterialBean createMaterial(MaterialBean materialBean) {
    return materialWorker.createMaterial(materialBean);
  }

  @Override
  @Transactional
  public MaterialBean updateMaterial(Long id, MaterialBean materialBean) {
    return materialWorker.updateMaterial(id, materialBean);
  }

  @Override
  public MaterialBean getMaterialById(Long id) {
    return materialWorker.getMaterialById(id);
  }

  @Override
  public List<MaterialBean> getMaterials() {
    return materialWorker.getMaterials();
  }

  @Override
  @Transactional
  public Boolean deleteMaterial(Long id) {
    return materialWorker.deleteMaterial(id);
  }
}
