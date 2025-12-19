package dev.omel.worker;

import dev.omel.bean.SubstanceEntryBean;
import dev.omel.entity.LocationEntity;
import dev.omel.entity.SubstanceEntity;
import dev.omel.entity.SubstanceEntryEntity;
import dev.omel.repository.LocationRepository;
import dev.omel.repository.SubstanceEntryRepository;
import dev.omel.repository.SubstanceRepository;
import dev.omel.repository.SupplierRepository;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
public class SubstanceInventoryWorker {

  private final SubstanceRepository substanceRepository;
  private final SubstanceEntryRepository substanceEntryRepository;
  private final SupplierRepository supplierRepository;
  private final LocationRepository locationRepository;

  public SubstanceInventoryWorker(SubstanceRepository substanceRepository, SubstanceEntryRepository substanceEntryRepository, SupplierRepository supplierRepository, LocationRepository locationRepository) {
    this.substanceRepository = substanceRepository;
    this.substanceEntryRepository = substanceEntryRepository;
    this.supplierRepository = supplierRepository;
    this.locationRepository = locationRepository;
  }

  public SubstanceEntryBean createInventoryEntry(SubstanceEntryBean substanceEntryBean) {

    if (substanceEntryBean.id() != null) {
      if (substanceEntryRepository.findById(substanceEntryBean.id()).isPresent()) return null;
    }
    if (!substanceRepository.findById(substanceEntryBean.chemicalSubstanceId()).isPresent()) return null;


    SubstanceEntryEntity entity = new SubstanceEntryEntity();
    SubstanceEntity substance = substanceRepository.findById(substanceEntryBean.chemicalSubstanceId()).get();

    entity.setSubstance(substance);

    LocationEntity location = locationRepository.findByName(substanceEntryBean.location()).orElse(new LocationEntity());
    if (location.getName() == null) {
      location.setName(substanceEntryBean.location());
      locationRepository.save(location);
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

    if (substanceEntryBean.chemicalSubstanceId() != null) {
      if (!substanceRepository.findById(substanceEntryBean.chemicalSubstanceId()).isPresent()) return null;
      SubstanceEntity substance = substanceRepository.findById(substanceEntryBean.chemicalSubstanceId()).get();
      entity.setSubstance(substance);
    }

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
      LocationEntity location = locationRepository.findByName(substanceEntryBean.location())
        .orElse(new LocationEntity());
      if (location.getName() == null) {
        location.setName(substanceEntryBean.location());
        locationRepository.save(location);
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
