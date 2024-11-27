import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Component for the rotating GLTF object
const RotatingModel = ({ url, position }) => {
  const ref = useRef();
  const model = useGLTF(url);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.015; // Rotate the model on the Y-axis
      ref.current.rotation.x = 1.5;
    }
  });

  return <primitive object={model.scene} ref={ref} position={position} />;
};

// Main App Component
function PoliceLogo() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <directionalLight position={[3, 3, 9]} intensity={1} />
      <ambientLight intensity={0.5} />
      <RotatingModel url="policeLogo.gltf" position={[0, 0, -9]} />
      {/* x is horizontal
          y is depth
          z is vertical */}
      <OrbitControls />
    </Canvas>
  );
}

export default PoliceLogo;
