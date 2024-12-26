
from PyQt5.QtWidgets import QMainWindow, QStackedWidget
from modules.guard_dashboard import GuardDashboard
from modules.prisoner_dashboard import PrisonerDashboard

class LoginWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Prison Management System")
        self.setGeometry(100, 100, 800, 600)
        self.stacked_widget = QStackedWidget(self)
        self.setCentralWidget(self.stacked_widget)
        self.init_views()

    def init_views(self):
        self.guard_dashboard = GuardDashboard()
        self.prisoner_dashboard = PrisonerDashboard()
        # Add more initialization as needed
