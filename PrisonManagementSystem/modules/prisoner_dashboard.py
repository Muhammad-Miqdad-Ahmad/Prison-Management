
from PyQt5.QtWidgets import QWidget, QVBoxLayout, QPushButton, QLabel

class PrisonerDashboard(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Prisoner Dashboard"))
        layout.addWidget(QPushButton("Submit Complaint"))
        layout.addWidget(QPushButton("View Sentence"))
        self.setLayout(layout)
