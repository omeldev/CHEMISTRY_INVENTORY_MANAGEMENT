package dev.omel.controller;

import dev.omel.bean.LocationBean;
import dev.omel.service.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

  private final LocationService locationService;

  public LocationController(LocationService locationService) {
    this.locationService = locationService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<LocationBean> getLocation(@PathVariable Long id) {
    LocationBean locationBean = locationService.getLocationById(id);
    return ResponseEntity.ok(locationBean);
  }

  @PostMapping
  public ResponseEntity<LocationBean> createLocation(@RequestBody LocationBean locationBean) {
    LocationBean createdLocation = locationService.createLocation(locationBean.name());
    return ResponseEntity.ok(createdLocation);
  }

  @GetMapping
  public ResponseEntity<List<LocationBean>> getAllLocations() {
    List<LocationBean> locations = locationService.getLocations();
    return ResponseEntity.ok(locations);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<LocationBean> updateLocation(@PathVariable Long id, @RequestBody LocationBean locationBean) {
    LocationBean updatedLocation = locationService.updateLocation(id, locationBean.name());
    return ResponseEntity.ok(updatedLocation);
  }
}
