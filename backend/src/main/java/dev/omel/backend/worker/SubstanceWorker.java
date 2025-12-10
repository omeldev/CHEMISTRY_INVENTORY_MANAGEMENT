package dev.omel.backend.worker;

import dev.omel.backend.bean.SubstanceBean;
import dev.omel.backend.entity.SubstanceEntity;
import dev.omel.backend.entity.SubstanceSupplierEntity;
import dev.omel.backend.repository.SubstanceRepository;
import dev.omel.backend.repository.SubstanceSupplierRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SubstanceWorker {

  private final SubstanceRepository substanceRepository;
  private final SubstanceSupplierRepository substanceSupplierRepository;


  public SubstanceWorker(SubstanceRepository substanceRepository, SubstanceSupplierRepository substanceSupplierRepository) {
    this.substanceRepository = substanceRepository;
    this.substanceSupplierRepository = substanceSupplierRepository;
  }


  public SubstanceBean createSubstance(SubstanceBean substanceBean) throws Exception {
    if (substanceRepository.findByName(substanceBean.name()).isPresent())
      throw new Exception("Substance with this name already exists");

    if (substanceBean.name().trim().isEmpty())
      throw new Exception("Substance name cannot be empty");

    if (substanceBean.nfpaFlammability() != null) {
      if (substanceBean.nfpaFlammability() < 0 || substanceBean.nfpaFlammability() > 4) {
        throw new IllegalArgumentException("NFPA Flammability rating must be between 0 and 4");
      }
    }

    if (substanceBean.nfpaHealth() != null) {
      if (substanceBean.nfpaHealth() < 0 || substanceBean.nfpaHealth() > 4) {
        throw new IllegalArgumentException("NFPA Health rating must be between 0 and 4");
      }
    }

    if (substanceBean.nfpaReactivity() != null) {
      if (substanceBean.nfpaReactivity() < 0 || substanceBean.nfpaReactivity() > 4) {
        throw new IllegalArgumentException("NFPA Reactivity rating must be between 0 and 4");
      }
    }

    SubstanceSupplierEntity supplier = substanceSupplierRepository.findByName(substanceBean.supplier())
      .orElse(new SubstanceSupplierEntity());

    if (supplier.getName() == null) {
      supplier.setName(substanceBean.supplier());
      substanceSupplierRepository.save(supplier);
    }

    SubstanceEntity entity = new SubstanceEntity();

    entity.setName(substanceBean.name());
    entity.setSupplier(supplier);
    entity.setMolecularFormula(substanceBean.molecularFormula());
    entity.setCasNumber(substanceBean.casNumber());
    entity.setNfpa704Health(substanceBean.nfpaHealth());
    entity.setNfpa704Flammability(substanceBean.nfpaFlammability());
    entity.setNfpa704Reactivity(substanceBean.nfpaReactivity());

    if (substanceBean.nfpaSpecifiedHazard() != null) {
      entity.setNfpa704SpecifiedHazard(substanceBean.nfpaSpecifiedHazard());
    }


    substanceRepository.save(entity);

    return SubstanceBean.from(entity);
  }

  public List<SubstanceBean> getAllChemicalSubstances() {
    return substanceRepository.findAll().stream().map(SubstanceBean::from).toList();
  }

  public SubstanceBean patchChemicalSubstance(Long id, SubstanceBean substanceBean) {
    if (!substanceRepository.findById(id).isPresent()) return null;
    SubstanceEntity entity = substanceRepository.findById(id).get();

    if (substanceBean.name().trim().isEmpty()) throw new IllegalArgumentException("Substance name cannot be empty");

    if (substanceBean.name() != null) {
      entity.setName(substanceBean.name());
    }

    if (substanceBean.molecularFormula() != null) {
      entity.setMolecularFormula(substanceBean.molecularFormula());
    }
    if (substanceBean.casNumber() != null) {
      entity.setCasNumber(substanceBean.casNumber());
    }
    if (substanceBean.supplier() != null) {
      SubstanceSupplierEntity supplier = substanceSupplierRepository.findByName(substanceBean.supplier())
        .orElse(new SubstanceSupplierEntity());

      if (supplier.getName() == null) {
        supplier.setName(substanceBean.supplier());
        substanceSupplierRepository.save(supplier);
      }
      entity.setSupplier(supplier);
    }
    if (substanceBean.nfpaHealth() != null) {
      if (substanceBean.nfpaHealth() < 0 || substanceBean.nfpaHealth() > 4) {
        throw new IllegalArgumentException("NFPA Health rating must be between 0 and 4");
      }
      entity.setNfpa704Health(substanceBean.nfpaHealth());
    }
    if (substanceBean.nfpaFlammability() != null) {
      if (substanceBean.nfpaFlammability() < 0 || substanceBean.nfpaFlammability() > 4) {
        throw new IllegalArgumentException("NFPA Flammability rating must be between 0 and 4");
      }
      entity.setNfpa704Flammability(substanceBean.nfpaFlammability());
    }
    if (substanceBean.nfpaReactivity() != null) {
      if (substanceBean.nfpaReactivity() < 0 || substanceBean.nfpaReactivity() > 4) {
        throw new IllegalArgumentException("NFPA Reactivity rating must be between 0 and 4");
      }
      entity.setNfpa704Reactivity(substanceBean.nfpaReactivity());
    }
    if (substanceBean.nfpaSpecifiedHazard() != null) {
      entity.setNfpa704SpecifiedHazard(substanceBean.nfpaSpecifiedHazard());
    }

    substanceRepository.save(entity);
    return SubstanceBean.from(entity);
  }

  public SubstanceBean getChemicalSubstanceById(Long id) {
    if (!substanceRepository.findById(id).isPresent()) return null;
    SubstanceEntity entity = substanceRepository.findById(id).get();
    return SubstanceBean.from(entity);
  }
}
