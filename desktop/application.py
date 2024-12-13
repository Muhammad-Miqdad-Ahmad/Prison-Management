import sys
import cv2
from pyzbar import pyzbar
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QLineEdit, QVBoxLayout, QWidget, QTextEdit, QStackedWidget
from PyQt5.QtCore import QPropertyAnimation, Qt, QEasingCurve, QTimer
from PyQt5.QtGui import QFont, QImage, QPixmap
from PyQt5.QtWidgets import QGraphicsOpacityEffect

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

        self.back_button = QPushButton("Back")
        self.back_button.setStyleSheet(self.button_style)
        self.back_button.clicked.connect(self.show_login_view)

        self.logout_button = QPushButton("Logout")
        self.logout_button.setStyleSheet(self.button_style)
        self.logout_button.clicked.connect(self.close)

        layout.addWidget(QLabel("Guard Dashboard", alignment=Qt.AlignCenter).setStyleSheet(self.label_style))
        layout.addWidget(self.checkin_button)
        layout.addWidget(self.checkout_button)
        layout.addWidget(self.complaint_button)
        layout.addWidget(self.back_button)
        layout.addWidget(self.logout_button)
        layout.setAlignment(Qt.AlignCenter)

        guard_widget.setLayout(layout)
        self.stacked_widget.addWidget(guard_widget)

    def init_prisoner_dashboard(self):
        prisoner_widget = QWidget()
        layout = QVBoxLayout()

        sentence_label = QLabel("Remaining Sentence:")
        sentence_label.setStyleSheet(self.label_style)
        self.sentence_display = QLabel("Your remaining sentence.")
        self.sentence_display.setStyleSheet("font-size: 20px; color: #FFD700;")

        visitation_label = QLabel("Upcoming Visitations:")
        visitation_label.setStyleSheet(self.label_style)
        self.visitation_display = QLabel("No upcoming visitations.")
        self.visitation_display.setStyleSheet("font-size: 20px; color: #FFD700;")

        self.complaint_button = QPushButton("Submit Complaint")
        self.complaint_button.setStyleSheet(self.button_style)
        self.complaint_button.clicked.connect(self.show_complaint_view)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_login_view)

        logout_button = QPushButton("Logout")
        logout_button.setStyleSheet(self.button_style)
        logout_button.clicked.connect(self.close)

        layout.addWidget(QLabel("Prisoner Dashboard", alignment=Qt.AlignCenter).setStyleSheet(self.label_style))
        layout.addWidget(sentence_label)
        layout.addWidget(self.sentence_display)
        layout.addWidget(visitation_label)
        layout.addWidget(self.visitation_display)
        layout.setAlignment(Qt.AlignTop)
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
        self.qr_scanner_widget = QWidget()
        layout = QVBoxLayout()

        self.qr_status_label = QLabel("Scanning for QR Code...")
        self.qr_status_label.setStyleSheet(self.label_style)

        self.camera_feed = QLabel()
        self.camera_feed.setFixedSize(640, 480)

        close_camera_button = QPushButton("Close Camera")
        close_camera_button.setStyleSheet(self.button_style)
        close_camera_button.clicked.connect(self.close_qr_scanner)

        layout.addWidget(self.qr_status_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.camera_feed, alignment=Qt.AlignCenter)
        layout.addWidget(close_camera_button, alignment=Qt.AlignCenter)

        self.qr_scanner_widget.setLayout(layout)
        self.stacked_widget.addWidget(self.qr_scanner_widget)

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
        self.stacked_widget.setCurrentWidget(self.qr_scanner_widget)
        self.cap = cv2.VideoCapture(0)
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(20)

    def close_qr_scanner(self):
        self.timer.stop()
        self.cap.release()
        self.stacked_widget.setCurrentIndex(1)  # Return to guard dashboard

    def update_frame(self):
        ret, frame = self.cap.read()
        if not ret:
            return

        barcodes = pyzbar.decode(frame)
        for barcode in barcodes:
            barcode_data = barcode.data.decode("utf-8")
            if self.is_checking_in:
                self.qr_status_label.setText(f"Checked In: {barcode_data}")
            else:
                self.qr_status_label.setText(f"Checked Out: {barcode_data}")
            self.timer.stop()
            self.cap.release()
            return

        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        height, width, channel = frame.shape
        step = channel * width
        q_img = QImage(frame.data, width, height, step, QImage.Format_RGB888)
        self.camera_feed.setPixmap(QPixmap.fromImage(q_img))

    def submit_complaint(self):
        complaint_text = self.complaint_text.toPlainText()
        if complaint_text:
            print(f"Complaint submitted: {complaint_text}")
            self.complaint_text.clear()
        else:
            print("Complaint field is empty.")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainApp()
    window.show()
    sys.exit(app.exec_())
