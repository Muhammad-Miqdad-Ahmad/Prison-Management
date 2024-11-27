import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QLineEdit, QVBoxLayout, QWidget, QTextEdit, QStackedWidget
from PyQt5.QtCore import QPropertyAnimation, Qt, QEasingCurve
from PyQt5.QtGui import QColor, QFont
from PyQt5.QtWidgets import QGraphicsOpacityEffect

class MainApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Prison Management System")
        self.setGeometry(100, 100, 800, 600)

        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)

        self.apply_styles()
        self.init_login_view()
        self.init_guard_dashboard()
        self.init_prisoner_dashboard()

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
                font-size: 18px; background-color: #FF4500; color: white; padding: 12px 24px;
                border-radius: 8px;
                transition: background-color 0.5s ease;
            }
            QPushButton:hover {
                background-color: #FF6347;
            }
        """
        self.input_style = "font-size: 18px; padding: 8px; background-color: #333333; color: white; border-radius: 8px;"

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
        self.guard_login_button.clicked.connect(self.show_guard_dashboard)
        
        self.prisoner_login_button = QPushButton("Login as Prisoner")
        self.prisoner_login_button.setStyleSheet(self.button_style)
        self.prisoner_login_button.clicked.connect(self.show_prisoner_dashboard)

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

        checkin_button = QPushButton("Check-In")
        checkin_button.setStyleSheet(self.button_style)
        checkin_button.clicked.connect(self.check_in)

        checkout_button = QPushButton("Check-Out")
        checkout_button.setStyleSheet(self.button_style)
        checkout_button.clicked.connect(self.check_out)

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
        self.sentence_display = QLabel("Bhot lambi pai ay teri  kaka")
        self.sentence_display.setStyleSheet("font-size: 20px; color: #FFD700;")

        visitation_label = QLabel("Upcoming Visitations:")
        visitation_label.setStyleSheet(self.label_style)
        self.visitation_display = QLabel("Putr tery kol ni ana ksi ne")
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

    def show_login_view(self):
        self.fade_in(0)

    def show_guard_dashboard(self):
        self.fade_in(1)

    def show_prisoner_dashboard(self):
        self.fade_in(2)

    def fade_in(self, index):
        self.stacked_widget.setCurrentIndex(index)
        opacity_effect = QGraphicsOpacityEffect()
        self.stacked_widget.currentWidget().setGraphicsEffect(opacity_effect)
        
        self.animation = QPropertyAnimation(opacity_effect, b"opacity")
        self.animation.setDuration(500)
        self.animation.setStartValue(0)
        self.animation.setEndValue(1)
        self.animation.setEasingCurve(QEasingCurve.InOutQuad)
        self.animation.start()

    def check_in(self):
        print("aja")

    def check_out(self):
        print("Naas oye")

    def submit_complaint(self):
        complaint = self.complaint_text.toPlainText()
        if complaint:
            print(f"okaay: {complaint}")
            self.complaint_text.clear()
        else:
            print("Nishta")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_app = MainApp()
    main_app.show()
    sys.exit(app.exec_())
