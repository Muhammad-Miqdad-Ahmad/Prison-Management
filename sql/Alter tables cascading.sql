-- admin
-- Drop existing foreign key
ALTER TABLE Admins DROP CONSTRAINT admins_prision_id_fkey;

-- Add new foreign key with cascading deletes
ALTER TABLE Admins
ADD CONSTRAINT admins_prision_id_fkey
FOREIGN KEY (prision_id) REFERENCES Prisions(prision_id) ON DELETE CASCADE;


-- guard
-- Drop existing foreign key
ALTER TABLE Guards DROP CONSTRAINT guards_prision_id_fkey;

-- Add new foreign key with cascading deletes
ALTER TABLE Guards
ADD CONSTRAINT guards_prision_id_fkey
FOREIGN KEY (prision_id) REFERENCES Prisions(prision_id) ON DELETE CASCADE;


--prisoner table
-- Drop existing foreign key
ALTER TABLE Prisoner DROP CONSTRAINT prisoner_prision_id_fkey;

-- Add new foreign key with cascading deletes
ALTER TABLE Prisoner
ADD CONSTRAINT prisoner_prision_id_fkey
FOREIGN KEY (prision_id) REFERENCES Prisions(prision_id) ON DELETE CASCADE;


--visiting details
-- Drop existing foreign key
ALTER TABLE visitingDetails DROP CONSTRAINT visitingdetails_prision_id_fkey;

-- Add new foreign key with cascading deletes
ALTER TABLE visitingDetails
ADD CONSTRAINT visitingdetails_prision_id_fkey
FOREIGN KEY (prision_id) REFERENCES Prisions(prision_id) ON DELETE CASCADE;


-- visiting slots
-- Drop existing foreign key
ALTER TABLE visitingSlots DROP CONSTRAINT visitingslots_visiting_id_fkey;

-- Add new foreign key with cascading deletes
ALTER TABLE visitingSlots
ADD CONSTRAINT visitingslots_visiting_id_fkey
FOREIGN KEY (visiting_id) REFERENCES visitingDetails(visiting_id) ON DELETE CASCADE;


-- visiting reservations
-- Drop existing foreign keys
ALTER TABLE visitingReservations DROP CONSTRAINT visitingreservations_slot_id_fkey;
ALTER TABLE visitingReservations DROP CONSTRAINT visitingreservations_prisoner_id_fkey;

-- Add new foreign keys with cascading deletes
ALTER TABLE visitingReservations
ADD CONSTRAINT visitingreservations_slot_id_fkey
FOREIGN KEY (slot_id) REFERENCES visitingSlots(slot_id) ON DELETE CASCADE;

ALTER TABLE visitingReservations
ADD CONSTRAINT visitingreservations_prisoner_id_fkey
FOREIGN KEY (prisoner_id) REFERENCES Prisoner(prisoner_id) ON DELETE CASCADE;


-- medical records
-- Drop existing foreign key
ALTER TABLE Prisoner_Medical_Records DROP CONSTRAINT prisoner_medical_records_prisoner_id_fkey;

ALTER TABLE Prisoner_Medical_Records
ADD CONSTRAINT prisonermedicalrecords_prisoner_id_fkey
FOREIGN KEY (prisoner_id) REFERENCES Prisoner(prisoner_id) ON DELETE CASCADE;


-- incident reports
ALTER TABLE Incident_Reports DROP CONSTRAINT incidentreports_reported_by_guard_id_fkey;

ALTER TABLE Incident_Reports
ADD CONSTRAINT incidentreports_reported_by_guard_id_fkey
FOREIGN KEY (reported_by_guard_id) REFERENCES Guards(guard_id) ON DELETE CASCADE;

ALTER TABLE Incident_Reports DROP CONSTRAINT incidentreports_prisoner_involved_id_fkey;

ALTER TABLE Incident_Reports
ADD CONSTRAINT incidentreports_prisoner_involved_id_fkey
FOREIGN KEY (prisoner_involved_id) REFERENCES Prisoner(prisoner_id) ON DELETE CASCADE;

