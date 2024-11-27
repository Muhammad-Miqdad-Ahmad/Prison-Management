# # from PyQt5.QtCore import QPropertyAnimation, QEasingCurve
# # from PyQt5.QtWidgets import QGraphicsOpacityEffect

# # # In styles.py (darker theme)
# # MAIN_WINDOW_STYLE = """
# #     QMainWindow {
# #         background: qlineargradient(
# #             x1: 0, y1: 0, x2: 1, y2: 1,
# #             stop: 0 #212121, stop: 0.5 #616161, stop: 1 #000000
# #         );
# #         color: #F0F0F0;
# #         font-family: "Courier New";
# #     }
# # """
# # LABEL_STYLE = "font-size: 28px; color: #FF3333; font-weight: bold; margin: 10px 0; text-shadow: 1px 1px 3px #000;"
# # BUTTON_STYLE = """
# #     QPushButton {
# #         font-size: 20px; background-color: #FF4500; color: white; padding: 12px 24px;
# #         border-radius: 10px; border: 2px solid #B22222;
# #         transition: background-color 0.5s ease, border 0.5s ease;
# #     }
# #     QPushButton:hover {
# #         background-color: #FF6347;
# #         border: 2px solid #8B0000;
# #     }
# # """

# # INPUT_STYLE = "font-size: 18px; padding: 8px; background-color: #333333; color: white; border-radius: 8px;"

# # def apply_fade_effect(widget, duration=500):
# #     opacity_effect = QGraphicsOpacityEffect()
# #     widget.setGraphicsEffect(opacity_effect)
# #     animation = QPropertyAnimation(opacity_effect, b"opacity")
# #     animation.setDuration(duration)
# #     animation.setStartValue(0)
# #     animation.setEndValue(1)
# #     animation.setEasingCurve(QEasingCurve.InOutQuad)
# #     animation.start()
# #     return animation
# # # In styles.py
# # def apply_fade_out_effect(widget, duration=500):
# #     opacity_effect = QGraphicsOpacityEffect()
# #     widget.setGraphicsEffect(opacity_effect)
# #     animation = QPropertyAnimation(opacity_effect, b"opacity")
# #     animation.setDuration(duration)
# #     animation.setStartValue(1)
# #     animation.setEndValue(0)
# #     animation.setEasingCurve(QEasingCurve.InOutQuad)
# #     animation.start()
# #     return animation

# BUTTON_STYLE = """
#     QPushButton {
#         font-size: 18px; background-color: #F64C72; color: white; padding: 12px 24px;
#         border-radius: 8px;
#     }
#     QPushButton:hover {
#         background-color: #EA3451;
#     }
# """

# LABEL_STYLE = """
#     font-size: 24px; color: #FBEAEB; font-weight: bold; margin: 10px 0;
# """
