import sys
import cv2
from PyQt5.QtWidgets import (QApplication, QMainWindow, QPushButton, QLabel, QLineEdit, QVBoxLayout, QWidget,
                             QTextEdit, QStackedWidget, QHBoxLayout, QMessageBox)
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtGui import QPixmap, QImage
from pyzbar.pyzbar import decode

class MainApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Prison Management System")
        self.setGeometry(100, 100, 900, 650)

        self.state = "login"  # This will hold the current "view" state like React
        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)

        self.apply_styles()
        self.init_views()
        self.capture = None
        self.timer = QTimer()
        self.qr_scanned = False

    def apply_styles(self):
        self.setStyleSheet("""
            QMainWindow {
                background-color: #1C1F26;
                color: #C0C0C0;
                font-family: Arial;
            }
        """)
        self.label_style = """ font-size: 28px; color: #FFDE59; font-weight: bold; padding-bottom: 8px; margin: 10px 0; """
        self.button_style = """ QPushButton { font-size: 18px; background-color: #333333; color: #FFDE59; padding: 12px 24px; border: 2px solid #444; border-radius: 8px; } QPushButton:hover { background-color: #555555; } """
        self.input_style = """ font-size: 18px; padding: 8px; background-color: #2A2E35; color: white; border-radius: 8px; border: 1px solid #444; """

    def init_views(self):
        # Dynamically render based on state (like React's conditional rendering)
        self.render_login_view() if self.state == "login" else self.render_dashboard_view()

    def render_login_view(self):
        login_widget = QWidget()
        layout = QVBoxLayout()

        self.login_label = QLabel("Login as Guard or Prisoner")
        self.login_label.setStyleSheet(self.label_style)

        self.username_input = QLineEdit()
        self.username_input.setPlaceholderText("Enter Username")
        self.username_input.setStyleSheet(self.input_style)

        self.guard_login_button = self.create_button("Login as Guard", self.guard_login)
        self.prisoner_login_button = self.create_button("Login as Prisoner", self.prisoner_login)

        layout.addWidget(self.login_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.username_input, alignment=Qt.AlignCenter)
        layout.addWidget(self.guard_login_button, alignment=Qt.AlignCenter)
        layout.addWidget(self.prisoner_login_button, alignment=Qt.AlignCenter)
        layout.setAlignment(Qt.AlignCenter)

        login_widget.setLayout(layout)
        self.stacked_widget.addWidget(login_widget)

    def render_dashboard_view(self):
        # Check the state and render the appropriate view
        if self.state == "guard_dashboard":
            self.render_guard_dashboard()
            self.stacked_widget.setCurrentIndex(1)  # Set the index for guard dashboard
        elif self.state == "prisoner_dashboard":
            self.render_prisoner_dashboard()
            self.stacked_widget.setCurrentIndex(2)
    def render_guard_dashboard(self):
        guard_widget = QWidget()
        layout = QVBoxLayout()

        self.video_label = QLabel("QR Code Scanner")
        self.video_label.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.video_label)

        checkin_button = self.create_button("Check-In with QR Code", self.scan_qr_code)
        checkout_button = self.create_button("Check-Out with QR Code", self.scan_qr_code)
        close_camera_button = self.create_button("Close Camera", self.close_camera)

        complaint_label = QLabel("Submit Complaint")
        complaint_label.setStyleSheet(self.label_style)
        self.complaint_text = QTextEdit()
        self.complaint_text.setStyleSheet(self.input_style + " min-height: 100px;")

        submit_complaint_button = self.create_button("Submit Complaint", self.submit_complaint)
        back_button = self.create_button("Back", self.back_to_login)
        logout_button = self.create_button("Logout", self.close)

        layout.addWidget(QLabel("Guard Dashboard", alignment=Qt.AlignCenter).setStyleSheet(self.label_style))
        layout.addWidget(checkin_button)
        layout.addWidget(checkout_button)
        layout.addWidget(close_camera_button)
        layout.addWidget(complaint_label)
        layout.addWidget(self.complaint_text)
        layout.addWidget(submit_complaint_button)
        layout.addWidget(back_button)
        layout.addWidget(logout_button)
        layout.setAlignment(Qt.AlignTop)

        guard_widget.setLayout(layout)
        self.stacked_widget.addWidget(guard_widget)

    def render_prisoner_dashboard(self):
        prisoner_widget = QWidget()
        layout = QVBoxLayout()

        sentence_label = QLabel("Remaining Sentence:")
        sentence_label.setStyleSheet(self.label_style)
        self.sentence_display = QLabel("No updates available")
        self.sentence_display.setStyleSheet("font-size: 20px; color: #FFD700;")

        visitation_label = QLabel("Upcoming Visitations:")
        visitation_label.setStyleSheet(self.label_style)
        self.visitation_display = QLabel("No visitors scheduled")
        self.visitation_display.setStyleSheet("font-size: 20px; color: #FFD700;")

        back_button = self.create_button("Back", self.back_to_login)
        logout_button = self.create_button("Logout", self.close)

        layout.addWidget(QLabel("Prisoner Dashboard", alignment=Qt.AlignCenter).setStyleSheet(self.label_style))
        layout.addWidget(sentence_label)
        layout.addWidget(self.sentence_display)
        layout.addWidget(visitation_label)
        layout.addWidget(self.visitation_display)
        layout.addWidget(back_button)
        layout.addWidget(logout_button)
        layout.setAlignment(Qt.AlignTop)

        prisoner_widget.setLayout(layout)
        self.stacked_widget.addWidget(prisoner_widget)

    def create_button(self, text, function):
        button = QPushButton(text)
        button.setStyleSheet(self.button_style)
        button.clicked.connect(function)
        return button

    def scan_qr_code(self):
        if self.capture is None:
            try:
                self.capture = cv2.VideoCapture(0)
                if not self.capture.isOpened():
                    raise Exception("Could not open camera.")
                self.timer.timeout.connect(self.process_frame)
                self.timer.start(20)
            except Exception as e:
                QMessageBox.critical(self, "Camera Error", str(e))

    def process_frame(self):
        ret, frame = self.capture.read()
        if not ret:
            self.stop_scanning()
            QMessageBox.warning(self, "Camera Error", "Failed to capture frame. Try again.")
            return

        barcodes = decode(frame)
        for barcode in barcodes:
            barcode_data = barcode.data.decode("utf-8")
            self.qr_scanned = True
            self.stop_scanning()
            QMessageBox.information(self, "QR Code Scanned", f"Data: {barcode_data}")
            return

        rgb_image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        h, w, c = rgb_image.shape
        qt_image = QImage(rgb_image.data, w, h, 3 * w, QImage.Format_RGB888)
        self.video_label.setPixmap(QPixmap.fromImage(qt_image))

    def stop_scanning(self):
        self.timer.stop()
        if self.capture:
            self.capture.release()
            self.capture = None

    def close_camera(self):
        if self.capture:
            self.stop_scanning()
            self.video_label.clear()
            QMessageBox.information(self, "Camera Closed", "The camera has been closed.")

    def submit_complaint(self):
        complaint = self.complaint_text.toPlainText()
        if complaint.strip():
            QMessageBox.information(self, "Complaint Submitted", "Your complaint has been submitted.")
            self.complaint_text.clear()
        else:
            QMessageBox.warning(self, "Input Error", "Complaint cannot be empty!")

    def guard_login(self):
        if not self.username_input.text().strip():
            QMessageBox.warning(self, "Input Error", "Username is required!")
        else:
            self.state = "guard_dashboard"  # Change the state to guard dashboard
            self.render_dashboard_view()  # Explicitly render the guard dashboard view

    def prisoner_login(self):
        if not self.username_input.text().strip():
            QMessageBox.warning(self, "Input Error", "Username is required!")
        else:
            self.state = "prisoner_dashboard"  # Change the state to prisoner dashboard
            self.render_dashboard_view()

    def back_to_login(self):
        self.state = "login"
        self.init_views()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_app = MainApp()
    main_app.show()
    sys.exit(app.exec_())
