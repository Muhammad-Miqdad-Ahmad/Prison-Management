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
    }
  });

  return <primitive object={model.scene} ref={ref} position={position} />;
};

function Mouse() {
  const { mouse } = useThree();

  return useFrame(() => {
    console.log(mouse.x, mouse.y, mouse.z);
  });
}

// Main App Component
function PoliceLogo() {
  return (
    <Canvas camera={{ position: [0, 9, 0] }}>
      <directionalLight position={[4, 12, 0]} intensity={1} />
      <ambientLight intensity={0.5} />
      <Mouse/>
      <RotatingModel url="policeLogo.gltf" position={[0, 0, 0]} />
    </Canvas>
  );
}

export default PoliceLogo;
