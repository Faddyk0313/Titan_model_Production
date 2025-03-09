import { useThree } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";


interface ShirtModelProps {
    uploadedLogos: string;
    setUploadedLogos?: React.Dispatch<React.SetStateAction<string>>;
    logoSize: number;
    colors: string[];
    setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
    cameraPos: [number, number, number];
    selectedVariant: string;
}

const ShirtModel = forwardRef(({ selectedVariant, uploadedLogos, logoSize, colors, setSelectedColors, cameraPos }: ShirtModelProps, ref) => {

    const { camera } = useThree();
    const { nodes, materials } = useGLTF(`/Latest.glb`) as unknown as {
        scene: THREE.Scene;
        nodes: Record<string, THREE.Mesh>;
        materials: Record<string, THREE.MeshPhysicalMaterial>;
    };

    const modelRef = useRef<THREE.Group>(null);

    // Load all uploaded logos as textures
    const logoTextures = useTexture(uploadedLogos);

    // Store image dimensions for aspect ratio
    const [imageSizes, setImageSizes] = useState<{ width: number; height: number; }>({ width: 1, height: 1 });

    // Rotation animation when model loads
    const [spring] = useSpring(() => ({
        from: { rotY: Math.PI * 2, scale: 0.6 },
        to: { rotY: 0, scale: 1 },
        reset: true, // Ensure animation resets when values change
        config: { mass: 10, tension: 150, friction: 75 },
    }), [selectedVariant]); // <-- Dependency added

    useEffect(() => {
        if (selectedVariant === "BATTLE") {
            setSelectedColors(["#ff4d00", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#000000"]);
        }
        else if (selectedVariant === "CONQUER") {
            setSelectedColors(["#00833e", "#FFFFFF", "#00833e", "#ffcd00", "#00833e", "#ffcd00", "#00833e", "#ffcd00", "#000000"]);
        }
        else if (selectedVariant === "POWER") {
            setSelectedColors(["#0033a1", "#000000", "#FFFFFF", "#0033a1", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#000000"]);
        }
        else if (selectedVariant === "BROADSTREET") {
            setSelectedColors(["#000000", "#FFFFFF", "#ff4d00", "#a7a8a9", "#FFFFFF", "#000000", "#FFFFFF", "#000000"]);
        }
        else if (selectedVariant === "ASSAULT") {
            setSelectedColors(["#ff008b", "#00adee", "#000000", "#FFFFFF", "#000000"]);
        }
        else if (selectedVariant === "DOMINATE") {
            setSelectedColors(["#72253d", "#a7a8a9", "#FFFFFF", "#72253d", "#FFFFFF", "#000000"]);
        }
        else if (selectedVariant === "CLASH") {
            setSelectedColors(["#2b354b", "#ff4d00", "#00adee", "#FFFFFF", "#00adee", "#000000"]);
        }
        else if (selectedVariant === "BLADE") {
            setSelectedColors(["#ce0e2d", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#000000"]);
        }
    }, [selectedVariant]);


    useEffect(() => {
        // Extract image dimensions
        let sizes: { width: number; height: number; };

        const img = new Image();
        img.src = uploadedLogos;
        img.onload = () => {
            sizes = { width: img.width, height: img.height };
            setImageSizes(sizes); // Update state with new sizes
        };
    }, [uploadedLogos]);

    useEffect(() => {
        camera.position.set(...cameraPos);
        camera.lookAt(0, 0, 0);
    }, [cameraPos]); // ✅ Updates camera when cameraPosition changes

    // ✅ Expose Rotation Methods to Parent
    useImperativeHandle(ref, () => ({
        rotateLeft: () => {
            if (modelRef.current) {
                modelRef.current.rotation.y += 0.5;
            }
        },
        rotateRight: () => {
            if (modelRef.current) {
                modelRef.current.rotation.y -= 0.5;
            }
        },
        resetRotation: () => {
            if (modelRef.current) {
                modelRef.current.rotation.y = 0; // Reset rotation
                modelRef.current.updateMatrixWorld(); // Ensure transformation is applied
            }
        },
    }));

    const DecalCode = () => {
        // Helper function to calculate proportional scale
        const getDecalScale = (width: number, height: number, size: number): [number, number, number] => {
            const aspectRatio = width / height;

            return aspectRatio > 1
                ? [size, size / aspectRatio, 0.25] // Wider image
                : [size * aspectRatio, size, 0.25]; // Taller image
        };
        return (
            <>
                {logoTextures && (
                    <Decal
                        // debug
                        position={[0, 1.41, 0.06]}
                        rotation={[0, 0, 0]} // Auto-rotation towards [0,0,0]
                        scale={getDecalScale(imageSizes.width, imageSizes.height, logoSize)} // Dynamic scaling
                    >
                        <meshBasicMaterial
                            map={logoTextures}
                            transparent
                            polygonOffset
                            polygonOffsetFactor={-1}
                        />
                    </Decal>
                )}
            </>
        );
    };


    // Convert selectedVariant to Title Case
    const formattedVariant = useMemo(() => {
        return selectedVariant
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }, [selectedVariant]);

    // Update material opacity dynamically
    useMemo(() => {
        if (!materials || !colors.length) return;

        let colorIndex = 0;
        Object.keys(materials).forEach((key) => {
            if (key.includes(formattedVariant)) {
                console.log("Key", key);
                materials[key].roughness = 1; // Higher roughness for fabric
                materials[key].metalness = 0; // Non-metallic
                materials[key].sheen = 1; // Fabric-like highlights
                materials[key].clearcoat = 1; // Light clearcoat for depth
                materials[key].clearcoatRoughness = 0.9; // Keep clearcoat realistic
                materials[key].color.set(colors[colorIndex % colors.length]);
                materials[key].opacity = 1;
                colorIndex++;
            } else {
                materials[key].transparent = true;
                materials[key].opacity = 0;
            }
        });
    }, [formattedVariant, colors]);

    const meshes = [
        { key: "SC_Assault_SR_LS_SPC_Color_1001", material: "SC_Assault_SR_LS_SPC_Color 1", hasDecal: true },
        { key: "SC_Assault_SR_LS_SPC_Color_2001", material: "SC_Assault_SR_LS_SPC_Color 2" },
        { key: "SC_Assault_SR_LS_SPC_Color_3001", material: "SC_Assault_SR_LS_SPC_Color 3" },
        { key: "SC_Assault_SR_LS_SPC_Color_4001", material: "SC_Assault_SR_LS_SPC_Color 4" },
        { key: "SC_Assault_SR_LS_SPC_Color_5001", material: "SC_Assault_SR_LS_SPC_Color 5" },

        { key: "SC_Battle_SR_LS_SPC_Color_1001", material: "SC_Battle_SR_LS_SPC_Color 1", hasDecal: true },
        { key: "SC_Battle_SR_LS_SPC_Color_2001", material: "SC_Battle_SR_LS_SPC_Color 2" },
        { key: "SC_Battle_SR_LS_SPC_Color_3001", material: "SC_Battle_SR_LS_SPC_Color 3" },
        { key: "SC_Battle_SR_LS_SPC_Color_4001", material: "SC_Battle_SR_LS_SPC_Color 4" },
        { key: "SC_Battle_SR_LS_SPC_Color_5001", material: "SC_Battle_SR_LS_SPC_Color 5" },
        { key: "SC_Battle_SR_LS_SPC_Color_6001", material: "SC_Battle_SR_LS_SPC_Color 6" },

        { key: "SC_Blade_SR_LS_SPC_Color_1001", material: "SC_Blade_SR_LS_SPC_Color 1", hasDecal: true },
        { key: "SC_Blade_SR_LS_SPC_Color_2001", material: "SC_Blade_SR_LS_SPC_Color 2" },
        { key: "SC_Blade_SR_LS_SPC_Color_3001", material: "SC_Blade_SR_LS_SPC_Color 3" },
        { key: "SC_Blade_SR_LS_SPC_Color_4001", material: "SC_Blade_SR_LS_SPC_Color 4" },
        { key: "SC_Blade_SR_LS_SPC_Color_5001", material: "SC_Blade_SR_LS_SPC_Color 5" },
        { key: "SC_Blade_SR_LS_SPC_Color_6001", material: "SC_Blade_SR_LS_SPC_Color 6" },

        { key: "SC_Broadstreet_SR_LS_SPC_Color_1001", material: "SC_Broadstreet_SR_LS_SPC_Color 1", hasDecal: true },
        { key: "SC_Broadstreet_SR_LS_SPC_Color_2001", material: "SC_Broadstreet_SR_LS_SPC_Color 2" },
        { key: "SC_Broadstreet_SR_LS_SPC_Color_3001", material: "SC_Broadstreet_SR_LS_SPC_Color 3" },
        { key: "SC_Broadstreet_SR_LS_SPC_Color_4001", material: "SC_Broadstreet_SR_LS_SPC_Color 4" },
        { key: "SC_Broadstreet_SR_LS_SPC_Color_5001", material: "SC_Broadstreet_SR_LS_SPC_Color 5" },
        { key: "SC_Broadstreet_SR_LS_SPC_Color_6001", material: "SC_Broadstreet_SR_LS_SPC_Color 6" },
        { key: "SC_Broadstreet_SR_LS_SPC_Color_7001", material: "SC_Broadstreet_SR_LS_SPC_Color 7" },
        { key: "SC_Broadstreet_SR_LS_SPC_Color_8001", material: "SC_Broadstreet_SR_LS_SPC_Color 8" },

        { key: "SC_Clash_SR_LS_SPC_Color_1001", material: "SC_Clash_SR_LS_SPC_Color 1", hasDecal: true },
        { key: "SC_Clash_SR_LS_SPC_Color_2001", material: "SC_Clash_SR_LS_SPC_Color 2" },
        { key: "SC_Clash_SR_LS_SPC_Color_3001", material: "SC_Clash_SR_LS_SPC_Color 3" },
        { key: "SC_Clash_SR_LS_SPC_Color_4001", material: "SC_Clash_SR_LS_SPC_Color 4" },
        { key: "SC_Clash_SR_LS_SPC_Color_5001", material: "SC_Clash_SR_LS_SPC_Color 5" },
        { key: "SC_Clash_SR_LS_SPC_Color_6001", material: "SC_Clash_SR_LS_SPC_Color 6" },

        { key: "SC_Conquer_SR_LS_SPC_Color_1001", material: "SC_Conquer_SR_LS_SPC_Color 1", hasDecal: true },
        { key: "SC_Conquer_SR_LS_SPC_Color_2001", material: "SC_Conquer_SR_LS_SPC_Color 2" },
        { key: "SC_Conquer_SR_LS_SPC_Color_3001", material: "SC_Conquer_SR_LS_SPC_Color 3" },
        { key: "SC_Conquer_SR_LS_SPC_Color_4001", material: "SC_Conquer_SR_LS_SPC_Color 4" },
        { key: "SC_Conquer_SR_LS_SPC_Color_5001", material: "SC_Conquer_SR_LS_SPC_Color 5" },
        { key: "SC_Conquer_SR_LS_SPC_Color_6001", material: "SC_Conquer_SR_LS_SPC_Color 6" },
        { key: "SC_Conquer_SR_LS_SPC_Color_7001", material: "SC_Conquer_SR_LS_SPC_Color 7" },
        { key: "SC_Conquer_SR_LS_SPC_Color_8001", material: "SC_Conquer_SR_LS_SPC_Color 8" },
        { key: "SC_Conquer_SR_LS_SPC_Color_9001", material: "SC_Conquer_SR_LS_SPC_Color 9" },

        // Dominate
        { key: "SC_Dominate_SR_LS_SPC_Color_1001", material: "SC_Dominate_SR_LS_SPC_Color 1", hasDecal: true },
        { key: "SC_Dominate_SR_LS_SPC_Color_2001", material: "SC_Dominate_SR_LS_SPC_Color 2" },
        { key: "SC_Dominate_SR_LS_SPC_Color_3001", material: "SC_Dominate_SR_LS_SPC_Color 3" },
        { key: "SC_Dominate_SR_LS_SPC_Color_4001", material: "SC_Dominate_SR_LS_SPC_Color 4" },
        { key: "SC_Dominate_SR_LS_SPC_Color_5001", material: "SC_Dominate_SR_LS_SPC_Color 5" },
        { key: "SC_Dominate_SR_LS_SPC_Color_6001", material: "SC_Dominate_SR_LS_SPC_Color 6" },

        // Power
        { key: "SC_Power_SR_LS_SPC_Color_1001", material: "SC_Power_SR_LS_SPC_Color 1", hasDecal: true },
        { key: "SC_Power_SR_LS_SPC_Color_2001", material: "SC_Power_SR_LS_SPC_Color 2" },
        { key: "SC_Power_SR_LS_SPC_Color_3001", material: "SC_Power_SR_LS_SPC_Color 3" },
        { key: "SC_Power_SR_LS_SPC_Color_4001", material: "SC_Power_SR_LS_SPC_Color 4" },
        { key: "SC_Power_SR_LS_SPC_Color_5001", material: "SC_Power_SR_LS_SPC_Color 5" },
        { key: "SC_Power_SR_LS_SPC_Color_6001", material: "SC_Power_SR_LS_SPC_Color 6" },
        { key: "SC_Power_SR_LS_SPC_Color_7001", material: "SC_Power_SR_LS_SPC_Color 7" },
        { key: "SC_Power_SR_LS_SPC_Color_8001", material: "SC_Power_SR_LS_SPC_Color 8" },

    ];

    return (
        <a.group ref={modelRef} rotation-y={spring.rotY} scale={spring.scale} dispose={null}>
            {meshes.map(({ key, material, hasDecal }) => (
                <mesh
                    key={key}
                    castShadow
                    receiveShadow
                    geometry={nodes[key].geometry}
                    material={materials[material]}
                    position={[0, -1.38, 0.06]}
                >
                    {hasDecal && <DecalCode />}
                </mesh>
            ))}
        </a.group>
    );
});

export default ShirtModel;