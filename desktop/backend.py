import psycopg2
from psycopg2.extras import RealDictCursor

class PrisonManagementBackend:
    def __init__(self, dbname, user, password, host, port):
        self.connection = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        self.cursor = self.connection.cursor(cursor_factory=RealDictCursor)

    def close(self):
        self.cursor.close()
        self.connection.close()

    def insert_prison(self, prison_name, prison_location):
        query = """
        INSERT INTO Prisions (prision_name, prision_location)
        VALUES (%s, %s) RETURNING prision_id;
        """
        self.cursor.execute(query, (prison_name, prison_location))
        self.connection.commit()
        return self.cursor.fetchone()['prision_id']

    def insert_guard(self, prision_id, person, joining_date, shift, qr_code):
        query = """
        INSERT INTO Guards (prision_id, person, joining_date, shift, qr_code)
        VALUES (%s, %s, %s, %s, %s) RETURNING guard_id;
        """
        self.cursor.execute(query, (prision_id, person, joining_date, shift, qr_code))
        self.connection.commit()
        return self.cursor.fetchone()['guard_id']

    def insert_prisoner(self, prision_id, person, sentence_start_date, sentence_end_date, prisoner_status, visitor_1, visitor_2, sentence, crime):
        query = """
        INSERT INTO Prisoner (prision_id, person, sentence_start_date, sentence_end_date, prisoner_status, visitor_1, visitor_2, sentence, crime)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING prisoner_id;
        """
        self.cursor.execute(query, (prision_id, person, sentence_start_date, sentence_end_date, prisoner_status, visitor_1, visitor_2, sentence, crime))
        self.connection.commit()
        return self.cursor.fetchone()['prisoner_id']

    def insert_incident_report(self, reported_by_guard_id, prisoner_involved_id, incident_date, incident_time, incident_description, action_taken, resolution_date, additional_notes):
        query = """
        INSERT INTO Incident_Reports (reported_by_guard_id, prisoner_involved_id, incident_date, incident_time, incident_description, action_taken, resolution_date, additional_notes)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING incident_id;
        """
        self.cursor.execute(query, (reported_by_guard_id, prisoner_involved_id, incident_date, incident_time, incident_description, action_taken, resolution_date, additional_notes))
        self.connection.commit()
        return self.cursor.fetchone()['incident_id']

    def get_prisions(self):
        query = "SELECT * FROM Prisions;"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def get_guards(self):
        query = "SELECT * FROM Guards;"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def get_prisoners(self):
        query = "SELECT * FROM Prisoner;"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def get_incident_reports(self):
        query = "SELECT * FROM Incident_Reports;"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def validate_guard_login(self, guard_id):
        query = "SELECT * FROM Guards WHERE guard_id = %s;"
        self.cursor.execute(query, (guard_id,))
        return self.cursor.fetchone()

    def validate_prisoner_login(self, prisoner_id):
        query = "SELECT * FROM Prisoner WHERE prisoner_id = %s;"
        self.cursor.execute(query, (prisoner_id,))
        return self.cursor.fetchone()

if __name__ == "__main__":
    backend = PrisonManagementBackend(dbname="Prison", user="postgres", password="qwas@M1604", host="localhost", port="5432")

    # Example usage
    prision_id = backend.insert_prison("Central Jail Karachi", "Karachi, Sindh")
    guard_id = backend.insert_guard(prision_id, ('Ali', 'Khan', '1985-01-15', 39, 'Pakistani', 'Male'), '2020-01-01', 'Morning', 12345)
    prisoner_id = backend.insert_prisoner(prision_id, ('Riaz', 'Ahmed', '1985-07-20', 39, 'Pakistani', 'Male'), '2023-01-01', None, 'Active', 201, 202, '5 years', 'Theft')
    incident_id = backend.insert_incident_report(guard_id, prisoner_id, '2023-06-01', '12:30:00', 'Prisoner attempted to escape', 'Increased surveillance', '2023-06-05', 'None')

    print("Prisions:", backend.get_prisions())
    print("Guards:", backend.get_guards())
    print("Prisoners:", backend.get_prisoners())
    print("Incident Reports:", backend.get_incident_reports())

    backend.close()