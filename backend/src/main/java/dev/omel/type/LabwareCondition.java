package dev.omel.type;

public enum LabwareCondition {

  NEW,            // Neu, unbenutzt
  OK,             // Voll funktionsfähig
  WORN,           // Gebrauchsspuren, aber sicher nutzbar

  DAMAGED,        // Beschädigt (z.B. Absplitterung)
  LEAKING,        // Undicht (kritisch bei Flüssigkeiten)
  CONTAMINATED,   // Chemisch kontaminiert

  BROKEN,         // Zerbrochen / nicht mehr nutzbar
  DECOMMISSIONED  // Ausgemustert / entsorgt
}
