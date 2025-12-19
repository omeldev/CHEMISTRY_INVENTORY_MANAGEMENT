package dev.omel.service;

import dev.omel.bean.MaterialBean;

import java.util.List;

public interface MaterialService {
  MaterialBean createMaterial(MaterialBean materialBean);

  MaterialBean updateMaterial(Long id, MaterialBean materialBean);

  MaterialBean getMaterialById(Long id);

  List<MaterialBean> getMaterials();

  Boolean deleteMaterial(Long id);
}
