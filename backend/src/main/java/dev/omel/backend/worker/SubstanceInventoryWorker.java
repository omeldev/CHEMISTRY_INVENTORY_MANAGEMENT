package dev.omel.backend.worker;

import dev.omel.backend.bean.SubstanceEntryBean;
import dev.omel.backend.entity.SubstanceEntity;
import dev.omel.backend.entity.SubstanceEntryEntity;
import dev.omel.backend.entity.SubstanceLocationEntity;
import dev.omel.backend.repository.SubstanceEntryRepository;
import dev.omel.backend.repository.SubstanceLocationRepository;
import dev.omel.backend.repository.SubstanceRepository;
import dev.omel.backend.repository.SubstanceSupplierRepository;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
public class SubstanceInventoryWorker {

  private final SubstanceRepository substanceRepository;
  private final SubstanceEntryRepository substanceEntryRepository;
  private final SubstanceSupplierRepository substanceSupplierRepository;
  private final SubstanceLocationRepository substanceLocationRepository;

  public SubstanceInventoryWorker(SubstanceRepository substanceRepository, SubstanceEntryRepository substanceEntryRepository, SubstanceSupplierRepository substanceSupplierRepository, SubstanceLocationRepository substanceLocationRepository) {
    this.substanceRepository = substanceRepository;
    this.substanceEntryRepository = substanceEntryRepository;
    this.substanceSupplierRepository = substanceSupplierRepository;
    this.substanceLocationRepository = substanceLocationRepository;
  }

  public SubstanceEntryBean createInventoryEntry(SubstanceEntryBean substanceEntryBean) {

    if (substanceEntryBean.id() != null) {
      if (substanceEntryRepository.findById(substanceEntryBean.id()).isPresent()) return null;
    }
    if (!substanceRepository.findById(substanceEntryBean.chemicalSubstanceId()).isPresent()) return null;


    SubstanceEntryEntity entity = new SubstanceEntryEntity();
    SubstanceEntity substance = substanceRepository.findById(substanceEntryBean.chemicalSubstanceId()).get();

    entity.setSubstance(substance);

    SubstanceLocationEntity location = substanceLocationRepository.findByLocation(substanceEntryBean.location()).orElse(new SubstanceLocationEntity());
    if (location.getLocation() == null) {
      location.setLocation(substanceEntryBean.location());
      substanceLocationRepository.save(location);
    }

    entity.setLocation(location);

    entity.setQuantityBase(substanceEntryBean.quantityBase());
    entity.setUnit(substanceEntryBean.unit());
    entity.setPurity(substanceEntryBean.purity());
    entity.setNote(substanceEntryBean.note());
    entity.setAddedAt(new Timestamp(System.currentTimeMillis()));
    entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
    substanceEntryRepository.save(entity);

    return SubstanceEntryBean.from(entity);
  }

  public List<SubstanceEntryBean> getAllSubstanceEntries() {
    return substanceEntryRepository.findAll().stream().map(SubstanceEntryBean::from).toList();
  }

  public SubstanceEntryBean patchInventoryEntry(Long id, SubstanceEntryBean substanceEntryBean) {
    if (!substanceEntryRepository.findById(id).isPresent()) return null;
    SubstanceEntryEntity entity = substanceEntryRepository.findById(id).get();

    if (substanceEntryBean.quantityBase() != 0) {
      entity.setQuantityBase(substanceEntryBean.quantityBase());
    }
    if (substanceEntryBean.unit() != null) {
      entity.setUnit(substanceEntryBean.unit());
    }
    if (substanceEntryBean.purity() != null) {
      entity.setPurity(substanceEntryBean.purity());
    }
    if (substanceEntryBean.note() != null) {
      entity.setNote(substanceEntryBean.note());
    }

    if (substanceEntryBean.location() != null) {
      SubstanceLocationEntity location = substanceLocationRepository.findByLocation(substanceEntryBean.location())
        .orElse(new SubstanceLocationEntity());
      if (location.getLocation() == null) {
        location.setLocation(substanceEntryBean.location());
        substanceLocationRepository.save(location);
      }
      entity.setLocation(location);
    }
    entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
    substanceEntryRepository.save(entity);

    return SubstanceEntryBean.from(entity);
  }

  public SubstanceEntryBean getSubstanceEntryById(Long id) {
    if (!substanceEntryRepository.findById(id).isPresent()) return null;
    SubstanceEntryEntity entity = substanceEntryRepository.findById(id).get();
    return SubstanceEntryBean.from(entity);
  }

  public boolean deleteSubstanceEntryById(Long id) {
    if (!substanceEntryRepository.findById(id).isPresent()) return false;
    substanceEntryRepository.deleteById(id);
    return true;
  }
}
