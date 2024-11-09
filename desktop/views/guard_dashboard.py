from PyQt5.QtCore import Qt  # Add this import statement
from PyQt5.QtWidgets import QWidget, QVBoxLayout, QLabel, QPushButton, QTextEdit
from utils.styles import button_style, input_style, label_style
from PyQt5.QtCore import Qt

class GuardDashboard(QWidget):
    def __init__(self, show_login_view):
        super().__init__()
        self.setLayout(self.create_layout(show_login_view))

    def create_layout(self, show_login_view):
        layout = QVBoxLayout()

        label = QLabel("Guard Dashboard")
        label.setStyleSheet(label_style)

        checkin_button = QPushButton("Check-In")
        checkin_button.setStyleSheet(button_style)
       
        checkout_button = QPushButton("Check-Out")
        checkout_button.setStyleSheet(button_style)
       
        complaint_label = QLabel("Submit Complaint")
        complaint_label.setStyleSheet(label_style)
        complaint_text = QTextEdit()
        complaint_text.setStyleSheet(input_style + "min-height: 100px;")

        submit_complaint_button = QPushButton("Submit Complaint")
        submit_complaint_button.setStyleSheet(button_style)
       
        back_button = QPushButton("Back")
        back_button.setStyleSheet(button_style)
        back_button.clicked.connect(show_login_view)

        layout.addWidget(label, alignment=Qt.AlignCenter)  
        layout.addWidget(checkout_button)
        layout.addWidget(complaint_label)
        layout.addWidget(complaint_text)
        layout.addWidget(submit_complaint_button)
        layout.addWidget(back_button)

        return layout
