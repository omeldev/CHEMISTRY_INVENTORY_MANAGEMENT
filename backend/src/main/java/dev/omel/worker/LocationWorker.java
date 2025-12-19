package dev.omel.worker;

import dev.omel.bean.LocationBean;
import dev.omel.entity.LocationEntity;
import dev.omel.repository.LocationRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LocationWorker {

  private final LocationRepository locationRepository;

  public LocationWorker(LocationRepository locationRepository) {
    this.locationRepository = locationRepository;
  }

  public LocationBean getLocation(Long id) {
    return locationRepository.findById(id)
      .map(LocationBean::from)
      .orElse(null);
  }

  public List<LocationBean> getLocations() {
    return locationRepository.findAll()
      .stream()
      .map(LocationBean::from)
      .toList();
  }

  public LocationBean createLocation(String name) {
    if (locationRepository.findByName(name).isPresent()) {
      return null;
    }
    LocationEntity entity = new LocationEntity();
    entity.setName(name);
    locationRepository.save(entity);
    return LocationBean.from(entity);
  }

  public LocationBean updateLocation(Long id, String name) {
    LocationEntity entity = locationRepository.findById(id).orElse(null);
    if (entity == null) {
      return null;
    }
    entity.setName(name);
    locationRepository.save(entity);
    return LocationBean.from(entity);
  }
}
