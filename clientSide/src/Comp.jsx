import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./App.css";

// Component for the rotating GLTF object
const RotatingModel = ({ url, position }) => {
  const ref = useRef();
  const model = useGLTF(url);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.01; // Rotate the model on the Y-axis
    }
  });

  return <primitive object={model.scene} ref={ref} position={position} />;
};

// Main App Component
function App() {
  return (
    <Canvas camera={{ position: [0, 9, 0] }}>
      <directionalLight position={[0, 9, 10]} intensity={4} />
      <ambientLight intensity={0.5} />
      <RotatingModel url="policeLogo.gltf" position={[0, 0, 0]} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
