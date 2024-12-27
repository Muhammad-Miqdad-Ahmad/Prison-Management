import psycopg2
from psycopg2.extras import RealDictCursor

class PrisonManagementBackend:
    def __init__(self, dbname, user, password, host, port):
        self.connection = psycopg2.connect(
            dbname='Prison',
            user='postgres',
            password='qwas@M1604',
            host='localhost',
            port=5432
        )
        self.cursor = self.connection.cursor(cursor_factory=RealDictCursor)



        self.connection.autocommit = True
 
    def get_prisoner_records(self):
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT prisoner_id, prision_id, person, sentence_start_date, sentence_end_date, prisoner_status, visitor_1, visitor_2, sentence, crime FROM Prisoner")
            prisoners = cursor.fetchall()
            for prisoner in prisoners:
                person = prisoner['person'][1:-1].split(',')
                prisoner['person'] = {
                    'first_name': person[0].strip('"'),
                    'last_name': person[1].strip('"'),
                    'dob': person[2].strip('"'),
                    'age': person[3].strip('"'),
                    'nationality': person[4].strip('"'),
                    'gender': person[5].strip('"')
                }
            return prisoners
    def get_upcoming_visitations(self, prisoner_id):
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT vs.slot_id, vr.prisoner_id, vr.reservation_time, vr.visitor_id, vr.visit_date
                FROM visitingReservations vr
                JOIN visitingSlots vs ON vr.slot_id = vs.slot_id
                WHERE vr.prisoner_id = %s AND vr.visit_date >= CURRENT_DATE
                ORDER BY vr.visit_date
            """, (prisoner_id,))
            return cursor.fetchall()

    def get_visitation_details(self):
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM visitingDetails")
            return cursor.fetchall()

    def validate_guard_login(self, guard_id):
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM Guards WHERE guard_id = %s", (guard_id,))
            return cursor.fetchone()

    def validate_prisoner_login(self, prisoner_id):
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM Prisoner WHERE prisoner_id = %s", (prisoner_id,))
            return cursor.fetchone()

    def get_remaining_sentence(self, prisoner_id):
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT sentence_end_date - CURRENT_DATE AS remaining_sentence
                FROM Prisoner
                WHERE prisoner_id = %s
            """, (prisoner_id,))
            result = cursor.fetchone()
            return result['remaining_sentence'] if result else None

    def get_upcoming_visitations(self, prisoner_id):
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT vs.slot_id, vs.slot_time, vr.reservation_time, vr.visitor_id, vr.visit_date
                FROM visitingReservations vr
                JOIN visitingSlots vs ON vr.slot_id = vs.slot_id
                WHERE vr.prisoner_id = %s AND vr.visit_date >= CURRENT_DATE
                ORDER BY vr.visit_date
            """, (prisoner_id,))
            return cursor.fetchall()

    def insert_check_in(self, guard_id, qr_data):
        with self.connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO GuardAttendance (guard_id, check_in_time, qr_code)
                VALUES (%s, CURRENT_TIMESTAMP, %s)
            """, (guard_id, qr_data))

    def insert_check_out(self, guard_id, qr_data):
        with self.connection.cursor() as cursor:
            cursor.execute("""
                UPDATE GuardAttendance
                SET check_out_time = CURRENT_TIMESTAMP
                WHERE guard_id = %s AND qr_code = %s AND check_out_time IS NULL
            """, (guard_id, qr_data))

    def submit_complaint(self, prisoner_id, complaint_text):
        with self.connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO Incident_Reports (prisoner_involved_id, incident_description, incident_date, incident_time)
                VALUES (%s, %s, CURRENT_DATE, CURRENT_TIME)
            """, (prisoner_id, complaint_text))

    def get_incident_reports(self, prisoner_id):
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT * FROM Incident_Reports
                WHERE prisoner_involved_id = %s
            """, (prisoner_id,))
            return cursor.fetchall()

    def close(self):
        self.connection.close()