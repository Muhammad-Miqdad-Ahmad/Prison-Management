import QtQuick 2.15
import QtQuick.Controls 2.15
import Qt3D.Core 2.15
import Qt3D.Render 2.15
import Qt3D.Extras 2.15

Entity {
    id: rootEntity

    components: [
        Transform {
            scale: Qt.vector3d(1.0, 1.0, 1.0)
            rotation: Qt.quaternion(0.0, 0.0, 0.0, 1.0)
            translation: Qt.vector3d(0.0, 0.0, 0.0)
        },
        PhongMaterial {
            diffuse: "yellow"  // Material color for the model
        }
    ]

    // Loading a 3D model (replace with your file path)
    Model {
        source: "policeLogo.glb"  // Path to your 3D model
        materials: [PhongMaterial {}]   // Optional, apply materials
        components: [
            Transform {
                scale: Qt.vector3d(1.0, 1.0, 1.0)
                translation: Qt.vector3d(0.0, 0.0, 0.0)
            }
        ]
    }
}
