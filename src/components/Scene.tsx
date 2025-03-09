// import { Canvas, useLoader, useThree } from "@react-three/fiber";
// // import { Center, Decal, Grid, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
// import { Decal, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
// import { forwardRef, Suspense, useEffect, useImperativeHandle, useRef, useState } from "react";
// import * as THREE from "three";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// import Loader from "./Loader";
// import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
// import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
// import { LuEye, LuEyeOff, LuTimerReset } from "react-icons/lu";
// import { IoMdShare } from "react-icons/io";
// import jsPDF from "jspdf";
// import { a, useSpring } from "@react-spring/three";


// interface SceneProps {
//   uploadedLogos: string;
//   setUploadedLogos: React.Dispatch<React.SetStateAction<string>>;
//   logoSize: number;
//   colors: string[];
//   setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
//   selectedVariant: string;
// }

// interface ShirtModelProps {
//   uploadedLogos: string;
//   setUploadedLogos?: React.Dispatch<React.SetStateAction<string>>;
//   logoSize: number;
//   colors: string[];
//   setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
//   cameraPos: [number, number, number];
//   selectedVariant: string;
// }

// // ✅ **Fix: Move `useThree()` Into This Component Inside `<Canvas>`**
// const CameraUpdater: React.FC<{ cameraPos: [number, number, number]; }> = ({ cameraPos }) => {
//   const { camera } = useThree();

//   useEffect(() => {
//     camera.position.set(...cameraPos);
//     camera.lookAt(0, 0, 0);
//   }, [cameraPos]);

//   return null;
// };

// const ShirtModel = forwardRef(({ selectedVariant, uploadedLogos, logoSize, colors, setSelectedColors, cameraPos }: ShirtModelProps, ref) => {

//   const { camera } = useThree();
//   // console.log(setUploadedLogos)
//   const variantName = selectedVariant?.charAt(0).toUpperCase() + selectedVariant?.slice(1).toLowerCase();
//   // console.log("VariantName", variantName);
//   const { scene, nodes, materials } = useGLTF(`/${selectedVariant}Final2.glb`) as unknown as {
//     scene: THREE.Scene;
//     nodes: Record<string, THREE.Mesh>;
//     materials: Record<string, THREE.MeshPhysicalMaterial>;
//   };

//   const modelRef = useRef<THREE.Group>(null);

//   // Load all uploaded logos as textures
//   const logoTextures = useTexture(uploadedLogos);

//   // Store image dimensions for aspect ratio
//   const [imageSizes, setImageSizes] = useState<{ width: number ; height: number; }>({width: 1, height: 1});

//   // Rotation animation when model loads
//   const [spring] = useSpring(() => ({
//     from: { rotY: Math.PI * 2, scale: 0.6 },
//     to: { rotY: 0, scale: 1 },
//     reset: true, // Ensure animation resets when values change
//     config: { mass: 10, tension: 150, friction: 75 },
//   }), [selectedVariant]); // <-- Dependency added

//   const getDecalScale = (width: number, height: number, size: number): [number, number, number] => {
//     const aspectRatio = width / height;

//     return aspectRatio > 1
//       ? [size, size / aspectRatio, 0.25] // Wider image
//       : [size * aspectRatio, size, 0.25]; // Taller image
//   };

//   // const { gl } = useThree();

//   // const resetWebGLContext = () => {
//   //   gl.dispose(); // Forcefully clear WebGL memory
//   //   gl.forceContextLoss();

//   //   const context = gl.getContext();
//   //   if (context) {
//   //     const ext = context.getExtension("WEBGL_lose_context");
//   //     if (ext) ext.loseContext();
//   //   }
//   // };


//   useEffect(() => {
//     if (selectedVariant === "BATTLE") {
//       setSelectedColors(["#ff4d00", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF"]);
//     }
//     else if (selectedVariant === "CONQUER") {
//       setSelectedColors(["#00833e", "#FFFFFF", "#00833e", "#ffcd00", "#00833e", "#ffcd00", "#00833e", "#ffcd00", "#ffcd00"]);
//     }
//     else if (selectedVariant === "POWER") {
//       setSelectedColors(["#0033a1", "#000000", "#FFFFFF", "#0033a1", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#000000"]);
//     }
//     else if (selectedVariant === "BROADSTREET") {
//       setSelectedColors(["#000000", "#FFFFFF", "#ff4d00", "#a7a8a9", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF"]);
//     }
//     else if (selectedVariant === "ASSAULT") {
//       setSelectedColors(["#ff008b", "#00adee", "#000000", "#FFFFFF", "#000000"]);
//     }
//     else if (selectedVariant === "DOMINATE") {
//       setSelectedColors(["#72253d", "#a7a8a9", "#FFFFFF", "#72253d", "#FFFFFF", "#FFFFFF"]);
//     }
//     else if (selectedVariant === "CLASH") {
//       setSelectedColors(["#2b354b", "#ff4d00", "#00adee", "#FFFFFF", "#00adee", "#FFFFFF"]);
//     }
//     else if (selectedVariant === "BLADE") {
//       setSelectedColors(["#ce0e2d", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF"]);
//     }
//   }, [selectedVariant]);

//   // ✅ Properly Typed Disposal Logic
//   useEffect(() => {
//     return () => {
//       console.log("Disposing old model:", selectedVariant);

//       scene.traverse((child: THREE.Object3D) => {
//         if ((child as THREE.Mesh).isMesh) {
//           const mesh = child as THREE.Mesh;
//           if (mesh.geometry) mesh.geometry.dispose();
//           if (mesh.material) {
//             if (Array.isArray(mesh.material)) {
//               mesh.material.forEach((mat: THREE.Material) => mat.dispose());
//             } else {
//               (mesh.material as THREE.Material).dispose();
//             }
//           }
//         }
//       });

//       useGLTF.clear(`/${selectedVariant}Final2.glb`);
//       // resetWebGLContext();

//     };
//   }, [selectedVariant]); // Run disposal when model changes


//   useEffect(() => {
//     // Extract image dimensions
//     let sizes: { width: number; height: number; };

//     const img = new Image();
//     img.src = uploadedLogos;
//     img.onload = () => {
//       sizes = { width: img.width, height: img.height };
//       setImageSizes(sizes); // Update state with new sizes
//     };
//   }, [uploadedLogos]);

//   useEffect(() => {
//     camera.position.set(...cameraPos);
//     camera.lookAt(0, 0, 0);
//   }, [cameraPos]); // ✅ Updates camera when cameraPosition changes

//   // ✅ Expose Rotation Methods to Parent
//   useImperativeHandle(ref, () => ({
//     rotateLeft: () => {
//       if (modelRef.current) {
//         modelRef.current.rotation.y += 0.5;
//       }
//     },
//     rotateRight: () => {
//       if (modelRef.current) {
//         modelRef.current.rotation.y -= 0.5;
//       }
//     },
//     resetRotation: () => {
//       if (modelRef.current) {
//         modelRef.current.rotation.y = 0; // Reset rotation
//         modelRef.current.updateMatrixWorld(); // Ensure transformation is applied
//       }
//     },
//   }));

//   useEffect(() => {

//     if (!colors.length) return;

//     // Extract material keys that match the pattern dynamically
//     const materialKeys = Object.keys(materials);

//     materialKeys.forEach((matKey, index) => {
//       const material = materials[matKey];

//       if (!material) return; // Safety check
//       // console.log("material", material);

//       // Apply color from the colors array, cycling if fewer colors than materials
//       const color = colors[index % colors.length];

//       material.color.set(color);
//       material.roughness = 1; // Higher roughness for fabric
//       material.metalness = 0; // Non-metallic
//       material.sheen = 1; // Fabric-like highlights
//       material.clearcoat = 1; // Light clearcoat for depth
//       material.clearcoatRoughness = 0.9; // Keep clearcoat realistic
//       material.opacity = 1;

//       // Ensure the last material has a black emissive color
//       if (index === materialKeys.length - 1) {
//         material.emissive.set('#000000');
//       }
//     });
//   }, [colors, variantName]);

//   // console.log("colors", colors);

//   // const DecalCode = () => {
//   //   // Helper function to calculate proportional scale
//   //   const getDecalScale = (width: number, height: number, size: number): [number, number, number] => {
//   //     const aspectRatio = width / height;

//   //     return aspectRatio > 1
//   //       ? [size, size / aspectRatio, 0.25] // Wider image
//   //       : [size * aspectRatio, size, 0.25]; // Taller image
//   //   };
//   //   return (
//   //     <>
//   //       {logoTextures.map((logo, idx) => {
//   //         const size = imageSizes[idx] || { width: 1, height: 1 };
//   //         return (
//   //           <Decal
//   //             key={idx}
//   //             // debug
//   //             position={[0, 1.38, 0.06]}
//   //             rotation={[0, 0, 0]} // Auto-rotation towards [0,0,0]
//   //             scale={getDecalScale(size.width, size.height, logoSize)} // Dynamic scaling
//   //           >
//   //             <meshBasicMaterial
//   //               map={logo}
//   //               transparent
//   //               polygonOffset
//   //               polygonOffsetFactor={-1}
//   //             />
//   //           </Decal>
//   //         );
//   //       })}
//   //     </>
//   //   );
//   // };


//   return (
//     <a.group ref={modelRef} rotation-y={spring.rotY} scale={spring.scale} dispose={null}>

//       {Object.entries(nodes).map(([key, node], index) => {
//         if (key === "Scene") return null;

//         // Find matching material
//         const materialKey = Object.keys(materials).find((mat) => mat.includes(key.split('_').slice(-1)[0]));
//         // console.log("index", index);
//         // console.log("materialKey", materialKey);
//         return materialKey ? (
//           <mesh
//             key={key}
//             castShadow
//             receiveShadow
//             geometry={node.geometry}
//             material={materials[materialKey]}
//             position={[0, -1.38, 0.06]}
//           >
//             {index === 1 && logoTextures && (
//               <Decal
//                 // debug
//                 position={[0, 1.41, 0.06]}
//                 rotation={[0, 0, 0]} // Auto-rotation towards [0,0,0]
//                 scale={getDecalScale(imageSizes.width, imageSizes.height, logoSize)} // Dynamic scaling
//               >
//                 <meshBasicMaterial
//                   map={logoTextures}
//                   transparent
//                   polygonOffset
//                   polygonOffsetFactor={-1}
//                 />
//               </Decal>
//             )}
//           </mesh>
//         ) : null;
//       })}

//       {/* {selectedVariant === "BATTLE" && <Battle nodes={nodes} materials={materials} DecalCode={DecalCode} />}
//       {selectedVariant === "CONQUER" && <CONQUER nodes={nodes} materials={materials} DecalCode={DecalCode} />}
//       {selectedVariant === "POWER" && <CONQUER nodes={nodes} materials={materials} DecalCode={DecalCode} />}
//       {selectedVariant === "ASSAULT" && <ASSAULT nodes={nodes} materials={materials} DecalCode={DecalCode} />}
//       {selectedVariant === "BROADSTREET" && <BROADSTREET nodes={nodes} materials={materials} DecalCode={DecalCode} />}
//       {selectedVariant === "DOMIATE" && <CONQUER nodes={nodes} materials={materials} DecalCode={DecalCode} />}
//       {selectedVariant === "CLASH" && <CLASH nodes={nodes} materials={materials} DecalCode={DecalCode} />}
//       {selectedVariant === "BLADE" && <BLADE nodes={nodes} materials={materials} DecalCode={DecalCode} />} */}

//     </a.group>
//   );
// });

// const Scene = ({ uploadedLogos, setUploadedLogos, logoSize, colors, setSelectedColors, selectedVariant }: SceneProps) => {
//   // const Scene = ({ uploadedLogos, setUploadedLogos, logoSize, setLogoSize, colors, selectedVariant }: SceneProps) => {
//   const [showControls, setShowControls] = useState<boolean>(true);
//   const hdriTexture = useLoader(RGBELoader, "/venice_sunset_1k.hdr") as THREE.Texture;
//   useEffect(() => {
//     if (hdriTexture) {
//       hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
//     }
//   }, [hdriTexture]);

//   // Function to zoom in (respects minDistance)
//   const modelRef = useRef<any>(null);
//   const orbitControlsRef = useRef<any>(null);

//   // Define zoom limits
//   const MIN_ZOOM = 0.5;
//   const MAX_ZOOM = 3.5;
//   const ZOOM_STEP = 0.1;

//   // ✅ Zoom Functions
//   const zoomIn = () => {
//     if (orbitControlsRef.current) {
//       const camera = orbitControlsRef.current.object;
//       camera.position.z = Math.max(camera.position.z - ZOOM_STEP, MIN_ZOOM);
//       orbitControlsRef.current.update();
//     }
//   };

//   const zoomOut = () => {
//     if (orbitControlsRef.current) {
//       const camera = orbitControlsRef.current.object;
//       camera.position.z = Math.min(camera.position.z + ZOOM_STEP, MAX_ZOOM);
//       orbitControlsRef.current.update();
//     }
//   };
//   // ✅ Rotation Functions
//   const rotateLeft = () => {
//     modelRef.current?.rotateLeft();
//   };

//   const rotateRight = () => {
//     modelRef.current?.rotateRight();
//   };

//   // ✅ Reset View Function
//   const resetView = () => {
//     if (orbitControlsRef.current) {
//       const camera = orbitControlsRef.current.object;
//       camera.position.set(0, 0, 2); // Reset zoom
//       orbitControlsRef.current.target.set(0, 0, 0);
//       orbitControlsRef.current.update();
//     }

//     // ✅ Call model's exposed resetRotation() method
//     if (modelRef.current) {
//       modelRef.current.resetRotation();
//     }
//   };

//   useEffect(() => {
//     resetView();
//   }, [selectedVariant]);

//   const [cameraPos, setCameraPos] = useState<[number, number, number]>([0, 0, 5]);

//   const cameraAngles: { position: [number, number, number], label: string; }[] = [
//     { position: [-2, 0, 3], label: "Front Left View" },
//     { position: [2, 0, 3], label: "Front Right View" },
//     { position: [-2, 0, -3], label: "Back Left View" },
//     { position: [2, 0, -3], label: "Back Right View" },
//   ];

//   const [takingImage, setTakingImage] = useState<boolean>(false);

//   const captureAllSides = async () => {
//     resetView(); // Reset view before capturing images
//     await new Promise(resolve => setTimeout(resolve, 100)); // ✅ Small delay to ensure frame is ready

//     const pdf = new jsPDF();
//     const marginX = 10;
//     const marginY = 50;
//     // Mobile
//     // const gridWidth = 110; // Increased max width (was 80)
//     // const gridHeight = 110; // Increased max height (was 80)
//     const gridWidth = 110; // Increased max width (was 80)
//     const gridHeight = 110; // Increased max height (was 80)
//     const currentDate = new Date().toLocaleDateString();

//     pdf.text("Titan BattleGear T-Shirt", 10, 10);
//     pdf.text("PDF Saved on: " + currentDate, 10, 30);

//     for (let i = 0; i < cameraAngles.length; i++) {
//       setCameraPos(cameraAngles[i].position);
//       await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for camera update

//       const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
//       if (!canvas) return;

//       const imageDataURL = canvas.toDataURL("image/png");

//       // ✅ Get the correct aspect ratio
//       const aspectRatio = canvas.width / canvas.height;
//       let finalWidth = gridWidth;
//       let finalHeight = gridHeight;

//       if (aspectRatio > 1) {
//         finalHeight = gridWidth / aspectRatio;
//       } else {
//         finalWidth = gridHeight * aspectRatio;
//       }

//       // ✅ 2x2 Grid Placement
//       const col = i % 2;
//       const row = Math.floor(i / 2);
//       // Mobile
//       // const posX = marginX + col * (gridWidth + 0); // Increased spacing
//       // const posY = marginY + row * (gridHeight + 0); // More spacing for labels
//       const posX = marginX + col * (gridWidth + 0); // Increased spacing
//       const posY = marginY + row * (gridHeight + 0); // More spacing for labels

//       pdf.text(cameraAngles[i].label, posX, posY);
//       // Mobile
//       // pdf.addImage(imageDataURL, "PNG", posX - 10, posY - 10, finalWidth, finalHeight);
//       pdf.addImage(imageDataURL, "PNG", posX - 10, posY - 10, finalWidth, finalHeight);
//     }

//     setCameraPos([0, 0, 5]);

//     pdf.save("3d_model_grid.pdf");

//     // ✅ Clear buffer
//     const gl = document.querySelector("canvas")?.getContext("webgl");
//     if (gl) {
//       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     }
//   };

//   return (
//     <div className={` ${takingImage ? 'md:max-w-[380px]  lg:max-w-[700px]' : ''} mx-auto h-[320px] max-h-[320px] lg:h-[750px] lg:max-h-[750px]`}>
//       {/* Control Buttons */}
//       <div className={`absolute top-0 left-0 shadow-[2px_2px_15px_#aaaaaafa] bg-white transition-all duration-300 ease-in-out ${showControls ? 'max-h-[230px]' : 'max-h-8'} flex flex-col border rounded-xl overflow-clip z-10`}>
//         <button onClick={() => setShowControls(!showControls)} title={`${showControls ? 'Hide Controls' : 'Show Controls'} `} className="flex items-center justify-center cursor-pointer bg-gray-400 py-2">{showControls ? <LuEye className="w-8" /> : <LuEyeOff className="w-8" />} </button>
//         <button onClick={zoomIn} title="Zoom In" className="cursor-pointer py-2 border-t  "><MdOutlineZoomIn className="w-8"  /></button>
//         <button onClick={zoomOut} title="Zoom Out" className="cursor-pointer py-2 border-t "><MdOutlineZoomOut className="w-8"  /></button>
//         <button onClick={rotateLeft} title="Rotate Left" className="cursor-pointer py-2 border-t "><GrRotateLeft className="w-8"  /></button>
//         <button onClick={rotateRight} title="Rotate Right" className="cursor-pointer py-2 border-t "><GrRotateRight className="w-8"   /></button>
//         <button onClick={resetView} title="Reset View" className="cursor-pointer py-2 border-t "><LuTimerReset className="w-8"  /></button>
//         <button onClick={() => { setTakingImage(true); captureAllSides(); }} title="Share Design" className="cursor-pointer py-2 border-t "><IoMdShare className="w-8"  /></button>
//       </div>
//       <Canvas
//         camera={{ position: [0, 0, 0], fov: 40 }}
//         shadows
//         gl={{ preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: colors[0] === "#000000" ? 1.5 : 1.0 }}
//         // gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: colors[0] === "#000000" ? 1.5 : 1.0 }}
//         className={`w-full ${takingImage ? 'md:max-w-[380px] lg:max-w-[700px]' : ''} mx-auto  h-[320px] max-h-[320px] lg:h-[750px] lg:max-h-[750px]`}
//       >
//         <CameraUpdater cameraPos={cameraPos} />

//         {/* ✅ HDRI Lighting for Realistic Reflections */}
//         {/* <primitive object={hdriTexture} attach="background" /> */}
//         <primitive object={hdriTexture} attach="environment" />

//         <directionalLight position={[-5, 4, 5]} intensity={1} />
//         {/* Black color light */}
//         {/* <directionalLight position={[0, 0, 10]} intensity={1} /> */}
//         <Suspense fallback={<Loader />}>
//           {/* <ShirtModel ref={modelRef} uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos} logoSize={logoSize} setLogoSize={setLogoSize} logoPosition={logoPosition} cameraPos={cameraPos} colors={colors} /> */}
//           <ShirtModel ref={modelRef} selectedVariant={selectedVariant} uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos} logoSize={logoSize} cameraPos={cameraPos} colors={colors} setSelectedColors={setSelectedColors} />
//         </Suspense>
//         {/* <Grid /> */}
//         <OrbitControls
//           ref={orbitControlsRef}
//           enableZoom={true} // Ensure zoom is enabled
//           minDistance={0.4}   // Set the minimum zoom distance
//           maxDistance={1.5}   // Set the maximum zoom distance
//         />
//       </Canvas>
//     </div>

//   );
// };

// export default Scene;



import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {  OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import Loader from "./Loader";
import ShirtModel from "./ShirtModel";
import ControlButtons from "./ControlButtons";

interface SceneProps {
  uploadedLogos: string;
  setUploadedLogos: React.Dispatch<React.SetStateAction<string>>;
  logoSize: number;
  colors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedVariant: string;
}

// ✅ **Fix: Move `useThree()` Into This Component Inside `<Canvas>`**
const CameraUpdater: React.FC<{ cameraPos: [number, number, number]; }> = ({ cameraPos }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...cameraPos);
    camera.lookAt(0, 0, 0);
  }, [cameraPos]);

  return null;
};

const Scene = ({ uploadedLogos, setUploadedLogos, logoSize, colors, setSelectedColors, selectedVariant }: SceneProps) => {
  const hdriTexture = useLoader(RGBELoader, "/venice_sunset_1k.hdr") as THREE.Texture;
  useEffect(() => {
    if (hdriTexture) {
      hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
    }
  }, [hdriTexture]);

  // Function to zoom in (respects minDistance)
  const modelRef = useRef<any>(null);
  const orbitControlsRef = useRef<any>(null);

  const [cameraPos, setCameraPos] = useState<[number, number, number]>([0, 0, 5]);
  const [takingImage, setTakingImage] = useState<boolean>(false);

  return (
    <div className={` ${takingImage ? 'md:max-w-[380px]  lg:max-w-[700px]' : ''} mx-auto h-[320px] max-h-[320px] lg:h-[750px] lg:max-h-[750px]`}>
      {/* Control Buttons */}
      <ControlButtons modelRef={modelRef} orbitControlsRef={orbitControlsRef} selectedVariant={selectedVariant} setCameraPos={setCameraPos} setTakingImage={setTakingImage} />
      <Canvas
        camera={{ position: [0, 0, 0], fov: 40 }}
        shadows
        gl={{ preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: colors[0] === "#000000" ? 1.5 : 1.0 }}
        className={`w-full ${takingImage ? 'md:max-w-[380px] lg:max-w-[700px]' : ''} mx-auto h-[320px] max-h-[320px] lg:h-[750px] lg:max-h-[750px]`}
      >
        <CameraUpdater cameraPos={cameraPos} />

        <primitive object={hdriTexture} attach="environment" />

        <directionalLight position={[-5, 4, 5]} intensity={1} />
        <Suspense fallback={<Loader />}>
          <ShirtModel ref={modelRef} selectedVariant={selectedVariant} uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos} logoSize={logoSize} cameraPos={cameraPos} colors={colors} setSelectedColors={setSelectedColors} />
        </Suspense>
        <OrbitControls
          ref={orbitControlsRef}
          enableZoom={true} // Ensure zoom is enabled
          minDistance={0.4}   // Set the minimum zoom distance
          maxDistance={1.5}   // Set the maximum zoom distance
        />
      </Canvas>
    </div>

  );
};

export default Scene;

