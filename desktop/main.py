import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QStackedWidget
from views.login_view import LoginView
from views.guard_dashboard import GuardDashboard
from views.prisoner_dashboard import PrisonerDashboard
from utils.styles import apply_styles

class MainApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Prison Management System")
        self.setGeometry(100, 100, 800, 600)

        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)

        apply_styles(self)
        self.init_views()

    def init_views(self):
        self.login_view = LoginView(self.show_guard_dashboard, self.show_prisoner_dashboard)
        self.guard_dashboard = GuardDashboard(self.show_login_view)
        self.prisoner_dashboard = PrisonerDashboard(self.show_login_view)

        self.stacked_widget.addWidget(self.login_view)
        self.stacked_widget.addWidget(self.guard_dashboard)
        self.stacked_widget.addWidget(self.prisoner_dashboard)

    def show_login_view(self):
        self.stacked_widget.setCurrentWidget(self.login_view)

    def show_guard_dashboard(self):
        self.stacked_widget.setCurrentWidget(self.guard_dashboard)

    def show_prisoner_dashboard(self):
        self.stacked_widget.setCurrentWidget(self.prisoner_dashboard)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_app = MainApp()
    main_app.show()
    sys.exit(app.exec_())
