export enum LabwareCondition {
  NEW = 'NEW',            // Neu, unbenutzt
  OK = 'OK',              // Voll funktionsfähig
  WORN = 'WORN',          // Gebrauchsspuren, aber sicher nutzbar
  DAMAGED = 'DAMAGED',    // Beschädigt (z.B. Absplitterung)
  LEAKING = 'LEAKING',    // Undicht (kritisch bei Flüssigkeiten)
  CONTAMINATED = 'CONTAMINATED', // Chemisch kontaminiert
  BROKEN = 'BROKEN',      // Zerbrochen / nicht mehr nutzbar
  DECOMMISSIONED = 'DECOMMISSIONED' // Ausgemustert / entsorgt
}
