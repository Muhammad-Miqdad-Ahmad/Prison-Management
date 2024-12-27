import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QLineEdit, QVBoxLayout, QWidget, QTextEdit, QStackedWidget
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont

class MainApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Prison Management System")
        self.setGeometry(100, 100, 1000, 700)

        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)

        self.apply_styles()
        self.init_login_view()
        self.init_guard_dashboard()
        self.init_prisoner_dashboard()
        self.init_visitor_dashboard()
        self.init_admin_dashboard()
        self.init_emergency_alert_view()

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

        self.login_label = QLabel("Login as Guard, Prisoner, Visitor, or Admin")
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

        self.visitor_login_button = QPushButton("Login as Visitor")
        self.visitor_login_button.setStyleSheet(self.button_style)
        self.visitor_login_button.clicked.connect(self.show_visitor_dashboard)

        self.admin_login_button = QPushButton("Login as Admin")
        self.admin_login_button.setStyleSheet(self.button_style)
        self.admin_login_button.clicked.connect(self.show_admin_dashboard)

        layout.addWidget(self.login_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.username_input, alignment=Qt.AlignCenter)
        layout.addWidget(self.guard_login_button, alignment=Qt.AlignCenter)
        layout.addWidget(self.prisoner_login_button, alignment=Qt.AlignCenter)
        layout.addWidget(self.visitor_login_button, alignment=Qt.AlignCenter)
        layout.addWidget(self.admin_login_button, alignment=Qt.AlignCenter)
        layout.setAlignment(Qt.AlignCenter)

        login_widget.setLayout(layout)
        self.stacked_widget.addWidget(login_widget)

    def init_guard_dashboard(self):
        guard_widget = QWidget()
        layout = QVBoxLayout()

        guard_label = QLabel("Guard Dashboard")
        guard_label.setStyleSheet(self.label_style)

        self.checkin_button = QPushButton("Check-In")
        self.checkin_button.setStyleSheet(self.button_style)

        self.checkout_button = QPushButton("Check-Out")
        self.checkout_button.setStyleSheet(self.button_style)

        self.emergency_alert_button = QPushButton("Emergency Alert")
        self.emergency_alert_button.setStyleSheet(self.button_style)
        self.emergency_alert_button.clicked.connect(self.show_emergency_alert_view)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_login_view)

        layout.addWidget(guard_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.checkin_button)
        layout.addWidget(self.checkout_button)
        layout.addWidget(self.emergency_alert_button)
        layout.addWidget(back_button)
        layout.setAlignment(Qt.AlignCenter)

        guard_widget.setLayout(layout)
        self.stacked_widget.addWidget(guard_widget)

    def init_prisoner_dashboard(self):
        prisoner_widget = QWidget()
        layout = QVBoxLayout()

        prisoner_label = QLabel("Prisoner Dashboard")
        prisoner_label.setStyleSheet(self.label_style)

        self.remaining_sentence_button = QPushButton("Remaining Sentence")
        self.remaining_sentence_button.setStyleSheet(self.button_style)

        self.upcoming_visitation_button = QPushButton("Upcoming Visitations")
        self.upcoming_visitation_button.setStyleSheet(self.button_style)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_login_view)

        layout.addWidget(prisoner_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.remaining_sentence_button)
        layout.addWidget(self.upcoming_visitation_button)
        layout.addWidget(back_button)
        layout.setAlignment(Qt.AlignCenter)

        prisoner_widget.setLayout(layout)
        self.stacked_widget.addWidget(prisoner_widget)

    def init_visitor_dashboard(self):
        visitor_widget = QWidget()
        layout = QVBoxLayout()

        visitor_label = QLabel("Visitor Dashboard")
        visitor_label.setStyleSheet(self.label_style)

        self.register_visit_button = QPushButton("Register Visit")
        self.register_visit_button.setStyleSheet(self.button_style)

        self.view_appointments_button = QPushButton("View Appointments")
        self.view_appointments_button.setStyleSheet(self.button_style)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_login_view)

        layout.addWidget(visitor_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.register_visit_button)
        layout.addWidget(self.view_appointments_button)
        layout.addWidget(back_button)
        layout.setAlignment(Qt.AlignCenter)

        visitor_widget.setLayout(layout)
        self.stacked_widget.addWidget(visitor_widget)

    def init_admin_dashboard(self):
        admin_widget = QWidget()
        layout = QVBoxLayout()

        admin_label = QLabel("Admin Dashboard")
        admin_label.setStyleSheet(self.label_style)

        self.manage_guards_button = QPushButton("Manage Guards")
        self.manage_guards_button.setStyleSheet(self.button_style)

        self.manage_prisoners_button = QPushButton("Manage Prisoners")
        self.manage_prisoners_button.setStyleSheet(self.button_style)

        self.manage_visitors_button = QPushButton("Manage Visitors")
        self.manage_visitors_button.setStyleSheet(self.button_style)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_login_view)

        layout.addWidget(admin_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.manage_guards_button)
        layout.addWidget(self.manage_prisoners_button)
        layout.addWidget(self.manage_visitors_button)
        layout.addWidget(back_button)
        layout.setAlignment(Qt.AlignCenter)

        admin_widget.setLayout(layout)
        self.stacked_widget.addWidget(admin_widget)

    def init_emergency_alert_view(self):
        emergency_widget = QWidget()
        layout = QVBoxLayout()

        emergency_label = QLabel("Emergency Alert")
        emergency_label.setStyleSheet(self.label_style)

        self.alert_text = QTextEdit()
        self.alert_text.setPlaceholderText("Enter Alert Details Here...")
        self.alert_text.setStyleSheet(self.input_style + "min-height: 100px;")

        send_alert_button = QPushButton("Send Alert")
        send_alert_button.setStyleSheet(self.button_style)

        back_button = QPushButton("Back")
        back_button.setStyleSheet(self.button_style)
        back_button.clicked.connect(self.show_guard_dashboard)

        layout.addWidget(emergency_label, alignment=Qt.AlignCenter)
        layout.addWidget(self.alert_text)
        layout.addWidget(send_alert_button)
        layout.addWidget(back_button)
        layout.setAlignment(Qt.AlignTop)

        emergency_widget.setLayout(layout)
        self.stacked_widget.addWidget(emergency_widget)

    def show_login_view(self):
        self.stacked_widget.setCurrentIndex(0)

    def show_guard_dashboard(self):
        self.stacked_widget.setCurrentIndex(1)

    def show_prisoner_dashboard(self):
        self.stacked_widget.setCurrentIndex(2)

    def show_visitor_dashboard(self):
        self.stacked_widget.setCurrentIndex(3)

    def show_admin_dashboard(self):
        self.stacked_widget.setCurrentIndex(4)

    def show_emergency_alert_view(self):
        self.stacked_widget.setCurrentIndex(5)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_window = MainApp()
    main_window.show()
    sys.exit(app.exec_())
