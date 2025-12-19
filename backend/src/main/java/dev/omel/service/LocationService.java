package dev.omel.service;

import dev.omel.bean.LocationBean;

import java.util.List;

public interface LocationService {
  LocationBean getLocationById(Long id);

  List<LocationBean> getLocations();

  LocationBean createLocation(String name);

  LocationBean updateLocation(Long id, String name);
}
