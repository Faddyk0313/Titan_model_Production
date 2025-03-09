import { useEffect, useState } from 'react'
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { LuEye, LuEyeOff, LuTimerReset } from "react-icons/lu";
import { IoMdShare } from "react-icons/io";
import jsPDF from "jspdf";

const ControlButtons = ({modelRef, orbitControlsRef, selectedVariant, setCameraPos, setTakingImage}: any) => {
    
      const [showControls, setShowControls] = useState<boolean>(true);
    
    const cameraAngles: { position: [number, number, number], label: string; }[] = [
        { position: [-2, 0, 3], label: "Front Left View" },
    { position: [2, 0, 3], label: "Front Right View" },
    { position: [-2, 0, -3], label: "Back Left View" },
    { position: [2, 0, -3], label: "Back Right View" },
  ];

    
    const captureAllSides = async () => {
        resetView(); // Reset view before capturing images
        await new Promise(resolve => setTimeout(resolve, 100)); // ✅ Small delay to ensure frame is ready
    
        const pdf = new jsPDF();
        const marginX = 10;
        const marginY = 50;
        // Mobile
        // const gridWidth = 110; // Increased max width (was 80)
        // const gridHeight = 110; // Increased max height (was 80)
        const gridWidth = 110; // Increased max width (was 80)
        const gridHeight = 110; // Increased max height (was 80)
        const currentDate = new Date().toLocaleDateString();
    
        pdf.text("Titan BattleGear T-Shirt", 10, 10);
        pdf.text("PDF Saved on: " + currentDate, 10, 30);
    
        for (let i = 0; i < cameraAngles.length; i++) {
          setCameraPos(cameraAngles[i].position);
          await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for camera update
    
          const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
          if (!canvas) return;
    
          const imageDataURL = canvas.toDataURL("image/png");
    
          // ✅ Get the correct aspect ratio
          const aspectRatio = canvas.width / canvas.height;
          let finalWidth = gridWidth;
          let finalHeight = gridHeight;
    
          if (aspectRatio > 1) {
            finalHeight = gridWidth / aspectRatio;
          } else {
            finalWidth = gridHeight * aspectRatio;
          }
    
          // ✅ 2x2 Grid Placement
          const col = i % 2;
          const row = Math.floor(i / 2);
          // Mobile
          // const posX = marginX + col * (gridWidth + 0); // Increased spacing
          // const posY = marginY + row * (gridHeight + 0); // More spacing for labels
          const posX = marginX + col * (gridWidth + 0); // Increased spacing
          const posY = marginY + row * (gridHeight + 0); // More spacing for labels
    
          pdf.text(cameraAngles[i].label, posX, posY);
          // Mobile
          // pdf.addImage(imageDataURL, "PNG", posX - 10, posY - 10, finalWidth, finalHeight);
          pdf.addImage(imageDataURL, "PNG", posX - 10, posY - 10, finalWidth, finalHeight);
        }
    
        setCameraPos([0, 0, 5]);
    
        pdf.save("3d_model_grid.pdf");
    
        // ✅ Clear buffer
        const gl = document.querySelector("canvas")?.getContext("webgl");
        if (gl) {
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
      };
      // Define zoom limits
      const MIN_ZOOM = 0.5;
      const MAX_ZOOM = 3.5;
      const ZOOM_STEP = 0.1;
    
      // ✅ Zoom Functions
      const zoomIn = () => {
        if (orbitControlsRef.current) {
          const camera = orbitControlsRef.current.object;
          camera.position.z = Math.max(camera.position.z - ZOOM_STEP, MIN_ZOOM);
          orbitControlsRef.current.update();
        }
      };
    
      const zoomOut = () => {
        if (orbitControlsRef.current) {
          const camera = orbitControlsRef.current.object;
          camera.position.z = Math.min(camera.position.z + ZOOM_STEP, MAX_ZOOM);
          orbitControlsRef.current.update();
        }
      };
      // ✅ Rotation Functions
      const rotateLeft = () => {
        modelRef.current?.rotateLeft();
      };
    
      const rotateRight = () => {
        modelRef.current?.rotateRight();
      };
    
      // ✅ Reset View Function
      const resetView = () => {
        if (orbitControlsRef.current) {
          const camera = orbitControlsRef.current.object;
          camera.position.set(0, 0, 2); // Reset zoom
          orbitControlsRef.current.target.set(0, 0, 0);
          orbitControlsRef.current.update();
        }
    
        // ✅ Call model's exposed resetRotation() method
        if (modelRef.current) {
          modelRef.current.resetRotation();
        }
      };
    
      useEffect(() => {
        resetView();
      }, [selectedVariant]);
    
  return (
    <div className={`absolute top-0 left-0 shadow-[2px_2px_15px_#aaaaaafa] bg-white transition-all duration-300 ease-in-out ${showControls ? 'h-[230px] max-h-[230px]' : 'h-8 max-h-8'} flex flex-col border rounded-xl overflow-clip z-10`}>
            <button onClick={() => setShowControls(!showControls)} title={`${showControls ? 'Hide Controls' : 'Show Controls'} `} className=" cursor-pointer bg-gray-400 px-4 py-2">{showControls ? <LuEye /> : <LuEyeOff />} </button>
            <button onClick={zoomIn} title="Zoom In" className="cursor-pointer px-4 py-2 border-t  "><MdOutlineZoomIn /></button>
            <button onClick={zoomOut} title="Zoom Out" className="cursor-pointer px-4 py-2 border-t "><MdOutlineZoomOut /></button>
            <button onClick={rotateLeft} title="Rotate Left" className="cursor-pointer px-4 py-2 border-t "><GrRotateLeft /></button>
            <button onClick={rotateRight} title="Rotate Right" className="cursor-pointer px-4 py-2 border-t "><GrRotateRight /></button>
            <button onClick={resetView} title="Reset View" className="cursor-pointer px-4 py-2 border-t "><LuTimerReset /></button>
            <button onClick={() => { setTakingImage(true); captureAllSides(); }} title="Share Design" className="cursor-pointer px-4 py-2 border-t "><IoMdShare /></button>
          </div>
  )
}

export default ControlButtons
