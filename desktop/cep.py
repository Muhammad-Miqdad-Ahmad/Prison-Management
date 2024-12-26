import sys
import cv2
import numpy as np
from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QLabel, QPushButton, QSlider, QFileDialog, QComboBox
)
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap, QImage


class ImageAdjusterApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Image Brightness and Contrast Adjuster")
        self.setGeometry(100, 100, 800, 700)

        # Variables for image processing
        self.image = None
        self.adjusted_image = None
        self.technique = "Scaling"  # Default technique

        # UI Components
        self.init_ui()

    def init_ui(self):
        # Label for displaying the image
        self.image_label = QLabel("No Image Loaded", self)
        self.image_label.setAlignment(Qt.AlignCenter)
        self.image_label.setGeometry(50, 50, 700, 400)

        # Dropdown for selecting the technique
        self.technique_dropdown = QComboBox(self)
        self.technique_dropdown.setGeometry(150, 470, 200, 30)
        self.technique_dropdown.addItems(["Scaling", "Fourier Transform"])
        self.technique_dropdown.currentTextChanged.connect(self.set_technique)

        # Brightness slider and label
        self.brightness_slider = QSlider(Qt.Horizontal, self)
        self.brightness_slider.setGeometry(150, 510, 500, 30)
        self.brightness_slider.setMinimum(-255)
        self.brightness_slider.setMaximum(255)
        self.brightness_slider.setValue(0)
        self.brightness_slider.valueChanged.connect(self.update_image)

        self.brightness_label = QLabel("Brightness: 0", self)
        self.brightness_label.setGeometry(660, 510, 120, 30)

        # Contrast slider and label
        self.contrast_slider = QSlider(Qt.Horizontal, self)
        self.contrast_slider.setGeometry(150, 550, 500, 30)
        self.contrast_slider.setMinimum(10)
        self.contrast_slider.setMaximum(300)
        self.contrast_slider.setValue(100)
        self.contrast_slider.valueChanged.connect(self.update_image)

        self.contrast_label = QLabel("Contrast: 1.00", self)
        self.contrast_label.setGeometry(660, 550, 120, 30)

        # Buttons
        self.load_button = QPushButton("Load Image", self)
        self.load_button.setGeometry(50, 600, 100, 30)
        self.load_button.clicked.connect(self.load_image)

        self.save_button = QPushButton("Save Adjusted Image", self)
        self.save_button.setGeometry(650, 600, 150, 30)
        self.save_button.clicked.connect(self.save_image)

    def set_technique(self, technique):
        """Set the selected technique."""
        self.technique = technique
        print(f"Technique selected: {self.technique}")
        self.update_image()

    def load_image(self):
        """Load an image file."""
        file_name, _ = QFileDialog.getOpenFileName(self, "Open Image File", "", "Image Files (*.png *.jpg *.jpeg)")
        if file_name:
            # Load the image in color
            self.image = cv2.imread(file_name)
            self.display_image(self.image)

    def save_image(self):
        """Save the adjusted image."""
        if self.adjusted_image is not None:
            file_name, _ = QFileDialog.getSaveFileName(self, "Save Image File", "", "Image Files (*.png *.jpg *.jpeg)")
            if file_name:
                cv2.imwrite(file_name, self.adjusted_image)
                print(f"Image saved: {file_name}")
        else:
            print("No adjusted image to save.")

    def display_image(self, image):
        """Display the image on the QLabel."""
        if len(image.shape) == 3:  # Color image
            height, width, channel = image.shape
            bytes_per_line = 3 * width
            q_image = QImage(image.data, width, height, bytes_per_line, QImage.Format_BGR888)
        else:  # Grayscale image
            height, width = image.shape
            bytes_per_line = width
            q_image = QImage(image.data, width, height, bytes_per_line, QImage.Format_Grayscale8)

        pixmap = QPixmap.fromImage(q_image)
        self.image_label.setPixmap(pixmap.scaled(self.image_label.width(), self.image_label.height(), Qt.KeepAspectRatio))

    def update_image(self):
        """Update the image based on the selected technique."""
        if self.image is not None:
            # Get slider values
            brightness = self.brightness_slider.value()
            contrast = self.contrast_slider.value() / 100.0

            # Update labels
            self.brightness_label.setText(f"Brightness: {brightness}")
            self.contrast_label.setText(f"Contrast: {contrast:.2f}")

            if self.technique == "Scaling":
                # Scaling technique: Adjust brightness and contrast
                self.adjusted_image = cv2.convertScaleAbs(self.image, alpha=contrast, beta=brightness)

            elif self.technique == "Fourier Transform":
                # Fourier technique: Modify brightness in frequency domain
                gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
                f = np.fft.fft2(gray)
                fshift = np.fft.fftshift(f)

                # Add brightness adjustment to the frequency domain
                fshift += brightness
                f_ishift = np.fft.ifftshift(fshift)
                img_back = np.abs(np.fft.ifft2(f_ishift))

                # Apply contrast
                self.adjusted_image = cv2.convertScaleAbs(img_back, alpha=contrast, beta=0)
                self.adjusted_image = cv2.cvtColor(self.adjusted_image, cv2.COLOR_GRAY2BGR)

            self.display_image(self.adjusted_image)


def main():
    app = QApplication(sys.argv)
    window = ImageAdjusterApp()
    window.show()
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
