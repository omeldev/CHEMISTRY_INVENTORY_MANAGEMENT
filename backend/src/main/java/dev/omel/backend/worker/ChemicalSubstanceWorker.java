package dev.omel.backend.worker;

import dev.omel.backend.bean.ChemicalSubstanceBean;
import dev.omel.backend.bean.ChemicalSubstanceSupplierBean;
import dev.omel.backend.entity.ChemicalSubstanceEntity;
import dev.omel.backend.entity.ChemicalSubstanceSupplierEntity;
import dev.omel.backend.repository.ChemicalSubstanceEntryRepository;
import dev.omel.backend.repository.ChemicalSubstanceLocationRepository;
import dev.omel.backend.repository.ChemicalSubstanceRepository;
import dev.omel.backend.repository.ChemicalSubstanceSupplierRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChemicalSubstanceWorker {

  private final ChemicalSubstanceRepository chemicalSubstanceRepository;
  private final ChemicalSubstanceEntryRepository chemicalSubstanceEntryRepository;
  private final ChemicalSubstanceSupplierRepository chemicalSubstanceSupplierRepository;
  private final ChemicalSubstanceLocationRepository chemicalSubstanceLocationRepository;

  public ChemicalSubstanceWorker(ChemicalSubstanceRepository chemicalSubstanceRepository, ChemicalSubstanceEntryRepository chemicalSubstanceEntryRepository, ChemicalSubstanceSupplierRepository chemicalSubstanceSupplierRepository, ChemicalSubstanceLocationRepository chemicalSubstanceLocationRepository) {
    this.chemicalSubstanceRepository = chemicalSubstanceRepository;
    this.chemicalSubstanceEntryRepository = chemicalSubstanceEntryRepository;
    this.chemicalSubstanceSupplierRepository = chemicalSubstanceSupplierRepository;
    this.chemicalSubstanceLocationRepository = chemicalSubstanceLocationRepository;
  }


  public ChemicalSubstanceBean createSubstance(ChemicalSubstanceBean chemicalSubstanceBean) throws Exception {
    if(chemicalSubstanceRepository.findByName(chemicalSubstanceBean.name()).isPresent()) throw new Exception("Substance with this name already exists");

    ChemicalSubstanceSupplierEntity supplier = chemicalSubstanceSupplierRepository.findByName(chemicalSubstanceBean.supplier())
      .orElse(new ChemicalSubstanceSupplierEntity());

    if(supplier.getName() == null) {
      supplier.setName(chemicalSubstanceBean.supplier());
      chemicalSubstanceSupplierRepository.save(supplier);
    }

    ChemicalSubstanceEntity entity = new ChemicalSubstanceEntity();

    entity.setName(chemicalSubstanceBean.name());
    entity.setSupplier(supplier);
    entity.setMolecularFormula(chemicalSubstanceBean.molecularFormula());
    entity.setCasNumber(chemicalSubstanceBean.casNumber());

    chemicalSubstanceRepository.save(entity);

    return ChemicalSubstanceBean.from(entity);
  }

  public List<ChemicalSubstanceBean> getAllChemicalSubstances() {
    return chemicalSubstanceRepository.findAll().stream().map(ChemicalSubstanceBean::from).toList();
  }
}
