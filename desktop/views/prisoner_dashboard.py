from PyQt5.QtWidgets import QWidget, QVBoxLayout, QLabel, QPushButton
from utils.styles import button_style, label_style

class PrisonerDashboard(QWidget):
    def __init__(self, show_login_view):
        super().__init__()
        self.setLayout(self.create_layout(show_login_view))

    def create_layout(self, show_login_view):
        layout = QVBoxLayout()

        # Sentence and visitation information
        sentence_label = QLabel("Remaining Sentence: 🚨")
        sentence_label.setStyleSheet(label_style)
        visitation_label = QLabel("Upcoming Visitations: None")
        visitation_label.setStyleSheet(label_style)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(button_style)
        back_button.clicked.connect(show_login_view)

        layout.addWidget(QLabel("Prisoner Dashboard", alignment=Qt.AlignCenter).setStyleSheet(label_style))
        layout.addWidget(sentence_label)
        layout.addWidget(visitation_label)
        layout.addWidget(back_button)

        return layout
