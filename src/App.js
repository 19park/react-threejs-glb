import React, {Suspense} from "react";
//Three
import {Canvas, useThree} from "react-three-fiber";
import {Loader, OrbitControls, softShadows} from "@react-three/drei";
import {useSpring} from "react-spring";
import Lights from "./components/Three/lights";
import Floor from "./components/Three/floor";
//Styles
import "./assets/styles/App.scss";
//Model
import Model from "./components/Three/donut";

// Initiate softShadows
softShadows();

// Create the zoom effect once the page has loaded
const ZoomWithOrbital = () => {
  const { gl, camera } = useThree();
  useSpring({
    from: {
      z: 2,
    },
    x: -1,
    y: 1,
    z: 0,
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
  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-1, 0, 0], fov: 10 }}>
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
