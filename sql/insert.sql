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
INSERT INTO Prisoner (prision_id, person, sentence_start_date, sentence_end_date, status, visitor_1, visitor_2, sentence, crime)
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
