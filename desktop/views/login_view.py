from PyQt5.QtCore import Qt  
from PyQt5.QtWidgets import QWidget, QVBoxLayout, QLabel, QLineEdit, QPushButton
from utils.styles import button_style, input_style, label_style

class LoginView(QWidget):
    def __init__(self, show_guard_dashboard, show_prisoner_dashboard):
        super().__init__()
        self.setLayout(self.create_layout(show_guard_dashboard, show_prisoner_dashboard))

    def create_layout(self, show_guard_dashboard, show_prisoner_dashboard):
        layout = QVBoxLayout()

        login_label = QLabel("Login as Guard or Prisoner")
        login_label.setStyleSheet(label_style)
        username_input = QLineEdit()
        username_input.setPlaceholderText("Enter Username")
        username_input.setStyleSheet(input_style)

        guard_login_button = QPushButton("Login as Guard")
        guard_login_button.setStyleSheet(button_style)
        guard_login_button.clicked.connect(show_guard_dashboard)

        prisoner_login_button = QPushButton("Login as Prisoner")
        prisoner_login_button.setStyleSheet(button_style)
        prisoner_login_button.clicked.connect(show_prisoner_dashboard)

        layout.addWidget(login_label, alignment=Qt.AlignCenter) 
        layout.addWidget(username_input, alignment=Qt.AlignCenter)
        layout.addWidget(guard_login_button, alignment=Qt.AlignCenter)
        layout.addWidget(prisoner_login_button, alignment=Qt.AlignCenter)

        return layout
