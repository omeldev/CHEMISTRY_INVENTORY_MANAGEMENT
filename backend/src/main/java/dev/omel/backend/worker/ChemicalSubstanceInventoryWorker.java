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

@Component
public class ChemicalSubstanceInventoryWorker {

  private final SubstanceRepository substanceRepository;
  private final SubstanceEntryRepository substanceEntryRepository;
  private final SubstanceSupplierRepository substanceSupplierRepository;
  private final SubstanceLocationRepository substanceLocationRepository;

  public ChemicalSubstanceInventoryWorker(SubstanceRepository substanceRepository, SubstanceEntryRepository substanceEntryRepository, SubstanceSupplierRepository substanceSupplierRepository, SubstanceLocationRepository substanceLocationRepository) {
    this.substanceRepository = substanceRepository;
    this.substanceEntryRepository = substanceEntryRepository;
    this.substanceSupplierRepository = substanceSupplierRepository;
    this.substanceLocationRepository = substanceLocationRepository;
  }

  public SubstanceEntryBean createInventoryEntry(SubstanceEntryBean substanceEntryBean) {
    if (substanceEntryRepository.findById(substanceEntryBean.id()).isPresent()) return null;
    if (!substanceRepository.findById(substanceEntryBean.chemicalSubstanceId()).isPresent()) return null;


    SubstanceEntryEntity entity = new SubstanceEntryEntity();
    SubstanceEntity substance = substanceRepository.findById(substanceEntryBean.chemicalSubstanceId()).get();

    entity.setSubstance(substance);

    SubstanceLocationEntity location = substanceLocationRepository.findById(substanceEntryBean.chemicalSubstanceId()).orElse(new SubstanceLocationEntity());
    if (location.getLocation() == null) {
      location.setLocation(substanceEntryBean.location());
      substanceLocationRepository.save(location);
    }

    entity.setLocation(location);

    entity.setQuantity(substanceEntryBean.quantity());
    entity.setPurity(substanceEntryBean.purity());
    entity.setNote(substanceEntryBean.note());
    substanceEntryRepository.save(entity);

    return SubstanceEntryBean.from(entity);
  }
}
