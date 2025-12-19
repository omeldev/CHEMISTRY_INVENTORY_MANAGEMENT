package dev.omel.service.impl;

import dev.omel.bean.LocationBean;
import dev.omel.service.LocationService;
import dev.omel.worker.LocationWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {
  private final LocationWorker locationWorker;

  public LocationServiceImpl(LocationWorker locationWorker) {
    this.locationWorker = locationWorker;
  }

  @Override
  public LocationBean getLocationById(Long id) {
    return locationWorker.getLocation(id);
  }

  @Override
  public List<LocationBean> getLocations() {
    return locationWorker.getLocations();
  }

  @Override
  @Transactional
  public LocationBean createLocation(String name) {
    return locationWorker.createLocation(name);
  }

  @Override
  @Transactional
  public LocationBean updateLocation(Long id, String name) {
    return locationWorker.updateLocation(id, name);
  }
}
