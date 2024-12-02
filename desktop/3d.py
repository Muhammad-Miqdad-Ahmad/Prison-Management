import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget, QTextEdit, QStackedWidget
from PyQt5.QtQml import QQmlApplicationEngine
from PyQt5.QtCore import Qt, QUrl
from PyQt5.QtQuickWidgets import QQuickWidget

class MainApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Prison Management System")
        self.setGeometry(100, 100, 800, 600)

        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)

        self.apply_styles()
        self.init_logo_view()  # Initialize the 3D logo
        self.init_login_view()
        self.init_guard_dashboard()
        self.init_prisoner_dashboard()
        self.init_complaint_view()

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

    def init_logo_view(self):
        """Create the persistent 3D logo view at the top."""
        self.logo_widget = QQuickWidget()
        self.logo_widget.setSource(QUrl("file:///C:/Users/IK-LAPTOPS/OneDrive/Documents/New folder/Prison-Management/logoView.qml"))
        
        # Check for QML errors
        if self.logo_widget.engine().errors():
            print("Error loading QML file!")
            for error in self.logo_widget.engine().errors():
                print(f"Error: {error}")
            return

        self.logo_widget.setResizeMode(QQuickWidget.SizeRootObjectToView)
        self.logo_widget.setFixedHeight(200)  # Ensure proper height
        self.logo_widget.setStyleSheet("background: transparent;")

        # Create layout for the logo and add it at the top
        self.top_layout = QVBoxLayout()
        self.top_layout.addWidget(self.logo_widget)

        # Add the layout to the central widget
        self.central_widget = QWidget()
        self.central_layout = QVBoxLayout(self.central_widget)
        self.central_layout.addLayout(self.top_layout)

        self.stacked_widget.addWidget(self.central_widget)

    def init_login_view(self):
        """Initialize login view (example placeholder)"""
        login_widget = QWidget()
        layout = QVBoxLayout()

        login_label = QLabel("Login View")
        login_label.setStyleSheet(self.label_style)

        layout.addWidget(login_label)
        layout.setAlignment(Qt.AlignCenter)

        login_widget.setLayout(layout)
        self.stacked_widget.addWidget(login_widget)

    def init_guard_dashboard(self):
        guard_widget = QWidget()
        layout = QVBoxLayout()

        self.logout_button = QPushButton("Logout")
        self.logout_button.setStyleSheet(self.button_style)
        self.logout_button.clicked.connect(self.close)

        layout.addWidget(QLabel("Guard Dashboard", alignment=Qt.AlignCenter).setStyleSheet(self.label_style))
        layout.addWidget(self.logout_button)
        layout.setAlignment(Qt.AlignCenter)

        guard_widget.setLayout(layout)
        self.stacked_widget.addWidget(guard_widget)

    def init_prisoner_dashboard(self):
        prisoner_widget = QWidget()
        layout = QVBoxLayout()

        self.logout_button = QPushButton("Logout")
        self.logout_button.setStyleSheet(self.button_style)
        self.logout_button.clicked.connect(self.close)

        layout.addWidget(QLabel("Prisoner Dashboard", alignment=Qt.AlignCenter).setStyleSheet(self.label_style))
        layout.addWidget(self.logout_button)
        layout.setAlignment(Qt.AlignCenter)

        prisoner_widget.setLayout(layout)
        self.stacked_widget.addWidget(prisoner_widget)

    def init_complaint_view(self):
        complaint_widget = QWidget()
        layout = QVBoxLayout()

        complaint_label = QLabel("Enter Your Complaint")
        complaint_label.setStyleSheet(self.label_style)

        self.complaint_text = QTextEdit()
        self.complaint_text.setStyleSheet(self.input_style + "min-height: 100px;")

        submit_button = QPushButton("Submit Complaint")
        submit_button.setStyleSheet(self.button_style)
        submit_button.clicked.connect(self.submit_complaint)

        layout.addWidget(complaint_label)
        layout.addWidget(self.complaint_text)
        layout.addWidget(submit_button)
        layout.setAlignment(Qt.AlignTop)

        complaint_widget.setLayout(layout)
        self.stacked_widget.addWidget(complaint_widget)

    def submit_complaint(self):
        complaint_text = self.complaint_text.toPlainText()
        if complaint_text:
            print(f"Complaint submitted: {complaint_text}")
            self.complaint_text.clear()
        else:
            print("Complaint field is empty.")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainApp()
    window.show()
    sys.exit(app.exec_())
