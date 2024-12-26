import sys
import cv2
from pyzbar import pyzbar
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QLineEdit, QVBoxLayout, QWidget, QTextEdit, QStackedWidget, QMessageBox, QTableWidget, QTableWidgetItem
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtGui import QImage, QPixmap
from backend import PrisonManagementBackend

class MainApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Prison Management System")
        self.setGeometry(100, 100, 800, 600)

        # Initialize flag for check-in/check-out state
        self.is_checking_in = True

        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)

        self.apply_styles()
        self.init_login_view()
        self.init_guard_dashboard()
        self.init_prisoner_dashboard()
        self.init_complaint_view()
        self.init_qr_scanner_view()
        self.init_admin_dashboard()
        self.init_emergency_alert_view()
        self.init_check_records_view()
        self.init_check_visitation_view()

        # Initialize backend
        self.backend = PrisonManagementBackend(dbname="Prison", user="postgres", password="qwas@M1604", host="localhost", port="5432")

    def apply_styles(self):
        self.setStyleSheet("""
            QMainWindow {
                background: qlineargradient(
                    x1: 0, y1: 0, x2: 1, y2: 1,
                    stop: 0 #101820, stop: 0.5 #282C34, stop: 1 #0A0A0A
                );
                color: #C0C0C0;
                font-family: Arial;
            }
        """)
        self.label_style = "font-size: 26px; color: #FFDE59; font-weight: bold; margin: 10px 0;"
        self.button_style = """
            QPushButton {
                font-size: 18px; background-color: #808080; color: white; padding: 12px 24px;
                border-radius: 8px;
            }
            QPushButton:hover {
                background-color: #A9A9A9;
            }
        """
        self.input_style = "font-size: 18px; padding: 8px; background-color: #333333; color: white; border-radius: 8px;"

    def init_login_view(self):
        login_widget = QWidget()
        layout = QVBoxLayout()

        self.login_label = QLabel("Login as Guard or Prisoner")
        self.login_label.setStyleSheet(self.label_style)
        self.username_input = QLineEdit()
        self.username_input.setPlaceholderText("Enter Username")
        self.username_input.setStyleSheet(self.input_style)

        self.guard_login_button = QPushButton("Login as Guard")
        self.guard_login_button.setStyleSheet(self.button_style)
        self.guard_login_button.clicked.connect(self.show_guard_dashboard)

        self.prisoner_login_button = QPushButton("Login as Prisoner")
        self.prisoner_login_button.setStyleSheet(self.button_style)
        self.prisoner_login_button.clicked.connect(self.show_prisoner_dashboard)

        layout.addWidget(self.login_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.username_input, alignment=Qt.AlignCenter)
        layout.addWidget(self.guard_login_button, alignment=Qt.AlignCenter)
        layout.addWidget(self.prisoner_login_button, alignment=Qt.AlignCenter)
        layout.setAlignment(Qt.AlignCenter)

        login_widget.setLayout(layout)
        self.stacked_widget.addWidget(login_widget)

    def init_guard_dashboard(self):
        guard_widget = QWidget()
        layout = QVBoxLayout()

        self.checkin_button = QPushButton("Check-In")
        self.checkin_button.setStyleSheet(self.button_style)
        self.checkin_button.clicked.connect(self.set_check_in_mode)

        self.checkout_button = QPushButton("Check-Out")
        self.checkout_button.setStyleSheet(self.button_style)
        self.checkout_button.clicked.connect(self.set_check_out_mode)

        self.complaint_button = QPushButton("Submit Complaint")
        self.complaint_button.setStyleSheet(self.button_style)
        self.complaint_button.clicked.connect(self.show_complaint_view)

        self.check_records_button = QPushButton("Check Records")
        self.check_records_button.setStyleSheet(self.button_style)
        self.check_records_button.clicked.connect(self.show_check_records_view)

        self.check_visitation_button = QPushButton("Check Visitation")
        self.check_visitation_button.setStyleSheet(self.button_style)
        self.check_visitation_button.clicked.connect(self.show_check_visitation_view)

        self.back_button = QPushButton("Back")
        self.back_button.setStyleSheet(self.button_style)
        self.back_button.clicked.connect(self.show_login_view)

        self.logout_button = QPushButton("Logout")
        self.logout_button.setStyleSheet(self.button_style)
        self.logout_button.clicked.connect(self.close)

        guard_label = QLabel("Guard Dashboard")
        guard_label.setStyleSheet(self.label_style)

        layout.addWidget(guard_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.checkin_button)
        layout.addWidget(self.checkout_button)
        layout.addWidget(self.complaint_button)
        layout.addWidget(self.check_records_button)
        layout.addWidget(self.check_visitation_button)
        layout.addWidget(self.back_button)
        layout.addWidget(self.logout_button)
        layout.setAlignment(Qt.AlignCenter)

        guard_widget.setLayout(layout)
        self.stacked_widget.addWidget(guard_widget)

    def init_prisoner_dashboard(self):
        prisoner_widget = QWidget()
        layout = QVBoxLayout()

        prisoner_label = QLabel("Prisoner Dashboard")
        prisoner_label.setStyleSheet(self.label_style)

        self.sentence_display = QLabel()  # Display for the remaining sentence
        self.sentence_display.setStyleSheet(self.label_style)
        self.sentence_display.setWordWrap(True)

        self.remaining_sentence_button = QPushButton("Remaining Sentence")
        self.remaining_sentence_button.setStyleSheet(self.button_style)
        self.remaining_sentence_button.clicked.connect(self.show_remaining_sentence)

        self.upcoming_visitation_button = QPushButton("Upcoming Visitations")
        self.upcoming_visitation_button.setStyleSheet(self.button_style)
        self.upcoming_visitation_button.clicked.connect(self.show_upcoming_visitations)

        self.complaint_button = QPushButton("Submit Complaint")
        self.complaint_button.setStyleSheet(self.button_style)
        self.complaint_button.clicked.connect(self.show_complaint_view)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_login_view)

        logout_button = QPushButton("Logout")
        logout_button.setStyleSheet(self.button_style)
        logout_button.clicked.connect(self.close)

        layout.addWidget(prisoner_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.sentence_display)  # Add this to the layout
        layout.addWidget(self.remaining_sentence_button)
        layout.addWidget(self.upcoming_visitation_button)
        layout.addWidget(self.complaint_button)
        layout.addWidget(back_button)
        layout.addWidget(logout_button)
        layout.setAlignment(Qt.AlignCenter)

        prisoner_widget.setLayout(layout)
        self.stacked_widget.addWidget(prisoner_widget)

    def init_complaint_view(self):
        complaint_widget = QWidget()
        layout = QVBoxLayout()

        complaint_label = QLabel("Enter Your Complaint")
        complaint_label.setStyleSheet(self.label_style)

        self.complaint_text = QTextEdit()
        self.complaint_text.setStyleSheet(self.input_style + "min-height: 100px;")

        submit_button = QPushButton("Submit Complaint")
        submit_button.setStyleSheet(self.button_style)
        submit_button.clicked.connect(self.submit_complaint)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_guard_dashboard)

        layout.addWidget(complaint_label)
        layout.addWidget(self.complaint_text)
        layout.addWidget(submit_button)
        layout.addWidget(back_button)
        layout.setAlignment(Qt.AlignTop)

        complaint_widget.setLayout(layout)
        self.stacked_widget.addWidget(complaint_widget)

    def init_qr_scanner_view(self):
        qr_scanner_widget = QWidget()
        layout = QVBoxLayout()

        qr_status_label = QLabel("Scanning for QR Code...")
        qr_status_label.setStyleSheet(self.label_style)

        self.camera_feed = QLabel()
        self.camera_feed.setFixedSize(640, 480)

        close_camera_button = QPushButton("Close Camera")
        close_camera_button.setStyleSheet(self.button_style)
        close_camera_button.clicked.connect(self.close_qr_scanner)

        layout.addWidget(qr_status_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.camera_feed, alignment=Qt.AlignCenter)
        layout.addWidget(close_camera_button, alignment=Qt.AlignCenter)

        qr_scanner_widget.setLayout(layout)
        self.stacked_widget.addWidget(qr_scanner_widget)

        # Initialize camera
        self.cap = cv2.VideoCapture(0)
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_frame)

    def init_admin_dashboard(self):
        admin_widget = QWidget()
        layout = QVBoxLayout()

        admin_label = QLabel("Admin Dashboard")
        admin_label.setStyleSheet(self.label_style)

        self.manage_users_button = QPushButton("Manage Users")
        self.manage_users_button.setStyleSheet(self.button_style)
        self.manage_users_button.clicked.connect(self.show_manage_users_view)

        self.view_reports_button = QPushButton("View Reports")
        self.view_reports_button.setStyleSheet(self.button_style)
        self.view_reports_button.clicked.connect(self.show_view_reports_view)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_login_view)

        logout_button = QPushButton("Logout")
        logout_button.setStyleSheet(self.button_style)
        logout_button.clicked.connect(self.close)

        layout.addWidget(admin_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.manage_users_button)
        layout.addWidget(self.view_reports_button)
        layout.addWidget(back_button)
        layout.addWidget(logout_button)
        layout.setAlignment(Qt.AlignCenter)

        admin_widget.setLayout(layout)
        self.stacked_widget.addWidget(admin_widget)

    def init_emergency_alert_view(self):
        emergency_widget = QWidget()
        layout = QVBoxLayout()

        emergency_label = QLabel("Emergency Alert")
        emergency_label.setStyleSheet(self.label_style)

        self.alert_message = QLabel("Emergency! Please follow the instructions.")
        self.alert_message.setStyleSheet(self.label_style)
        self.alert_message.setWordWrap(True)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_guard_dashboard)

        layout.addWidget(emergency_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.alert_message, alignment=Qt.AlignCenter)
        layout.addWidget(back_button, alignment=Qt.AlignCenter)
        layout.setAlignment(Qt.AlignCenter)

        emergency_widget.setLayout(layout)
        self.stacked_widget.addWidget(emergency_widget)

    def init_check_records_view(self):
        check_records_widget = QWidget()
        layout = QVBoxLayout()

        records_label = QLabel("Check Records")
        records_label.setStyleSheet(self.label_style)

        self.records_table = QTableWidget()
        self.records_table.setColumnCount(5)  # Adjust the number of columns as needed
        self.records_table.setHorizontalHeaderLabels(["ID", "Name", "DOB", "Nationality", "Status"])

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_guard_dashboard)

        layout.addWidget(records_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.records_table)
        layout.addWidget(back_button)
        layout.setAlignment(Qt.AlignTop)

        check_records_widget.setLayout(layout)
        self.stacked_widget.addWidget(check_records_widget)

    def init_check_visitation_view(self):
        check_visitation_widget = QWidget()
        layout = QVBoxLayout()

        visitation_label = QLabel("Check Visitation")
        visitation_label.setStyleSheet(self.label_style)

        self.visitation_table = QTableWidget()
        self.visitation_table.setColumnCount(5)  # Adjust the number of columns as needed
        self.visitation_table.setHorizontalHeaderLabels(["ID", "Prisoner ID", "Visitor ID", "Date", "Time"])

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_guard_dashboard)

        layout.addWidget(visitation_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.visitation_table)
        layout.addWidget(back_button)
        layout.setAlignment(Qt.AlignTop)

        check_visitation_widget.setLayout(layout)
        self.stacked_widget.addWidget(check_visitation_widget)

    def show_check_records_view(self):
        self.stacked_widget.setCurrentWidget(self.stacked_widget.widget(7))
        self.load_records()

    def show_check_visitation_view(self):
        self.stacked_widget.setCurrentWidget(self.stacked_widget.widget(8))
        self.load_visitation()

    def load_records(self):
        records = self.backend.get_prisoners()
        self.records_table.setRowCount(len(records))
        for row_idx, record in enumerate(records):
            self.records_table.setItem(row_idx, 0, QTableWidgetItem(str(record['prisoner_id'])))
            self.records_table.setItem(row_idx, 1, QTableWidgetItem(f"{record['person']['first_name']} {record['person']['last_name']}"))
            self.records_table.setItem(row_idx, 2, QTableWidgetItem(record['person']['dob']))
            self.records_table.setItem(row_idx, 3, QTableWidgetItem(record['person']['nationality']))
            self.records_table.setItem(row_idx, 4, QTableWidgetItem(record['prisoner_status']))

    def load_visitation(self):
        visitations = self.backend.get_visiting_reservations()
        self.visitation_table.setRowCount(len(visitations))
        for row_idx, visitation in enumerate(visitations):
            self.visitation_table.setItem(row_idx, 0, QTableWidgetItem(str(visitation['reservation_id'])))
            self.visitation_table.setItem(row_idx, 1, QTableWidgetItem(str(visitation['prisoner_id'])))
            self.visitation_table.setItem(row_idx, 2, QTableWidgetItem(str(visitation['visitor_id'])))
            self.visitation_table.setItem(row_idx, 3, QTableWidgetItem(visitation['visit_date']))
            self.visitation_table.setItem(row_idx, 4, QTableWidgetItem(visitation['reservation_time']))

    def show_remaining_sentence(self):
        remaining_sentence = "2 years, 5 months, 10 days"  # Example value
        self.sentence_display.setText(f"Your Remaining Sentence: {remaining_sentence}")
        print(f"Remaining Sentence: {remaining_sentence}")

    def show_upcoming_visitations(self):
        visitation_details = "Next visitation: December 15, 2024, at 2:00 PM"  # Example value
        self.sentence_display.setText(f"Upcoming Visitations: {visitation_details}")
        print(f"Upcoming Visitations: {visitation_details}")

    def set_check_in_mode(self):
        self.is_checking_in = True
        self.show_qr_scanner_view()

    def set_check_out_mode(self):
        self.is_checking_in = False
        self.show_qr_scanner_view()

    def show_login_view(self):
        self.stacked_widget.setCurrentIndex(0)

    def show_guard_dashboard(self):
        self.stacked_widget.setCurrentIndex(1)

    def show_prisoner_dashboard(self):
        self.stacked_widget.setCurrentIndex(2)

    def show_complaint_view(self):
        self.stacked_widget.setCurrentIndex(3)

    def show_qr_scanner_view(self):
        self.stacked_widget.setCurrentWidget(self.stacked_widget.widget(4))
        self.cap.open(0)
        self.timer.start(20)

    def show_admin_dashboard(self):
        self.stacked_widget.setCurrentIndex(5)

    def show_emergency_alert_view(self):
        self.stacked_widget.setCurrentIndex(6)

    def close_qr_scanner(self):
        self.timer.stop()
        self.cap.release()
        self.stacked_widget.setCurrentIndex(1)

    def submit_complaint(self):
        complaint_text = self.complaint_text.toPlainText()
        print(f"Complaint Submitted: {complaint_text}")
        self.complaint_text.clear()
        self.show_guard_dashboard()

    def show_manage_users_view(self):
        # Placeholder for manage users view
        print("Manage Users View")

    def show_view_reports_view(self):
        # Placeholder for view reports view
        print("View Reports View")

    def update_frame(self):
        ret, frame = self.cap.read()
        if ret:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            qr_codes = pyzbar.decode(frame)
            for qr_code in qr_codes:
                x, y, w, h = qr_code.rect
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                qr_data = qr_code.data.decode('utf-8')
                print(f"QR Code Data: {qr_data}")
                self.timer.stop()
                self.cap.release()
                self.show_message(qr_data)
                self.show_guard_dashboard()
                return

            image = QImage(frame, frame.shape[1], frame.shape[0], QImage.Format_RGB888)
            self.camera_feed.setPixmap(QPixmap.fromImage(image))

    def show_message(self, qr_data):
        message = "Check-In" if self.is_checking_in else "Check-Out"
        QMessageBox.information(self, "QR Code Scanned", f"{message} successful!\nQR Code Data: {qr_data}")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_window = MainApp()
    main_window.show()
    sys.exit(app.exec_())