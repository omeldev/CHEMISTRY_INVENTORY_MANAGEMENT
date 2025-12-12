package dev.omel.backend.worker;

import dev.omel.backend.bean.ExperimentBean;
import dev.omel.backend.bean.ExperimentReactantBean;
import dev.omel.backend.entity.ExperimentEntity;
import dev.omel.backend.entity.ExperimentReactantEntity;
import dev.omel.backend.entity.SubstanceEntryEntity;
import dev.omel.backend.repository.ExperimentReactantRepository;
import dev.omel.backend.repository.ExperimentRepository;
import dev.omel.backend.repository.SubstanceEntryRepository;
import dev.omel.backend.type.Unit;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component
public class ExperimentWorker {
  private final ExperimentRepository experimentRepository;
  private final ExperimentReactantRepository experimentReactantRepository;
  private final SubstanceEntryRepository substanceEntryRepository;

  public ExperimentWorker(ExperimentRepository experimentRepository, ExperimentReactantRepository experimentReactantRepository, SubstanceEntryRepository substanceEntryRepository) {
    this.experimentRepository = experimentRepository;
    this.experimentReactantRepository = experimentReactantRepository;
    this.substanceEntryRepository = substanceEntryRepository;
  }


  public ExperimentBean createExperiment(String name, String note, List<ExperimentReactantBean> reactants) {

    ExperimentEntity entity = new ExperimentEntity();
    entity.setTitle(name);
    entity.setNote(note);
    entity.setCreated(new Date(System.currentTimeMillis()));
    entity.setFinalized(false);

    List<ExperimentReactantEntity> reactantEntities = reactants.stream().map(reactantBean -> {

      ExperimentReactantEntity reactantEntity = new ExperimentReactantEntity();
      reactantEntity.setQuantity(reactantBean.quantity());
      reactantEntity.setUnit(reactantBean.unit());

      var substanceOpt = substanceEntryRepository.findById(reactantBean.substanceEntryId());
      if (substanceOpt.isEmpty()) {
        throw new IllegalArgumentException("Substance entry with ID " + reactantBean.substanceEntryId() + " does not exist");
      }

      reactantEntity.setInventorySubstance(substanceOpt.get());
      reactantEntity.setExperiment(entity);  // link child → parent

      return reactantEntity;
    }).toList();

    // link parent → children
    entity.setReactants(reactantEntities);

    // save only parent; cascade handles children
    experimentRepository.save(entity);

    return ExperimentBean.from(entity);
  }


  public ExperimentBean getExperiment(long id) {
    ExperimentEntity entity = experimentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Experiment with ID " + id + " does not exist"));
    return ExperimentBean.from(entity);
  }

  public boolean finalizeExperiment(long id) {
    if (experimentRepository.findById(id).isEmpty()) {
      throw new IllegalArgumentException("Experiment with ID " + id + " does not exist");
    }


    ExperimentEntity entity = experimentRepository.findById(id).get();

    for (ExperimentReactantEntity reactant : entity.getReactants()) {
      SubstanceEntryEntity substanceEntry = reactant.getInventorySubstance();
      Unit reactantUnit = reactant.getUnit();
      Unit entryUnit = substanceEntry.getUnit();

      double baseReactant = reactantUnit.toBase(reactant.getQuantity());
      double baseEntry = entryUnit.toBase(substanceEntry.getQuantityBase());

      if (baseEntry < baseReactant) {
        throw new IllegalArgumentException("Not enough quantity of substance entry ID " + substanceEntry.getId());
      }

      double newBaseQuantity = baseEntry - baseReactant;

      substanceEntry.setQuantityBase(newBaseQuantity);

      substanceEntryRepository.save(substanceEntry);
    }
    return true;
  }

  public List<ExperimentBean> getExperiments() {
    return experimentRepository.findAll().stream().map(ExperimentBean::from).toList();
  }

}
