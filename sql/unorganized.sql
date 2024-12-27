-- Database: Prison

-- DROP DATABASE IF EXISTS "Prison";

CREATE DATABASE "Prison"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


	-- Step 1: Create a custom type for Person
CREATE TYPE Person AS (
    first_name VARCHAR,
    last_name VARCHAR,
    dob DATE,
    age INTEGER,
    nationality VARCHAR,
    gender VARCHAR
);

-- Table: Prisions
CREATE TABLE Prisions (
    prision_id SERIAL PRIMARY KEY,
    prision_name VARCHAR NOT NULL,
    prision_location VARCHAR NOT NULL
);

-- Table: Admins
CREATE TABLE Admins (
    admin_id SERIAL PRIMARY KEY,
    prision_id INTEGER REFERENCES Prisions(prision_id),
    admin_email VARCHAR UNIQUE NOT NULL,
    admin_password VARCHAR NOT NULL,
    access_level INTEGER NOT NULL
);



-- Table: Guards
CREATE TABLE Guards (
    guard_id SERIAL PRIMARY KEY,
    prision_id INTEGER REFERENCES Prisions(prision_id),
    person Person NOT NULL, -- Using the custom type
    joining_date DATE NOT NULL,
    shift VARCHAR NOT NULL,
    qr_code INTEGER NOT NULL
);


CREATE TABLE GuardAttendance (
    attendance_id SERIAL PRIMARY KEY,
    guard_id INTEGER REFERENCES Guards(guard_id),
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    qr_code VARCHAR(255) NOT NULL
);
ALTER TABLE Guards
ALTER COLUMN qr_code TYPE VARCHAR(255);

ALTER TABLE Guards
ADD COLUMN check_in_time TIMESTAMP;

ALTER TABLE Guards
ADD COLUMN check_out_time TIMESTAMP;
-- Table: Prisoner
CREATE TABLE Prisoner (
    prisoner_id SERIAL PRIMARY KEY,
    prision_id INTEGER REFERENCES Prisions(prision_id),
    person Person NOT NULL, -- Using the custom type
    sentence_start_date DATE NOT NULL,
    sentence_end_date DATE,
    prisoner_status VARCHAR(255) NOT NULL,
    visitor_1 INTEGER UNIQUE,
    visitor_2 INTEGER UNIQUE,
    sentence VARCHAR NOT NULL,
    crime VARCHAR NOT NULL
);

-- Table: visitingDetails
CREATE TABLE visitingDetails (
    visiting_id SERIAL PRIMARY KEY,
    prision_id INTEGER REFERENCES Prisions(prision_id),
    day_of_week VARCHAR NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Table: visitingSlots
CREATE TABLE visitingSlots (
    slot_id SERIAL PRIMARY KEY,
    visiting_id INTEGER REFERENCES visitingDetails(visiting_id),
    slot_time TIME NOT NULL,
    capacity INTEGER NOT NULL,
    current_visitor INTEGER DEFAULT 0
);

-- Table: visitingReservations

CREATE TABLE visitingReservations (
    reservation_id SERIAL PRIMARY KEY,
    slot_id INTEGER REFERENCES visitingSlots(slot_id),
    prisoner_id INTEGER REFERENCES Prisoner(prisoner_id),
    reservation_time TIME NOT NULL,
    visitor_id INTEGER NOT NULL,
    visit_date DATE NOT NULL
);

-- Table: Prisoner_Medical_Records
CREATE TABLE Prisoner_Medical_Records (
    record_id SERIAL PRIMARY KEY,
    prisoner_id INTEGER REFERENCES Prisoner(prisoner_id),
    checkup_date DATE NOT NULL,
    diagnosis TEXT NOT NULL,
    treatment TEXT NOT NULL,
    doctor_name VARCHAR NOT NULL,
    follow_up_date DATE,
    special_care_required BOOLEAN DEFAULT FALSE
);

CREATE TABLE Incident_Reports (
    incident_id SERIAL PRIMARY KEY,
    reported_by_guard_id INTEGER REFERENCES Guards(guard_id),
    prisoner_involved_id INTEGER REFERENCES Prisoner(prisoner_id),
    incident_date DATE NOT NULL,
    incident_time TIME NOT NULL,
    incident_description TEXT NOT NULL,
    action_taken TEXT,
    resolution_date DATE,
    additional_notes TEXT
);
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




-- Insert into Prisions
INSERT INTO Prisions (prision_name, prision_location)
VALUES 
('Central Jail Karachi', 'Karachi, Sindh'),
('Adiala Jail', 'Rawalpindi, Punjab'),
('Mach Jail', 'Mach, Balochistan');

-- Insert into Admins
INSERT INTO Admins (prision_id, admin_email, admin_password, access_level)
VALUES 
(NULL, 'admin_karachi@jail.pk', 'securepassword123', 1),
(1, 'assistant_admin_karachi@jail.pk', 'securepassword999', 2),
(2, 'admin_rawalpindi@jail.pk', 'securepassword456', 2),
(3, 'admin_mach@jail.pk', 'securepassword789', 2);

-- Insert into Guards
INSERT INTO Guards (prision_id, person, joining_date, shift, qr_code)
VALUES 
(1, ROW('Ali', 'Khan', '1985-01-15', 39, 'Pakistani', 'Male'), '2020-01-01', 'Morning', 12345),
(2, ROW('Ahmed', 'Raza', '1990-05-20', 34, 'Pakistani', 'Male'), '2019-05-15', 'Evening', 67890),
(3, ROW('Sara', 'Ali', '1992-09-10', 32, 'Pakistani', 'Female'), '2021-03-10', 'Night', 11223);

-- Insert into Prisoner
INSERT INTO Prisoner (prision_id, person, sentence_start_date, sentence_end_date, prisoner_status, visitor_1, visitor_2, sentence, crime)
VALUES 
(1, ROW('Riaz', 'Ahmed', '1985-07-20', 39, 'Pakistani', 'Male'), '2023-01-01', NULL, 'Active', 101, 102, '5 years', 'Theft'),
(2, ROW('Zainab', 'Riaz', '1993-04-15', 31, 'Pakistani', 'Female'), '2022-08-15', '2026-08-14', 'Active', 103, NULL, '4 years', 'Fraud'),
(3, ROW('Usman', 'Farooq', '1988-12-30', 35, 'Pakistani', 'Male'), '2021-09-10', '2024-09-09', 'Released', 104, NULL, '3 years', 'Assault'),
(1, ROW('Naveed', 'Hassan', '1983-02-11', 41, 'Pakistani', 'Male'), '2023-02-01', '2028-02-01', 'Active', 105, NULL, '5 years', 'Robbery'),
(1, ROW('Hamid', 'Ali', '1990-06-17', 34, 'Pakistani', 'Male'), '2021-05-20', '2026-05-19', 'Active', 106, 107, '5 years', 'Burglary'),
(1, ROW('Saima', 'Khan', '1995-12-03', 29, 'Pakistani', 'Female'), '2022-11-10', '2025-11-09', 'Active', NULL, NULL, '3 years', 'Forgery'),
(2, ROW('Ibrahim', 'Shah', '1987-08-15', 37, 'Pakistani', 'Male'), '2020-10-01', NULL, 'Active', 108, NULL, '10 years', 'Drug Trafficking'),
(2, ROW('Faisal', 'Riaz', '1992-03-25', 32, 'Pakistani', 'Male'), '2023-01-15', '2024-01-14', 'Active', 109, 110, '1 year', 'Assault'),
(2, ROW('Ayesha', 'Zafar', '1999-11-23', 25, 'Pakistani', 'Female'), '2021-06-12', '2026-06-11', 'Active', NULL, NULL, '5 years', 'Fraud'),
(3, ROW('Zubair', 'Iqbal', '1984-01-29', 40, 'Pakistani', 'Male'), '2018-09-14', '2028-09-13', 'Active', 111, NULL, '10 years', 'Kidnapping'),
(3, ROW('Hina', 'Faisal', '1997-05-10', 27, 'Pakistani', 'Female'), '2023-03-01', NULL, 'Active', NULL, NULL, '7 years', 'Embezzlement'),
(3, ROW('Salman', 'Nawaz', '1986-12-19', 37, 'Pakistani', 'Male'), '2022-07-20', '2024-07-19', 'Active', 112, NULL, '2 years', 'Cyber Crime');

-- Insert into visitingDetails
INSERT INTO visitingDetails (prision_id, day_of_week, start_time, end_time)
VALUES 
(1, 'Monday', '09:00:00', '17:00:00'),
(2, 'Wednesday', '10:00:00', '18:00:00'),
(3, 'Friday', '08:00:00', '16:00:00');

-- Insert into visitingSlots
INSERT INTO visitingSlots (visiting_id, slot_time, capacity)
VALUES 
(1, '10:00:00', 10),
(1, '14:00:00', 15),
(2, '11:00:00', 12),
(3, '09:00:00', 8),
(3, '13:00:00', 10);

-- Insert into visitingReservations
INSERT INTO visitingReservations (slot_id, prisoner_id, reservation_time, visitor_id, visit_date)
VALUES 
(1, 1, '10:00:00', 201, '2023-11-01'),
(2, 2, '14:00:00', 202, '2023-11-02'),
(3, 3, '11:00:00', 203, '2023-11-03');

-- Insert into Prisoner_Medical_Records
INSERT INTO Prisoner_Medical_Records (prisoner_id, checkup_date, diagnosis, treatment, doctor_name, follow_up_date, special_care_required)
VALUES 
(1, '2023-01-10', 'Fever', 'Paracetamol', 'Dr. Ahmed', '2023-01-20', FALSE),
(2, '2023-02-15', 'Diabetes', 'Insulin', 'Dr. Farooq', '2023-03-15', TRUE),
(3, '2023-03-10', 'Flu', 'Antibiotics', 'Dr. Zainab', NULL, FALSE);

-- Insert into Incident_Reports
INSERT INTO Incident_Reports (reported_by_guard_id, prisoner_involved_id, incident_date, incident_time, incident_description, action_taken, resolution_date, additional_notes)
VALUES 
(1, 1, '2023-06-01', '12:30:00', 'Prisoner attempted to escape', 'Increased surveillance', '2023-06-05', 'None'),
(2, 2, '2023-07-15', '15:00:00', 'Argument with guard', 'Counseling provided', NULL, 'Counseling scheduled weekly'),
(3, 3, '2023-08-20', '10:00:00', 'Damage to property', 'Reprimanded', '2023-08-25', 'Monetary penalty applied');

Select * from Prisions
Select * from Admins
Select * from Guards
Select * from Prisoner
Select * from visitingDetails
Select * from visitingSlots
Select * from visitingReservations
Select * from Incident_Reports
Select * from Prisoner_Medical_Records
Select * from GuardAttendance


ALTER TABLE Guards
DROP COLUMN check_in_time,
DROP COLUMN check_out_time;
