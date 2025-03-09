import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
const allColors = [
  { hex: "#FFFFFF", label: "White" }, { hex: "#000000", label: "Black" }, { hex: "#F5DEB3", label: "Wheat" },
  { hex: "#FFA500", label: "Orange" }, { hex: "#FF4500", label: "Red Orange" }, { hex: "#DC143C", label: "Crimson" },
  { hex: "#8B0000", label: "Dark Red" }, { hex: "#FF1493", label: "Deep Pink" }, { hex: "#800080", label: "Purple" },
  { hex: "#4B0082", label: "Indigo" }, { hex: "#0000FF", label: "Blue" }, { hex: "#4682B4", label: "Steel Blue" },
  { hex: "#008080", label: "Teal" }, { hex: "#2E8B57", label: "Sea Green" }, { hex: "#006400", label: "Dark Green" },
  { hex: "#808000", label: "Olive" }, { hex: "#D2691E", label: "Chocolate" }, { hex: "#A9A9A9", label: "Dark Gray" },
  { hex: "#696969", label: "Dim Gray" }, { hex: "#87CEEB", label: "Sky Blue" }, { hex: "#20B2AA", label: "Light Sea Green" },
  { hex: "#9370DB", label: "Medium Purple" }, { hex: "#8A2BE2", label: "Blue Violet" }, { hex: "#7B68EE", label: "Medium Slate Blue" },
  { hex: "#00FA9A", label: "Medium Spring Green" }, { hex: "#FFD700", label: "Gold" }, { hex: "#FF6347", label: "Tomato" }
];

const fontFamilies = [
  { name: "Roboto", css: "Roboto, sans-serif" },
  { name: "Poppins", css: "Poppins, sans-serif" },
  { name: "Lato", css: "Lato, sans-serif" },
  { name: "Oswald", css: "Oswald, sans-serif" },
  { name: "Montserrat", css: "Montserrat, sans-serif" },
  { name: "Bebas Neue", css: "Bebas Neue, cursive" },
  { name: "Dancing Script", css: "Dancing Script, cursive" },
  { name: "Permanent Marker", css: "Permanent Marker, cursive" },
  { name: "Playfair Display", css: "Playfair Display, serif" },
  { name: "Raleway", css: "Raleway, sans-serif" },
];

const colorsPerPage = 25;
const fontsPerPage = 9; // Adjust the number of fonts per page

const TextSelector = ({texts, setTexts, textSettings, setTextSettings}:any) => {


  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState<boolean>(false);
  const [animateEditOverlay, setAnimateEditOverlay] = useState<boolean>(false);
  const [animateColorPickerOverlay, setAnimateColorPickerOverlay] = useState<boolean>(false);
  const [animateModal, setAnimateModal] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [sameText, setSameText] = useState<boolean>(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState<number | null>(null);
  const [isEmpty, setIsEmpty] = useState<string>("hidden");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [activeColorField, setActiveColorField] = useState<"fontColor" | "outlineColor" | null>(null);
  const [hoveredColorLabel, setHoveredColorLabel] = useState<string>("");
  const [selectedColorLabel, setSelectedColorLabel] = useState<string>("");
  const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);
  const [animateFontOverlay, setAnimateFontOverlay] = useState(false);

  const [selectedFont, setSelectedFont] = useState<string>("Roboto");
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isModalOpen]);

  // Open Add Text Modal
  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setAnimateModal(true), 50);
    setInputText("");
    setSelectedTextIndex(null);
  };

  // Close Modal
  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setInputText("");
      setSelectedTextIndex(null);
    }, 200);
  };

  // Add Text
  const handleInsertText = () => {
    if (inputText.trim() === "") return;
    setTexts([...texts, inputText]);
    setTextSettings([...textSettings, {
      size: 16,
      rotation: 0,
      isPinned: false,
      font: "F-101",
      fontColor: "#000000",
      outlineColor: "#FFFFFF",
      outlineThickness: 0,
      layer: 1,
      textTheSame: sameText,
      tackleTwill: false
    }]);
    setSameText(false);
    closeModal();
  };

  // Open Edit Overlay
  const openEditOverlay = (index: number) => {
    setSelectedTextIndex(index);
    setIsEditOverlayOpen(true);
    console.log("isEditOverlayOpen", isEditOverlayOpen);
    setTimeout(() => setAnimateEditOverlay(true), 50);
  };

  // Close Edit Overlay
  const closeEditOverlay = (textInput?: string) => {
    if (textInput === "") {
      console.log("Empty");
    }
    else {
      setAnimateEditOverlay(false);
      setTimeout(() => setIsEditOverlayOpen(false), 200);
    }
  };

  // Delete Text
  const deleteText = (index: number) => {
    setTexts(texts.filter((_: any, i: number) => i !== index));
    setTextSettings(textSettings.filter((_:any, i:number) => i !== index));
    closeEditOverlay();
  };

  // Update Text Settings
  const updateSetting = (index: number, key: keyof typeof textSettings[0], value: string | number | boolean) => {
    const updatedSettings = [...textSettings];
    updatedSettings[index] = { ...updatedSettings[index], [key]: value };
    setTextSettings(updatedSettings);
  };


  // Open Color Picker Overlay
  const openColorPicker = (field: "fontColor" | "outlineColor") => {
    setActiveColorField(field);
    setIsColorPickerOpen(true);
    console.log("isEditOverlayOpen", isEditOverlayOpen);
    setTimeout(() => setAnimateColorPickerOverlay(true), 50);
  };

  // Close Color Picker Overlay
  const closeColorPicker = () => {
    setAnimateColorPickerOverlay(false);
    setTimeout(() => {
      setIsColorPickerOpen(false);
      setActiveColorField(null);
      console.log("isEditOverlayOpen", isEditOverlayOpen);
    }, 200);
  };

  // Select Color from Overlay
  const selectOverlayColor = (color: string) => {
    if (selectedTextIndex !== null && activeColorField) {
      updateSetting(selectedTextIndex, activeColorField, color);
      const hexLabel = allColors.find(_color => _color.hex === color)?.label || "";
      console.log("hexLabel", hexLabel);
      setSelectedColorLabel(hexLabel);
    }
  };


  const openFontPicker = () => {
    setIsFontPickerOpen(true);
    setTimeout(() => setAnimateFontOverlay(true), 50); // Small delay for animation
  };

  const closeFontPicker = () => {
    setAnimateFontOverlay(false);
    setTimeout(() => setIsFontPickerOpen(false), 200); // Matches transition duration
  };


  const [hoveredFontFamilyLabel, setHoveredFontFamilyLabel] = useState("");
  const [selectedFontFamilyLabel, setSelectedFontFamilyLabel] = useState("");

  const [currentFontPage, setCurrentFontPage] = useState(1);

  const totalFontPages = Math.ceil(fontFamilies.length / fontsPerPage);
  const paginatedFonts = fontFamilies.slice((currentFontPage - 1) * fontsPerPage, currentFontPage * fontsPerPage);


  const [currentPage, setCurrentPage] = useState(1);


  const totalPages = Math.ceil(allColors.length / colorsPerPage);
  const paginatedColors = allColors.slice((currentPage - 1) * colorsPerPage, currentPage * colorsPerPage);

  return (
    <div className="relative flex flex-col justify-center items-center pt-6">
      <div id="static-content">
        <button className="px-4 py-2 bg-white rounded-xl border-2 border-[#dcdcdc] hover:border-[#171717] transition-all duration-200 ease-in-out cursor-pointer " onClick={openModal}>
          Create Text
        </button>


        {/* Display Added Texts */}
        <div className="mt-4 w-full px-10">
          {texts.map((text: any, index: number) => (
            <div
              key={index}
              id={`delete-${index}`}
              className={`flex justify-between items-center border-b py-2 transition-all duration-500 ease-in-out ${deletedIndex === index ? "opacity-0 scale-90 !max-w-0 overflow-hidden" : ""
                }`}
            >
              <p
                className={`text-lg grow pl-2 max-w-[220px] overflow-x-clip whitespace-nowrap transition-all duration-500 ease-in-out`}
                id={`text-${index}`}
              >
                {text}
              </p>
              <div className="flex justify-center items-center whitespace-nowrap">
                <button className="p-1 cursor-pointer text-gray-600 hover:text-black" onClick={() => openEditOverlay(index)}>
                <FaRegEdit className="w-5 h-5" />
                </button>
                <button
                  className="px-4 cursor-pointer hover:text-red-800 transition-transform duration-200 ease-in-out transform hover:scale-110 active:rotate-12"
                  onClick={() => {
                    setDeletedIndex(index); // Track which text is being deleted

                    setTimeout(() => {
                      deleteText(index); // Remove text after animation completes
                      setDeletedIndex(null); // Reset state after deletion
                    }, 550);
                  }}
                >
                  <MdDeleteOutline className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal with Smooth Transition */}
      {isModalOpen && (
        <div className={`fixed inset-0 flex items-center justify-center transition-all duration-200 ease-out ${animateModal ? "bg-[rgba(101,101,101,0.25)]" : "pointer-events-none bg-[rgba(101,101,101,0)]"} z-50`}>
          <div
            className={`bg-white px-8 py-10 rounded shadow-lg max-w-sm sm:max-w-md lg:max-w-xl w-full
                        transition-all duration-200 ease-out transform
                        ${animateModal ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Enter text, name or number</h2>
            <input
              ref={inputRef} // Attach ref to input field
              type="text"
              className="w-full p-2 border border-gray-300 mb-3"
              placeholder="Enter text here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <p>
              <input type="checkbox" name="isSameText" id="isSameText" className="cursor-pointer" checked={sameText} onChange={() => setSameText(!sameText)} />
              <span className="font-semibold text-sm"> This text should be the same across all items (like team name)</span>
            </p>
            <p className="text-gray-500 text-sm mb-9 mt-2">
              Individual texts across several items can be specified later in the shopping cart (like name, number).
            </p>

            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 border border-gray-300 cursor-pointer" onClick={closeModal}>
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-[#00639E] text-white cursor-pointer" onClick={handleInsertText}>
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Overlay */}
      {isEditOverlayOpen && selectedTextIndex !== null && (
        <div className={`absolute inset-0 min-h-[430px] bg-white bg-opacity-95 flex flex-col z-50 p-6 transition-all duration-200 ease-out transform ${animateEditOverlay ? "opacity-100 scale-100" : " pointer-events-none opacity-0 scale-90"}`}>
          <div className="flex justify-between items-center pb-5">
            <h2 className="text-lg font-semibold">Edit Text</h2>
            <button className="text-2xl font-bold cursor-pointer ml-auto" onClick={() => closeEditOverlay(texts[selectedTextIndex])}>✖</button>
          </div>

          <div className="flex justify-between items-center mb-2 border border-gray-300">
            <input
              type="text"
              className="w-full p-2 "
              value={texts[selectedTextIndex]}
              onChange={(e) => {
                const updatedTexts = [...texts];
                updatedTexts[selectedTextIndex] = e.target.value;
                if (updatedTexts[selectedTextIndex] === "") {
                  setTexts(updatedTexts);
                  setIsEmpty("yes");
                } else {
                  setIsEmpty("no");
                  setTexts(updatedTexts);
                }
              }}
            />
            <button className="px-4 cursor-pointer text-red-600 hover:text-red-800" onClick={() => deleteText(selectedTextIndex)}>
              <MdDeleteOutline className="w-6 h-6" />
            </button>
          </div>
          <p className={`${isEmpty == "yes" ? 'block' : 'hidden'} text-xs text-red-600 pb-4`}>Text Field is empty</p>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Font</span>
              <button
                className="px-4 py-1 border cursor-pointer"
                onClick={openFontPicker}
              >
                {textSettings[selectedTextIndex]?.font}
              </button>
            </div>


            <div className="flex justify-between">
              <span>Font Color</span>
              <div className="w-10 h-6 border cursor-pointer" style={{ backgroundColor: textSettings[selectedTextIndex]?.fontColor }} onClick={() => openColorPicker("fontColor")}></div>
            </div>
            <div className="flex justify-between">
              <span>Outline Color</span>
              <div className="w-10 h-6 border cursor-pointer" style={{ backgroundColor: textSettings[selectedTextIndex]?.outlineColor }} onClick={() => openColorPicker("outlineColor")}></div>
            </div>
            <div className="flex justify-between">
              <span>Outline Thickness</span>
              <input type="number" className="w-16 text-center border" value={textSettings[selectedTextIndex]?.outlineThickness} onChange={(e) => updateSetting(selectedTextIndex, "outlineThickness", Math.max(0, parseInt(e.target.value)))} />
            </div>
            <div className="flex justify-between">
              <span>Text The Same</span>
              <input type="checkbox" checked={textSettings[selectedTextIndex]?.textTheSame} onChange={() => updateSetting(selectedTextIndex, "textTheSame", !textSettings[selectedTextIndex].textTheSame)} />
            </div>
          </div>
        </div>
      )}

      {/* Color Picker Overlay */}
      {isColorPickerOpen && (
        <div className={`absolute inset-0  min-h-[430px] bg-white bg-opacity-95 flex flex-col justify-center z-50 px-4 transition-all duration-200 ease-out ${animateColorPickerOverlay ? "opacity-100 scale-100" : " pointer-events-none opacity-0 scale-90"}`}>
          <div className="flex justify-between items-center mt-4 mb-2">
            <h2 className="text-lg font-semibold">Choose a Color</h2>
            <button className="text-2xl font-bold cursor-pointer" onClick={closeColorPicker}>✖</button>
          </div>

          {/* Colors Grid */}
          <div className="grid grid-cols-5 gap-1 py-3">
            {paginatedColors.map((color, index) => (
              <div key={index} className={`border-4 ${textSettings[selectedTextIndex!]?.[activeColorField!] === color.hex ? " border-blue-500" : "border-transparent"}`}>
                <div
                  className="m-1 w-[41px] h-6 border cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  onMouseEnter={() => setHoveredColorLabel(color.label)}
                  onClick={() => selectOverlayColor(color.hex)}
                />
              </div>
            ))}
          </div>

          <p className="p-2 text-center border border-gray-400 rounded w-40 ml-auto mt-auto">{hoveredColorLabel || selectedColorLabel}</p>

          {/* Pagination Controls */}
          <div className="flex items-center mt-4 space-x-4 ml-auto">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>
            <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Font family Picker Overlay */}
      {isFontPickerOpen && (
        <div className={`absolute inset-0 min-h-[430px] bg-white bg-opacity-95 flex flex-col z-50 px-4 transition-all duration-200 ease-out ${animateFontOverlay ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-90"}`}>

          <div className="flex justify-between items-center mt-4 mb-2">
            <h2 className="text-lg font-semibold">Choose a Font</h2>
            <button className="text-2xl font-bold cursor-pointer" onClick={closeFontPicker}>✖</button>
          </div>

          {/* Fonts Grid */}
          <div className="grid grid-cols-3 gap-3 py-3">
            {paginatedFonts.map((font, index) => (
              <div
                key={index}
                className={`p-2 border cursor-pointer text-center ${selectedFont === font.name ? "border-blue-500" : "border-gray-300"}`}
                onMouseEnter={() => setHoveredFontFamilyLabel(font.name)}
                onClick={() => {
                  setSelectedFont(font.name);
                  setSelectedFontFamilyLabel(font.name);
                  updateSetting(selectedTextIndex!, "font", font.name);
                }}
                style={{ fontFamily: font.css }}
              >
                ABC 15
              </div>
            ))}
          </div>

          {/* Selected Font Preview Label */}
          <p className="p-2 text-center border border-gray-400 rounded w-40 ml-auto mt-auto">
            {hoveredFontFamilyLabel || selectedFontFamilyLabel}
          </p>

          {/* Pagination Controls */}
          <div className="flex items-center mt-4 space-x-4 ml-auto">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              onClick={() => setCurrentFontPage(prev => Math.max(prev - 1, 1))}
              disabled={currentFontPage === 1}
            >
              ←
            </button>
            <span className="text-lg font-semibold">{currentFontPage} / {totalFontPages}</span>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              onClick={() => setCurrentFontPage(prev => Math.min(prev + 1, totalFontPages))}
              disabled={currentFontPage === totalFontPages}
            >
              →
            </button>
          </div>
        </div>
      )}




    </div>
  );
};

export default TextSelector;
