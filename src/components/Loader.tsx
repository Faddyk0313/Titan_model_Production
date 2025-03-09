import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress(); // Get loading progress percentage
  return (
    <Html center>
      <div className="font-semibold whitespace-nowrap">{progress.toFixed(0)}% Model Loaded</div>
    </Html>
  );
};


export default Loader;
