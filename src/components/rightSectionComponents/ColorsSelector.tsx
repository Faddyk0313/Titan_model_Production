import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const allColors = [
  { hex: "#000000", label: "Black" },
  { hex: "#FFFFFF", label: "White" },
  { hex: "#c8c8c8", label: "Steel" },
  { hex: "#a7a8a9", label: "Grey" },
  { hex: "#636569", label: "Graphite" },
  { hex: "#ff008b", label: "Hot Pink" },
  { hex: "#62fc46", label: "Neon Green" },
  { hex: "#00adee", label: "Arctic" },
  { hex: "#e2fb31", label: "Flashpoint" },
  { hex: "#2b354b", label: "Navy" },
  { hex: "#0033a1", label: "Royal" },
  { hex: "#7badd3", label: "Carolina" },
  { hex: "#ce0e2d", label: "Red" },
  { hex: "#72253d", label: "Maroon" },
  { hex: "#124734", label: "Forest" },
  { hex: "#00833e", label: "Kelly" },
  { hex: "#592c82", label: "Purple" },
  { hex: "#ff4d00", label: "Orange" },
  { hex: "#ffcd00", label: "Team Gold" },
  { hex: "#cbc593", label: "Vegas Gold" },
  { hex: "#006D75", label: "Teal" },
];

interface ColorsSelectorProps {
  activeTab: string;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColorsLabel: string[];
  setSelectedColorsLabel: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  selectedVariant: string;
  setAnimatingTab: React.Dispatch<React.SetStateAction<string>>;
}

const ColorsSelector = ({ activeTab, selectedColors, setSelectedColors, selectedColorsLabel, setSelectedColorsLabel, setActiveTab, setAnimatingTab, selectedVariant }: ColorsSelectorProps) => {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const [animateOverlay, setAnimateOverlay] = useState<boolean>(false); // Controls animation
  // State for, which color(Color 1, Color2 etc) is the overlay opened for.
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [hoveredColorLabel, setHoveredColorLabel] = useState<string>("");
  const [selectedColorLabel, setSelectedColorLabel] = useState<string>("");
  const [animatingColorsOverlay, setAnimatingColorsOverlay] = useState<boolean>(false); // Controls animation

  const colorConfigurations: { [key: string]: string[]; } = {
    BATTLE: [
      "(Body & sleeves)",
      "(Top stripe)",
      "(Middle stripe)",
      "(Bottom stripe)",
      "(Titan branding - All)"
    ],
    CONQUER: [
      "(Body)",
      "(Upper sleeve)",
      "(Top stripe)",
      "(Bottom stripe)",
      "(Lower sleeves)",
      "(Titan branding - Collar)",
      "(Titan branding - Shoulders)",
      "(Titan branding - Sleeve Cuffs)"
    ],
    POWER: [
      "(Body)",
      "(Lower sleeve)",
      "(Sleeve stripe)",
      "(Upper sleeve)",
      "(Titan Branding - Collar)",
      "(Titan branding - Shoulders)",
      "(Titan branding - Sleeve Cuffs)"
    ],
    ASSAULT: [
      "(Body & sleeves)",
      "(Outside stripes)",
      "(Middle stripe)",
      "(Titan branding - All)"
    ],
    BROADSTREET: [
      "(Body)",
      "(Upper sleeve)",
      "(Lower sleeve)",
      "(Sleeve stripe)",
      "(Titan Branding - Collar)",
      "(Titan branding - Shoulders)",
      "(Titan branding - Sleeve Cuffs)"
    ],
    DOMINATE: [
      "(Body)",
      "(Outside stripes)",
      "(Inside stripes)",
      "(Center stripe)",
      "(Titan Branding - All)"
    ],
    CLASH: [
      "(Body)",
      "(Top stripe group)",
      "(Center stripe group)",
      "(Bottom stripe group)",
      "(Titan Branding - All)"
    ],
    BLADE: [
      "(Body)",
      "(Top stripes)",
      "(Inside stripe)",
      "(Bottom stripes)",
      "(Titan Branding - All)"
    ]
  };

  const [colorSelectedByUser, setColorSelectedByUser] = useState<number>(0);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showColorDisableWarning, setShowColorDisableWarning] = useState<boolean>(false);

  const openOverlay = (index: number, hex: string) => {
    setActiveColorIndex(index);
    setOverlayVisible(true);
    // Delay animation to allow for smooth opening
    setTimeout(() => setAnimateOverlay(true), 50);

    // Get label for selected color
    const hexLabel =
      allColors.find((color) => color.hex === hex)?.label || "";
    // console.log("hexLabel", hexLabel);
    setSelectedColorLabel(hexLabel);
  };

  const closeOverlay = () => {
    setShowColorDisableWarning(false);
    setAnimateOverlay(false);
    setTimeout(() => {
      setOverlayVisible(false);
      setActiveColorIndex(-1);
      setHoveredColorLabel("");
    }, 100); // Matches animation duration
  };

  const closeOverlayX = () => {
    setShowColorDisableWarning(false);
    // setHighlightedMesh("None");
    setAnimatingColorsOverlay(false);
    setAnimateOverlay(false);
    setTimeout(() => {
      setOverlayVisible(false);
      setActiveColorIndex(-1);
      setHoveredColorLabel("");
    }, 200); // Matches animation duration
  };

  const selectColor = (color: string, label: string) => {
    if (activeColorIndex !== null) {
      setShowColorDisableWarning(false);
      setShowWarning(false);
      setColorSelectedByUser((prev) => prev + 1);
      const updatedColors = [...selectedColors];
      updatedColors[activeColorIndex] = color;
      setSelectedColors(updatedColors);
      setSelectedColorLabel(label);
      // Update the selected color labels
      const updatedLabels = [...selectedColorsLabel];
      updatedLabels[activeColorIndex] = label;
      setSelectedColorsLabel(updatedLabels);

      setSelectedColorLabel(label);
    }
  };

  // let isColorDisabled =


  useEffect(() => {
    // setSelectedColors([
    //   "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"
    // ]);
    setColorSelectedByUser(0);
    setShowWarning(false);
  }, [selectedVariant]);

  useEffect(() => {
    closeOverlayX();
  }, [activeTab]);

  // console.log("selectedColors", selectedColors);
  // console.log("activeColorIndex", activeColorIndex);
  // console.log("boool", activeColorIndex === selectedColors.length-1);

  return (
    <div
      className={`relative md:py-6 xl:p-6 flex flex-col justify-center md:items-center lg:items-start ${overlayVisible || animatingColorsOverlay ? 'min-h-[410px] lg:min-h-[460px]  overflow-clip' : ""}`}
    >
      <h2 className="text-xl font-semibold whitespace-nowrap pb-3">Shirt Colors</h2>
      {/* Color Bars */}
      <div className="grid grid-cols-3 md:flex md:flex-wrap lg:grid lg:grid-cols-3 justify-center items-center w-full h-fit gap-5">
        {colorConfigurations[selectedVariant].map((label, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer self-start  group"
            onClick={() => {
              // setHighlightedMesh(`Color ${index + 1}`);
              openOverlay(index, selectedColors[index]);
            }}
          >
            <div
              className="w-full md:w-30 lg:w-full h-10 border-2 rounded-xl overflow-clip"
              style={{ backgroundColor: selectedColors[index] }}
            ></div>
            <div className="relative mt-1 text-center text-xs sm:text-sm ">
              <span>Color {index + 1} </span> <br className="" />
              <span className="">{label}{" "}</span>
              <span className="absolute -left-0.5 bottom-0 top-[105%] h-[1px] bg-black transition-all duration-300 ease-in-out w-0 group-hover:w-[calc(100%+4px)] "></span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold whitespace-nowrap pb-3 pt-5">Thread Color</h2>

      <div className={`grid grid-cols-3 md:flex md:flex-wrap lg:grid lg:grid-cols-3 justify-center items-center w-full h-fit gap-5 ${overlayVisible || animatingColorsOverlay ? '!hidden ' : "grid"}`}>
        <div
          key={colorConfigurations[selectedVariant].length}
          className="flex flex-col items-center cursor-pointer  group"
          onClick={() => {
            // setHighlightedMesh(`Color ${colorConfigurations[selectedVariant].length + 1}`);
            openOverlay(colorConfigurations[selectedVariant].length, selectedColors[colorConfigurations[selectedVariant].length]);
          }
          }
        >
          <div
            className="w-full md:w-30 lg:w-full h-10 border-2 rounded-xl overflow-clip"
            style={{ backgroundColor: selectedColors[colorConfigurations[selectedVariant].length] }}
          ></div>
          <div className="relative mt-1 text-center text-xs sm:text-sm ">
            <span>Color {colorConfigurations[selectedVariant].length + 1}{" "}</span><br className="" />
            <span>(Thcccread)</span>
            <span className="absolute -left-0.5 bottom-0 top-[105%] h-[1px] bg-black transition-all duration-300 ease-in-out w-0 group-hover:w-[calc(100%+4px)] "></span>
          </div>
        </div>
      </div>

      {/* Overlay with Smooth Transition */}
      {overlayVisible && (
        <div
          className={`absolute inset-0 pb-5 bg-white bg-opacity-95 flex flex-col z-50 px-1 lg:px-4 transition-all duration-200 ease-out 
          ${animateOverlay
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
            }`}
        >
          <div className="flex items-center mt-0 mb-0">
            <div className="flex items-center">
              <h3 className="text-base md:text-xl font-semibold whitespace-nowrap pl-1 pr-2">
                Color {activeColorIndex + 1} <span className="">{colorConfigurations[selectedVariant][activeColorIndex] || "(Thread)"}</span>
              </h3>
            </div>
            <button
              className="text-4xl cursor-pointer ml-auto"
              onClick={closeOverlayX}
            >
              &times;
            </button>
          </div>
            <div className="flex items-center justify-between">
          {
            activeColorIndex === colorConfigurations[selectedVariant].length ?
              <p className="relative text-sm md:text-base text-gray-500 flex gap-1">
                <svg className={`mt-1 w-[8px] h-[8px] md:w-[10px] md:h-[10px] `} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V22M2 8L22 16M2 16L22 8" stroke="#6a7282" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  {selectedColorLabel === "Black" || selectedColorLabel === "White" ? 'Standard Black or White - 12 unit min' : 'Premium 15 Colors - 50 unit min'}
                </span>
              </p>
              : ''
          }
          <p className="ml-auto text-sm md:text-base  text-gray-500 px-2">
            {hoveredColorLabel || selectedColorLabel}
          </p>
          </div>

          {/* Colors Grid */}
          <div className="grid grid-cols-4 gap-2 lg:gap-5 py-3">
            {allColors.slice(0, allColors.length - 1).map((color, index) => (
              // ((selectedVariant === 'BATTLE' || selectedVariant === 'DOMINATE' || selectedVariant === 'CLASH' || selectedVariant === 'BLADE') && activeColorIndex + 1 === 5 && selectedColors[0] === color.hex) ||
              //   (selectedVariant == 'CONQUER' && ((activeColorIndex + 1 === 6 && selectedColors[0] === color.hex) || (activeColorIndex + 1 === 7 && selectedColors[1] === color.hex) || (activeColorIndex + 1 === 8 && selectedColors[4] === color.hex))) ||
              //   (selectedVariant == 'POWER' && ((activeColorIndex + 1 === 5 && selectedColors[0] === color.hex) || (activeColorIndex + 1 === 7 && selectedColors[1] === color.hex) || (activeColorIndex + 1 === 6 && selectedColors[3] === color.hex))) ||
              //   (selectedVariant == 'ASSAULT' && activeColorIndex + 1 === 4 && selectedColors[0] === color.hex) ||
              //   (selectedVariant == 'BROADSTREET' && ((activeColorIndex + 1 === 5 && selectedColors[0] === color.hex) || (activeColorIndex + 1 === 6 && selectedColors[1] === color.hex) || (activeColorIndex + 1 === 7 && selectedColors[2] === color.hex))) 
              ((selectedVariant === 'BATTLE' || selectedVariant === 'DOMINATE' || selectedVariant === 'CLASH' || selectedVariant === 'BLADE') && ((activeColorIndex + 1 === 1 && selectedColors[4] === color.hex) || (activeColorIndex + 1 === 5 && selectedColors[0] === color.hex))) ||
                (selectedVariant == 'CONQUER' && ((activeColorIndex + 1 === 6 && selectedColors[0] === color.hex) || (activeColorIndex + 1 === 1 && selectedColors[5] === color.hex) || (activeColorIndex + 1 === 7 && selectedColors[1] === color.hex) || (activeColorIndex + 1 === 2 && selectedColors[6] === color.hex) || (activeColorIndex + 1 === 8 && selectedColors[4] === color.hex) || (activeColorIndex + 1 === 5 && selectedColors[7] === color.hex))) ||
                (selectedVariant == 'POWER' && ((activeColorIndex + 1 === 5 && selectedColors[0] === color.hex) || (activeColorIndex + 1 === 1 && selectedColors[4] === color.hex) || (activeColorIndex + 1 === 7 && selectedColors[1] === color.hex) || (activeColorIndex + 1 === 2 && selectedColors[6] === color.hex) || (activeColorIndex + 1 === 6 && selectedColors[3] === color.hex) || (activeColorIndex + 1 === 4 && selectedColors[5] === color.hex))) ||
                (selectedVariant == 'ASSAULT' && ((activeColorIndex + 1 === 1 && selectedColors[3] === color.hex) || (activeColorIndex + 1 === 4 && selectedColors[0] === color.hex))) ||
                (selectedVariant == 'BROADSTREET' && ((activeColorIndex + 1 === 5 && selectedColors[0] === color.hex) || (activeColorIndex + 1 === 1 && selectedColors[4] === color.hex) || (activeColorIndex + 1 === 6 && selectedColors[1] === color.hex) || (activeColorIndex + 1 === 2 && selectedColors[5] === color.hex) || (activeColorIndex + 1 === 7 && selectedColors[2] === color.hex) || (activeColorIndex + 1 === 3 && selectedColors[6] === color.hex)))
                ?
                <div
                  key={index}
                  className={` border-3 relative rounded-xl overflow-clip cursor-not-allowed border-gray-300 `}
                >
                  {/* Diagonal Strikethrough */}
                  {/* <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute w-[140%] h-[4px] bg-[#d1d5dc] top-1/2 left-[-20%] rotate-[162deg]"></div>
                  </div> */}

                  <div
                    className={`relative w-full h-10 `}
                    style={{ backgroundColor: color.hex }}
                    onMouseEnter={() =>
                      setHoveredColorLabel(color.label)
                    }
                    onClick={() =>
                      setShowColorDisableWarning(true)
                    }
                  >
                    <svg width='100%' height='100%' viewBox='0 0 100 100' preserveAspectRatio='none'>
                      <line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" stroke="#d1d5dc" strokeWidth="3px" />
                    </svg>
                    {
                      activeColorIndex === colorConfigurations[selectedVariant].length ?
                        <svg className={`absolute right-0 top-0 m-2  ${index === 0 || index === 1 ? 'hidden' : ''}  `} width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2V22M2 8L22 16M2 16L22 8" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        : ''
                    }
                  </div>

                </div>
                :
                <div
                  key={index}
                  className={`border-3 rounded-xl overflow-clip cursor-pointer ${selectedColors[activeColorIndex!] ===
                    color.hex
                    ? " border-black"
                    : "border-gray-300"
                    }`}
                >
                  <div
                    className={`relative w-full h-10 `}
                    style={{ backgroundColor: color.hex }}
                    onMouseEnter={() =>
                      setHoveredColorLabel(color.label)
                    }
                    onClick={() =>
                      selectColor(color.hex, color.label)
                    }
                  >
                    {
                      activeColorIndex === colorConfigurations[selectedVariant].length ?
                        <svg className={`absolute right-0 top-0 m-2 pointer-events-none ${index === 0 || index === 1 ? 'hidden' : ''}  `} width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2V22M2 8L22 16M2 16L22 8" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        : ''
                    }
                  </div>
                </div>
            ))}
          </div>

          <p className={`absolute left-2 md:left-5 whitespace-nowrap top-8 right-auto text-[12px] text-red-400 transition-all duration-300 ease-in-out ${(showWarning && colorSelectedByUser === activeColorIndex) && !showColorDisableWarning ? 'opacity-100' : 'opacity-0'} `}>Please select a color</p>
          <p className={`absolute left-2 md:left-5 whitespace-nowrap top-8 right-auto text-[12px] text-red-400 transition-all duration-300 ease-in-out ${showColorDisableWarning ? 'opacity-100' : 'opacity-0'} `}>Artwork can’t be same color as background</p>

          <div className="grid grid-cols-4 items-center gap-2 lg:gap-5 ">
            {
              // ((selectedVariant === 'BATTLE' || selectedVariant === 'DOMINATE' || selectedVariant === 'CLASH' || selectedVariant === 'BLADE') && activeColorIndex + 1 === 5 && selectedColors[0] === '#006D75') ||
              //   (selectedVariant == 'CONQUER' && ((activeColorIndex + 1 === 6 && selectedColors[0] === '#006D75') || (activeColorIndex + 1 === 7 && selectedColors[1] === '#006D75') || (activeColorIndex + 1 === 8 && selectedColors[4] === '#006D75'))) ||
              //   (selectedVariant == 'POWER' && ((activeColorIndex + 1 === 5 && selectedColors[0] === '#006D75') || (activeColorIndex + 1 === 7 && selectedColors[1] === '#006D75') || (activeColorIndex + 1 === 6 && selectedColors[3] === '#006D75'))) ||
              //   (selectedVariant == 'ASSAULT' && activeColorIndex + 1 === 4 && selectedColors[0] === '#006D75') ||
              //   (selectedVariant == 'BROADSTREET' && ((activeColorIndex + 1 === 5 && selectedColors[0] === '#006D75') || (activeColorIndex + 1 === 6 && selectedColors[1] === '#006D75') || (activeColorIndex + 1 === 7 && selectedColors[2] === '#006D75'))) 
              ((selectedVariant === 'BATTLE' || selectedVariant === 'DOMINATE' || selectedVariant === 'CLASH' || selectedVariant === 'BLADE') && ((activeColorIndex + 1 === 1 && selectedColors[4] === "#006D75") || (activeColorIndex + 1 === 5 && selectedColors[0] === "#006D75"))) ||
                (selectedVariant == 'CONQUER' && ((activeColorIndex + 1 === 6 && selectedColors[0] === "#006D75") || (activeColorIndex + 1 === 1 && selectedColors[5] === "#006D75") || (activeColorIndex + 1 === 7 && selectedColors[1] === "#006D75") || (activeColorIndex + 1 === 2 && selectedColors[6] === "#006D75") || (activeColorIndex + 1 === 8 && selectedColors[4] === "#006D75") || (activeColorIndex + 1 === 5 && selectedColors[7] === "#006D75"))) ||
                (selectedVariant == 'POWER' && ((activeColorIndex + 1 === 5 && selectedColors[0] === "#006D75") || (activeColorIndex + 1 === 1 && selectedColors[4] === "#006D75") || (activeColorIndex + 1 === 7 && selectedColors[1] === "#006D75") || (activeColorIndex + 1 === 2 && selectedColors[6] === "#006D75") || (activeColorIndex + 1 === 6 && selectedColors[3] === "#006D75") || (activeColorIndex + 1 === 4 && selectedColors[5] === "#006D75"))) ||
                (selectedVariant == 'ASSAULT' && ((activeColorIndex + 1 === 1 && selectedColors[3] === "#006D75") || (activeColorIndex + 1 === 4 && selectedColors[0] === "#006D75"))) ||
                (selectedVariant == 'BROADSTREET' && ((activeColorIndex + 1 === 5 && selectedColors[0] === "#006D75") || (activeColorIndex + 1 === 1 && selectedColors[4] === "#006D75") || (activeColorIndex + 1 === 6 && selectedColors[1] === "#006D75") || (activeColorIndex + 1 === 2 && selectedColors[5] === "#006D75") || (activeColorIndex + 1 === 7 && selectedColors[2] === "#006D75") || (activeColorIndex + 1 === 3 && selectedColors[6] === "#006D75")))
                ?
                <div
                  className={`col-span-1 border-3 relative rounded-xl overflow-clip cursor-not-allowed border-gray-300 `}
                >
                  <div
                    className={`relative w-full h-10 `}
                    style={{ backgroundColor: '#006D75' }}
                    onMouseEnter={() =>
                      setHoveredColorLabel('Teal')
                    }
                    onClick={() =>
                      setShowColorDisableWarning(true)
                    }
                  >
                    {
                      activeColorIndex === colorConfigurations[selectedVariant].length ?
                        <svg className={`absolute right-0 top-0 m-2   `} width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2V22M2 8L22 16M2 16L22 8" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        : ''
                    }
                  </div>
                </div>
                :
                <div
                  className={`border-3 rounded-xl overflow-clip cursor-pointer ${selectedColors[activeColorIndex!] ===
                    '#006D75'
                    ? " border-black"
                    : "border-gray-300"
                    }`}
                >
                  <div
                    className={`relative w-full h-10 `}
                    style={{ backgroundColor: '#006D75' }}
                    onMouseEnter={() =>
                      setHoveredColorLabel('Teal')
                    }
                    onClick={() =>
                      selectColor('#006D75', 'Teal')
                    }
                  >
                    {
                      activeColorIndex === colorConfigurations[selectedVariant].length ?
                        <svg className={`absolute right-0 top-0 m-2  `} width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2V22M2 8L22 16M2 16L22 8" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        : ''
                    }
                  </div>
                </div>
            }
            <div className="flex items-center ml-auto gap-2 col-span-3">
              {
                activeColorIndex !== 0 ?
                  <button
                    className="relative px-5 md:px-7 text-xs md:text-base whitespace-nowrap overflow-clip group  text-center  bg-[#171717]  border-2 border-[#171717] rounded-xl transition-all duration-300 ease-in-out text-transparent h-[46px] cursor-pointer"
                    onClick={() => {
                      // console.log("colorSelectedByUser", colorSelectedByUser);
                      // console.log("activeColorIndex", activeColorIndex);
                      // setHighlightedMesh(`Color ${activeColorIndex - 2}`);
                      closeOverlay();
                      setTimeout(() => {
                        openOverlay(
                          activeColorIndex - 1,
                          selectedColors[activeColorIndex - 1]
                        );
                      }, 200);
                    }}
                  >
                    {/* Animated Span */}
                    <span className="absolute pointer-events-none h-56 w-62 left-[-10px] group-hover:translate-x-0 group-hover:w-[calc(100%+20px)] bg-white text-black translate-y-[-260px] group-hover:translate-y-[-100px] rounded-full transition-all duration-400 ease-in-out"></span>
                    <span className="absolute z-10 inset-0 flex justify-center items-center gap-2 text-white group-hover:text-[#171717] transition-all duration-300 ease-in-out">
                      <FaArrowRightLong className="rotate-180 text-xs md:text-sm" /> Previous Color
                      {" "}
                    </span>
                    <FaArrowRightLong className="rotate-180 text-xs md:text-sm" /> Previous Color
                  </button>
                  : ''
              }
              <button
                className="relative px-5 md:px-7 text-xs  md:text-base whitespace-nowrap overflow-clip group  text-center  bg-[#171717]  border-2 border-[#171717] rounded-xl transition-all duration-300 ease-in-out text-transparent h-[46px] cursor-pointer"
                onClick={() => {
                  if (colorSelectedByUser === activeColorIndex) {
                    setShowWarning(true);
                    return;
                  }
                  if (activeColorIndex === colorConfigurations[selectedVariant].length) {
                    // setHighlightedMesh("None");
                    // console.log("Hello");
                    setAnimatingColorsOverlay(false);
                    closeOverlay();
                    setTimeout(() => {
                      setActiveTab("Logos"); // Switch to Logos tab
                      setAnimatingTab("Logos"); // Ensure smooth transition animation
                    }, 300);
                  }
                  else {
                    // console.log("Hello else");
                    // setHighlightedMesh(`Color ${activeColorIndex + 2}`);
                    setAnimatingColorsOverlay(true);
                    closeOverlay();
                    setTimeout(() => {
                      openOverlay(
                        activeColorIndex + 1,
                        selectedColors[activeColorIndex + 1]
                      );
                    }, 200);
                  }
                }}
              >
                {/* Animated Span */}
                <span className="absolute pointer-events-none h-56 w-62 left-[-10px] group-hover:translate-x-0 group-hover:w-[calc(100%+20px)] bg-white text-black translate-y-[-260px] group-hover:translate-y-[-100px] rounded-full transition-all duration-400 ease-in-out"></span>
                <span className="absolute z-10 inset-0 flex justify-center items-center gap-2 text-white group-hover:text-[#171717] transition-all duration-300 ease-in-out">
                  {activeColorIndex === colorConfigurations[selectedVariant].length ? 'Add Logo' : 'Next Color'} <FaArrowRightLong className="text-xs md:text-sm" />
                  {" "}
                </span>
                {activeColorIndex === colorConfigurations[selectedVariant].length ? 'Add Logo' : 'Next Color'} <FaArrowRightLong className="text-xs md:text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorsSelector;
