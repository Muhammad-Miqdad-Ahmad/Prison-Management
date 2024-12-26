import sys
import cv2
from PyQt5.QtWidgets import (QApplication, QMainWindow, QPushButton, QLabel, QLineEdit, QVBoxLayout, QWidget,
                             QTextEdit, QStackedWidget, QGraphicsOpacityEffect, QMessageBox, QHBoxLayout)
from PyQt5.QtCore import QPropertyAnimation, Qt, QEasingCurve, QTimer
from PyQt5.QtGui import QPixmap, QImage
from pyzbar.pyzbar import decode

class MainApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Prison Management System")
        self.setGeometry(100, 100, 900, 650)

        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)
        
        self.apply_styles()
        self.init_login_view()
        self.init_guard_dashboard()
        self.init_prisoner_dashboard()

        self.capture = None
        self.timer = QTimer()
        self.qr_scanned = False

    def apply_styles(self):
        self.setStyleSheet("""
            QMainWindow {
             background-image: url('C:/Users/IK-LAPTOPS/OneDrive/Documents/New folder/Prison-Management/desktop/test.jpg');
            background-repeat: no-repeat;
                background-position: center;
                 background-size: cover; /* Or use contain if needed */
                color: #C0C0C0;
            font-family: Arial;
             margin: 10px;  /* Optional, adds some spacing around the window */
            }
            """)


        self.label_style = """
        font-size: 28px; 
        color: #FFDE59; 
        font-weight: bold; 
        padding-bottom: 8px; 
        margin: 10px 0;
        """
        self.button_style = """
        QPushButton {
            font-size: 18px; 
            background-color: #333333; 
            color: #FFDE59; 
            padding: 12px 24px;
            border: 2px solid #444; 
            border-radius: 8px;
        }
        QPushButton:hover {
            background-color: #555555;
        }
        """
        self.input_style = """
        font-size: 18px; 
        padding: 8px; 
        background-color: #2A2E35; 
        color: white; 
        border-radius: 8px; 
        border: 1px solid #444;
        """

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
        self.guard_login_button.clicked.connect(self.guard_login)

        self.prisoner_login_button = QPushButton("Login as Prisoner")
        self.prisoner_login_button.setStyleSheet(self.button_style)
        self.prisoner_login_button.clicked.connect(self.prisoner_login)

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

        self.video_label = QLabel("QR Code Scanner")
        self.video_label.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.video_label)

        checkin_button = QPushButton("Check-In with QR Code")
        checkin_button.setStyleSheet(self.button_style)
        checkin_button.clicked.connect(self.scan_qr_code)

        checkout_button = QPushButton("Check-Out with QR Code")
        checkout_button.setStyleSheet(self.button_style)
        checkout_button.clicked.connect(self.scan_qr_code)

        close_camera_button = QPushButton("Close Camera")
        close_camera_button.setStyleSheet(self.button_style)
        close_camera_button.clicked.connect(self.close_camera)

        complaint_label = QLabel("Submit Complaint")
        complaint_label.setStyleSheet(self.label_style)
        self.complaint_text = QTextEdit()
        self.complaint_text.setStyleSheet(self.input_style + "min-height: 100px;")
        
        submit_complaint_button = QPushButton("Submit Complaint")
        submit_complaint_button.setStyleSheet(self.button_style)
        submit_complaint_button.clicked.connect(self.submit_complaint)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_login_view)

        logout_button = QPushButton("Logout")
        logout_button.setStyleSheet(self.button_style)
        logout_button.clicked.connect(self.close)

        layout.addWidget(QLabel("Guard Dashboard", alignment=Qt.AlignCenter).setStyleSheet(self.label_style))
        layout.addWidget(checkin_button)
        layout.addWidget(checkout_button)
        layout.addWidget(close_camera_button)  # Add the close camera button
        layout.addWidget(complaint_label)
        layout.addWidget(self.complaint_text)
        layout.addWidget(submit_complaint_button)
        layout.addWidget(back_button)
        layout.addWidget(logout_button)
        layout.setAlignment(Qt.AlignTop)

        guard_widget.setLayout(layout)
        self.stacked_widget.addWidget(guard_widget)

    def init_prisoner_dashboard(self):
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
        layout.addWidget(back_button)
        layout.addWidget(logout_button)
        layout.setAlignment(Qt.AlignTop)

        prisoner_widget.setLayout(layout)
        self.stacked_widget.addWidget(prisoner_widget)

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

        # Decode the QR code
        barcodes = decode(frame)
        for barcode in barcodes:
            barcode_data = barcode.data.decode("utf-8")
            self.qr_scanned = True
            self.stop_scanning()
            QMessageBox.information(self, "QR Code Scanned", f"Data: {barcode_data}")
            return

        # Display the frame
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
            self.show_guard_dashboard()

    def prisoner_login(self):
        if not self.username_input.text().strip():
            QMessageBox.warning(self, "Input Error", "Username is required!")
        else:
            self.show_prisoner_dashboard()

    def show_login_view(self):
        self.stacked_widget.setCurrentIndex(0)

    def show_guard_dashboard(self):
        self.stacked_widget.setCurrentIndex(1)

    def show_prisoner_dashboard(self):
        self.stacked_widget.setCurrentIndex(2)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_app = MainApp()
    main_app.show()
    sys.exit(app.exec_())

