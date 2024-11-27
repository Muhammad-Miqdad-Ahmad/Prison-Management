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
