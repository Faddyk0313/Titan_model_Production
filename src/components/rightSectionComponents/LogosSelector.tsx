import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";


// const sampleLogos = [
//   "/logos/ice-hockey.png", "/logos/flags.png", "/logos/numbers.png",
//   "/logos/owayo.png", "/logos/trophies.png", "/logos/cycling.png",
//   "/logos/motocross.png", "/logos/words.png", "/logos/football.png",
//   "/logos/shapes.png", "/logos/basketball.png", "/logos/mountains.png"
// ];

interface LogosSelectorProps {
  uploadedLogos: string;
  setUploadedLogos: React.Dispatch<React.SetStateAction<string>>;
  logoSize: number;
  setLogoSize: React.Dispatch<React.SetStateAction<number>>;
}

const LogosSelector = ({ uploadedLogos, setUploadedLogos, setLogoSize }: LogosSelectorProps) => {
  // const LogosSelector = ({ uploadedLogos, setUploadedLogos, logoSize, setLogoSize }: LogosSelectorProps) => {
  const [logoDetails, setLogoDetails] = useState<{ format: string; size: string; date?: string; }>({format: "PNG", size: "1848 × 2000" });
  const [settingsOverlayVisible, setSettingsOverlayVisible] = useState<boolean>(false);
  // console.log(logoSize);
  // Handle Image Upload & Extract Metadata
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Only take the first file
      const imageUrl = URL.createObjectURL(file);

      // Create Image object to get width/height
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setLogoDetails({
          format: file.type.split("/")[1].toUpperCase(), // Extract file extension
          size: `${img.width} x ${img.height} px`, // Get real image size
          date: new Date(file.lastModified).toLocaleDateString(), // Get file date
        });
      };

      setUploadedLogos(imageUrl); // Store only the latest uploaded image
    }
  };

  // Delete Image
  const handleDelete = () => {
    setUploadedLogos("/sampleLogo.png"); // Reset to default image
    setLogoDetails({format: "PNG", size: "1848 × 2000" }); // Clear the logo details
  };


  // Open Settings Overlay
  const openSettingsOverlay = () => {
    setSettingsOverlayVisible(true);
  };

  return (
    <div className={`relative p-3 lg:p-6 ${settingsOverlayVisible ? 'min-h-[265px]' : ''}`}>


      <div className="flex justify-center gap-3 lg:gap-5 mb-4">
        {/* Stock Images */}
        {/* <div className="flex items-center gap-2 cursor-pointer rounded-xl border-2 border-[#dcdcdc] hover:border-[#171717] transition-all duration-200 ease-in-out px-3 py-2" onClick={() => setOverlayVisible(true)}>
          <div className="whitespace-nowrap text-sm lg:text-base">Stock Images</div>
        </div> */}
        {/* Add Your Logo */}
        <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center gap-2 cursor-pointer rounded-xl border-2 border-[#dcdcdc] hover:border-[#171717] transition-all duration-200 ease-in-out px-3 py-2">
            {/* <span className="text-xl lg:text-2xl">📁</span> */}
            <div className="whitespace-nowrap text-sm lg:text-base">Add Your Logo</div>
          </div>
        </label>
        <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>
      {/* Overlay for Stock Images */}
      {/* {overlayVisible && (
        <div className="fixed inset-0 bg-[rgba(101,101,101,0.25)] flex justify-center items-start p-0 md:pt-14 z-50">
          <div className="bg-white max-h-[90dvh] overflow-y-scroll p-6 rounded-lg shadow-lg w-full md:w-auto min-w-[80%] max-w-2xl relative">

            <button className="absolute top-4 right-4 text-2xl font-bold cursor-pointer" onClick={() => setOverlayVisible(false)}><RxCross2 />
            </button>
            <h2 className="text-lg font-semibold mb-4">Stock Images</h2>
            <div className="pt-5 max-w-[95%] md:max-w-[85%] lg:max-w-[70%] mx-auto grid grid-cols-4 gap-4">
              {sampleLogos.map((logo, index) => (
                <div key={index} className="cursor-pointer p-2 border rounded">
                  <img src={logo} alt="Stock Logo" className="w-24 h-24 object-contain" />
                </div>
              ))}
            </div>
            <button className="relative mt-10 block ml-auto overflow-clip group  text-center  bg-[#171717]  border-2 border-[#171717] rounded-xl transition-all duration-300 ease-in-out text-transparent h-12 text-lg py-3 px-14 cursor-pointer">
              <span className="absolute pointer-events-none h-56 w-62 left-[-10px] group-hover:translate-x-0 group-hover:w-[calc(100%+20px)] bg-white text-black translate-y-[-260px] group-hover:translate-y-[-100px] rounded-full transition-all duration-400 ease-in-out"></span>
              <span className="absolute z-10 inset-0 flex justify-center items-center text-white group-hover:text-[#171717] transition-all duration-300 ease-in-out">Choose</span>
              Choose
            </button>
          </div>
        </div>
      )} */}

      {/* Uploaded Logos Grid */}
      {uploadedLogos && (
        <div className="flex flex-col items-center p-4 border border-gray-500 pb-2 rounded">
          <div id="image_preview_container" className="w-20 h-20 p-1 rounded">
            <img src={uploadedLogos} alt="Uploaded Logo" className="w-18 h-18 rounded object-contain" />
          </div>
          <div className="flex space-x-3 mt-2">
            <button className="cursor-pointer" onClick={() => openSettingsOverlay()}>
              <FaRegEdit className="w-5 h-5" />
            </button>
            <button className="cursor-pointer" onClick={handleDelete}>
              <MdDeleteOutline className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}


      {/* Logo Settings Overlay */}
      {settingsOverlayVisible && (
        <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col z-50 p-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Edit Logo</h2>
            <button className="text-4xl cursor-pointer" onClick={() => setSettingsOverlayVisible(false)}>&times;</button>
          </div>
          <div className="flex  gap-5 items-start py-5">
            <div className="flex flex-col items-center text-center ">
              <img src={uploadedLogos} alt="Selected Logo" className="w-20 h-20 border rounded object-contain" />
              <p className="text-sm">{logoDetails?.format || "Loading..."}</p>
              <p className="text-sm">{logoDetails?.size || "Loading..."}</p>
              {logoDetails.date && <p className="text-sm">{logoDetails.date || "Loading..."}</p>}
              <button className="mt-2 flex items-center cursor-pointer" onClick={() => { handleDelete(); setSettingsOverlayVisible(false); }}><MdDeleteOutline className="w-6 h-6" /> Remove</button>
            </div>

            <div className="mx-auto">
              <div className="flex flex-col items-center justify-between gap-5">
                <div className="flex gap-5 items-center">
                  <span>Resize logo</span>
                  <div className="flex space-x-2">
                    <button className="px-4 py-1 border rounded" onClick={() => setLogoSize(prev => Math.max(0.1, prev - 0.025))}>-</button>
                    <button className="px-4 py-1 border rounded" onClick={() => setLogoSize(prev => Math.min(0.40, prev + 0.025))}>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogosSelector;
