
from PyQt5.QtWidgets import QWidget, QVBoxLayout, QPushButton, QLabel

class GuardDashboard(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Guard Dashboard"))
        layout.addWidget(QPushButton("Check-In"))
        layout.addWidget(QPushButton("Check-Out"))
        self.setLayout(layout)
