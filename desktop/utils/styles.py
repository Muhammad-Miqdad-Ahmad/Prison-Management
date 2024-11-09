button_style = """
    QPushButton {
        font-size: 18px; background-color: #FF4500; color: white; padding: 12px 24px;
        border-radius: 8px;
        transition: background-color 0.5s ease;
    }
    QPushButton:hover {
        background-color: #FF6347;
    }
"""

input_style = "font-size: 18px; padding: 8px; background-color: #333333; color: white; border-radius: 8px;"

label_style = "font-size: 26px; color: #FFDE59; font-weight: bold; margin: 10px 0;"

def apply_styles(app):
    app.setStyleSheet("""
        QMainWindow {
            background: qlineargradient(
                x1: 0, y1: 0, x2: 1, y2: 1,
                stop: 0 #101820, stop: 0.5 #282C34, stop: 1 #0A0A0A
            );
            color: #C0C0C0;
            font-family: Arial;
        }
    """)
