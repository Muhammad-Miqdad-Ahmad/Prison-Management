import QtQuick 2.15
import QtQuick3D 1.15

Item {
    width: 800
    height: 200

    View3D {
        anchors.fill: parent
        camera: PerspectiveCamera {
            position: Qt.vector3d(0, 0, 10)
            lookAt: Qt.vector3d(0, 0, 0)
        }

        DirectionalLight {
            ambientColor: "white"
            intensity: 1.0
        }

        Model {
            source: "policeLogo.glb" // Ensure the logo file is in the same directory
            position: Qt.vector3d(0, 0, 0)
            scale: Qt.vector3d(1, 1, 1)
        }
    }
}
