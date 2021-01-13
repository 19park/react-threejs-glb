import React, { Suspense, useState } from "react";
//Three
import { Canvas, useThree } from "react-three-fiber";
import { Loader, OrbitControls, softShadows } from "@react-three/drei";
import { useSpring } from "react-spring";
import Lights from "./components/Three/lights";
import Floor from "./components/Three/floor";
//Styles
import "./assets/styles/App.scss";
//Model
import Model from "./components/Three/board";

// Initiate softShadows
softShadows();

// Create the zoom effect once the page has loaded
const ZoomWithOrbital = () => {
  const { gl, camera } = useThree();
  useSpring({
    from: {
      z: 30,
    },
    x: -5,
    y: 4,
    z: 120,
    // React Springs onFrame
    onFrame: ({ x, y, z }) => {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
    },
  });
  return (
    // Oribital controls via drei
    <OrbitControls
      enableZoom={true}
      enablePan={true}
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
    />
  );
};

const App = () => {
  // State if chest is open
  const [open, setOpen] = useState(false);
  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 4, 120], fov: 80 }}>
        <Lights />
        <Suspense fallback={null}>
          <Model />
          <Floor />
          <ZoomWithOrbital />
        </Suspense>
      </Canvas>
      {/* Loading bar */}
      <Loader />
    </>
  );
};

export default App;
