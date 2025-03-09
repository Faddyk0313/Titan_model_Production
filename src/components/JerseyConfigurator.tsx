import { useEffect, useState } from "react";
import VariantsSection from "./VariantsSection";
import { MdOutlineStarPurple500 } from "react-icons/md";
import Collapsible from "./Collapsible";
import Scene from "./Scene";
import { useSearchParams } from "react-router-dom";

const JerseyConfigurator = () => {
  const [searchParams] = useSearchParams();
  const initialVariant = searchParams.get("design") || "BATTLE"; // Default to 'BATTLE' if not found
  console.log("initialVariant", initialVariant);
  const [selectedVariant, setSelectedVariant] = useState<string>(initialVariant);
  const [minQuantity, setMinQuantity] = useState<number>(12);
  const [value, setValue] = useState<number>(minQuantity);
  const [selectedColors, setSelectedColors] = useState<string[]>([
    "#ff4d00", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF"
  ]);
  const [selectedColorsLabel, setSelectedColorsLabel] = useState<string[]>([
    "Orange", "Black", "White", "Black", "White", "Black"
  ]);
  const [uploadedLogos, setUploadedLogos] = useState<string>("/sampleLogo.png");
  const [logoSize, setLogoSize] = useState<number>(0.23);

  // Convert array to formatted 
  let colorsQueryParameter = selectedColors
    .map((color, index) => `Color${index + 1}:${selectedColorsLabel[index]}(${color.replace("#", "")})`)
    .join("%0A");

  const [height, setHeight] = useState(window.document.body.scrollHeight);
  useEffect(() => {
    // Function to send height to the parent
    const sendHeight = () => {
      const newHeight = document.body.scrollHeight;
      setHeight(newHeight); // Update state
      window.parent.postMessage({ frameHeight: newHeight }, "*");
    };

    // Send height on mount
    sendHeight();
    // Send height on resize or content changes
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    return () => observer.disconnect(); // Cleanup on unmount
    console.log("height", height);
  }, []);

  useEffect(() => {
    if (selectedColors[selectedColors.length - 1] !== "#FFFFFF" && selectedColors[selectedColors.length - 1] !== "#000000") {
      setMinQuantity(50);
      if (value < 50) setValue(50);
    } else {
      setMinQuantity(12);
      if (value < 12) setValue(12);
    }
  }, [selectedColors[selectedColors.length - 1]]);

  return (
    <div className="flex gap-10 flex-col max-w-[1800px] mx-auto p-2">
      <div id='outer' className="lg:flex items-start justify-between gap-10">
        <div className="lg:hidden flex flex-col gap-5 pb-5">
          <div id="rating" className="flex items-center w-fit gap-2 " >
            <div className=" flex items-center text-[#f59e0b] ">
              <MdOutlineStarPurple500 className="w-3 h-3" /><MdOutlineStarPurple500 className="w-3 h-3" /><MdOutlineStarPurple500 className="w-3 h-3" /><MdOutlineStarPurple500 className="w-3 h-3" /><MdOutlineStarPurple500 className="w-3 h-3" />
            </div>
            <span className="text-black text-sm font-light">4.94 &nbsp;<span className="text-gray-300  ">|</span>&nbsp; 38 reviews</span>
          </div>
          <div id='title-text' className="">
            <h1 className="text-[18px] leading-snug md:text-[24px] !font-semibold">Semi-Custom Team Battlegear</h1>
          </div>
          <div id="price" className=" text-[19px] md:text-2xl font-light">
            {selectedColors[selectedColors.length - 1] === "#FFFFFF" || selectedColors[selectedColors.length - 1] === "#000000" ? '$199.00-$209.00' : '$199.00-$209.00'}
            <p className="text-[13px] pt-2">{selectedColors[selectedColors.length - 1] === "#FFFFFF" || selectedColors[selectedColors.length - 1] === "#000000" ? '$250 deposit, refunded after MOQ met' : '$500 deposit, refunded after MOQ met'}</p>
          </div>
          <p className="text-[13px] ">Customize your team’s look with Titan’s Semi-Custom Team BattleGear! Choose from 8 bold designs, 21 sublimation colors, and 17 thread colors for your team identity. Built with Stretch ProCurve™️ technology. Available for bulk team orders with volume discounts or individual ordering.</p>

        </div>
        <div id='left-side' className="w-full h-[320px] max-h-[320px] lg:h-[750px] lg:max-h-[750px]   bg-[#f2f2f2] rounded-2xl lg:max-w-[60%]">
          <div id='model' className="w-full h-[320px] max-h-[320px] lg:h-[850px] lg:max-h-[850px] ">
            {/* Threejs Model */}
            <div className="relative w-full h-[320px] max-h-[320px] lg:h-[750px] lg:max-h-[750px] ">
              {/* ✅ Scene Component with Loading Handler */}
              {/* <Scene selectedVariant={selectedVariant} colors={selectedColors} /> */}
              {/* <Scene uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos} logoSize={logoSize} setLogoSize={setLogoSize}  logoPosition={logoPosition} colors={selectedColors} selectedVariant={selectedVariant} /> */}
              <Scene uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos} logoSize={logoSize} colors={selectedColors} setSelectedColors={setSelectedColors} selectedVariant={selectedVariant} />
            </div>
          </div>
        </div>
        <div id="right-side" className=" lg:pt-0 flex flex-col gap-4 w-full  lg:max-w-[40%] ">
          <div className="hidden lg:flex flex-col gap-5 ">
            <div id="rating" className="flex items-center w-fit gap-2 " >
              <div className=" flex items-center text-[#f59e0b] ">
                <MdOutlineStarPurple500 className="w-3 h-3" /><MdOutlineStarPurple500 className="w-3 h-3" /><MdOutlineStarPurple500 className="w-3 h-3" /><MdOutlineStarPurple500 className="w-3 h-3" /><MdOutlineStarPurple500 className="w-3 h-3" />
              </div>
              <span className="text-black text-sm font-light">4.94 &nbsp;<span className="text-gray-300  ">|</span>&nbsp; 38 reviews</span>
            </div>
            <div id='title-text' className="">
              <h1 className="text-[18px] leading-snug md:text-[24px] !font-semibold">Semi-Custom Team Battlegear</h1>
            </div>
            <div id="price" className=" text-[19px] md:text-2xl font-light">
              {selectedColors[selectedColors.length - 1] === "#FFFFFF" || selectedColors[selectedColors.length - 1] === "#000000" ? '$199.00-$209.00' : '$199.00-$209.00'}
              <p className="text-[13px] pt-2">{selectedColors[selectedColors.length - 1] === "#FFFFFF" || selectedColors[selectedColors.length - 1] === "#000000" ? '$250 deposit, refunded after MOQ met' : '$500 deposit, refunded after MOQ met'}</p>
            </div>
          </div>
          {/* <VariantsSection uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos}  logoSize={logoSize} setLogoSize={setLogoSize} logoPosition={logoPosition} setLogoPosition={setLogoPosition} selectedColors={selectedColors} setSelectedColors={setSelectedColors} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} /> */}
          <VariantsSection uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos} logoSize={logoSize} setLogoSize={setLogoSize} selectedColors={selectedColors} setSelectedColors={setSelectedColors} selectedColorsLabel={selectedColorsLabel} setSelectedColorsLabel={setSelectedColorsLabel} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
          {/* <ButtonsBar texts={texts} setTexts={setTexts} textSettings={textSettings} setTextSettings={setTextSettings} /> */}
          {/* <ButtonsBar onClick2={captureAllSides} rows={rows} setRows={setRows} value={value} /> */}
          {/* ✅ The Button is Now in the Parent Component */}
          <div id="checkout" className=" pb-3  flex justify-between gap-3 lg:gap-5 ">
            <div id="quantity" className="h-13 lg:h-auto flex items-center py-2 px-2 lg:px-4 bg-white rounded-xl border-2 border-[#dcdcdc] hover:border-[#171717] transition-all duration-200 ease-in-out">
              <button className={`${value === minQuantity ? 'text-[rgba(100,100,100,0.6)]' : 'text-black cursor-pointer'} `} onClick={() => { if (value - 1 >= minQuantity) setValue(value - 1); }}>
                <svg className="icon  stroke-2 transform" width='1.25rem' height='1.25rem' viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 6L8 12L14 18"></path>
                </svg>
              </button>
              <input
                type="number"
                value={value}
                onChange={(e) => { if (Number(e.target.value) >= minQuantity) { setValue(Number(e.target.value)); } }} // Updates state when user types
                className="bg-white max-w-14 text-center p-1 outline-none border-none "
              />
              <button className="cursor-pointer" onClick={() => setValue(value + 1)}>
                <svg className="icon rotate-180  icon-sm stroke-2 transform" width='1.25rem' height='1.25rem' viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 6L8 12L14 18"></path>
                </svg>
              </button>

            </div>
            {
              minQuantity === 12 ?
                <button className="relative grow overflow-clip group  text-center  bg-[#171717]  border-2 border-[#171717] rounded-xl transition-all duration-300 ease-in-out text-transparent h-13 lg:h-16 lg:text-lg py-3 px-14 cursor-pointer">
                  <a target='_top' href={`https://www.titanbattlegear.com/pages/semi-custom-registration-form?design=${selectedVariant}&sublimation_thread_colors=${colorsQueryParameter}&quantity=${value}`}>
                    {/* <a target='_top' href={`https://share.hsforms.com/16NVd--q8RGuPbKoeQo1R-wrqjye&logo_file_upload=https://www.titanbattlegear.com`}> */}
                    <span className="absolute pointer-events-none h-56 w-62 left-[-10px] translate-x-[50%] group-hover:translate-x-0 group-hover:w-[calc(100%+20px)] bg-white text-black translate-y-[-260px] group-hover:translate-y-[-100px] rounded-full transition-all duration-400 ease-in-out"></span>
                    <span className="absolute z-10 inset-0 flex justify-center items-center text-white group-hover:text-[#171717] transition-all duration-300 ease-in-out">Proceed</span>
                    Proceed
                  </a>
                </button>
                : minQuantity === 50 ?
                  <button className="relative grow overflow-clip group  text-center  bg-[#171717]  border-2 border-[#171717] rounded-xl transition-all duration-300 ease-in-out text-transparent h-13 lg:h-16 lg:text-lg py-3 px-14 cursor-pointer">
                    <a target='_top' href={`https://www.titanbattlegear.com/pages/semi-custom-registration-form-1?design=${selectedVariant}&sublimation_thread_colors=${colorsQueryParameter}&quantity=${value}`}>
                      <span className="absolute pointer-events-none h-56 w-62 left-[-10px] translate-x-[50%] group-hover:translate-x-0 group-hover:w-[calc(100%+20px)] bg-white text-black translate-y-[-260px] group-hover:translate-y-[-100px] rounded-full transition-all duration-400 ease-in-out"></span>
                      <span className="absolute z-10 inset-0 flex justify-center items-center text-white group-hover:text-[#171717] transition-all duration-300 ease-in-out">Proceed</span>
                      Proceed
                    </a>
                  </button>
                  :
                  <button className="relative grow overflow-clip group  text-center  bg-[#171717]  border-2 border-[#171717] rounded-xl transition-all duration-300 ease-in-out text-transparent h-13 lg:h-16 lg:text-lg py-3 px-14 cursor-pointer">
                    <a target='_top' href={`https://www.titanbattlegear.com/pages/semi-custom-registration-form?design=${selectedVariant}&sublimation_thread_colors=${colorsQueryParameter}&quantity=${value}`}>
                      <span className="absolute pointer-events-none h-56 w-62 left-[-10px] translate-x-[50%] group-hover:translate-x-0 group-hover:w-[calc(100%+20px)] bg-white text-black translate-y-[-260px] group-hover:translate-y-[-100px] rounded-full transition-all duration-400 ease-in-out"></span>
                      <span className="absolute z-10 inset-0 flex justify-center items-center text-white group-hover:text-[#171717] transition-all duration-300 ease-in-out">Proceed</span>
                      Proceed
                    </a>
                  </button>
            }
          </div>
          <button className="relative grow overflow-clip group  text-center  bg-white  border-2 border-[#171717] rounded-xl transition-all duration-300 ease-in-out text-transparent h-13 lg:h-16 lg:text-lg py-3 px-14 cursor-pointer">
            {/* <a target='_top' href={`https://www.titanbattlegear.com/pages/semi-custom-registration-form?design=${selectedVariant}&thread_color=${selectedColors[5] === '#ffffff' || selectedColors[5] === '#000000' ? 'Standard' : 'Premium'}&quantity=${value}`}> */}
            <a target='_top' href="https://www.titanbattlegear.com/pages/semi-custom-FORM">
              <span className="absolute pointer-events-none h-56 w-62 left-[-10px] translate-x-[50%] group-hover:translate-x-0 group-hover:w-[calc(100%+20px)] bg-[#171717] text-white translate-y-[260px] group-hover:translate-y-[-100px] rounded-full transition-all duration-600 ease-in-out"></span>
              <span className="absolute z-10 inset-0 flex justify-center items-center text-[#171717] group-hover:text-white transition-all duration-300 ease-in-out">Skip Design</span>
              Skip Design
            </a>
          </button>
          <p className="text-[13px]"><span className="font-semibold">USA Hockey:</span> Approved for play under USA Hockey regulations. Ensures gear meets safety standards for organized play in the United States. // CE: Meets European safety standards for protective equipment. Designed for compliance with regulations across European leagues and recreational play.</p>
          {/* Collapsibles */}
          <div className="border-t  border-gray-200 w-full text-[rgba(42,42,42,0.6)] pb-4 text-sm font-light">
            <Collapsible icon={'/collapsibleSvgs/first.svg'} title="Fabric & Technology">
              <ul className="list-disc pl-5 text-sm font-light space-y-2">
                <li className="pl-2">Body and Sleeve: 87% Poly 13% Lycra, 4.16 oz</li>
                <li className="pl-2">Back Mesh: 90% 10% Lycra, 3.24 oz</li>
                <li className="pl-2">Fit: Fitted Athletic Fit</li>
                <li className="pl-2">ARC~GUARD™ Contoured Collar</li>
                <li className="pl-2">TITANOTEX™ cut-resistant neck guard</li>
                <li className="pl-2">TITANOTEX™ cut-resistant bib</li>
                <li className="pl-2">TITANOTEX™ cut-resistant wrist guards</li>
                <li className="pl-2">4-Way Stretch</li>
                <li className="pl-2">Quick Dry Technology</li>
                <li className="pl-2">Thermo-Regulated</li>
                <li className="pl-2">Mesh Back & Underarm Panel</li>
                <li className="pl-2">Anti-Bacterial</li>
                <li className="pl-2">Oeko-Tex Certified (<a href="#" className="text-blue-600 underline">learn more</a>)</li>
              </ul>
            </Collapsible>
            <Collapsible icon={'/collapsibleSvgs/second.svg'} title="Product Description">
              <p className="pl-5 ">Customize your team’s look with Titan’s Semi-Custom Team BattleGear! Choose from 8 bold designs, 21 sublimation colors, and 17 thread colors for a truly unique team identity. Built with Stretch ProCurve™️ collar technology. Available for bulk team orders with volume discounts or individual ordering.</p>
            </Collapsible>
            <Collapsible icon={'/collapsibleSvgs/third.svg'} title="Shipping & Returns">
              <ul className="list-disc pl-5 space-y-4">
                <li><span className="font-semibold">Shipping:</span> Free USPS ground shipping over $50 within the United States. Need it quicker? Opt for UPS or Fedex, 2-Day or Overnight at checkout.</li>
                <li><span className="font-semibold">Returns:</span> Free returns within the United States (30-day return policy). Full refunds are provided for items returned in unused and undamaged condition. Custom team gear, personalized items, or special order items are not eligible for returns. Some sales on standard items may also have return restrictions.</li>
              </ul>
            </Collapsible>
            <Collapsible icon={'/collapsibleSvgs/fourth.svg'} title="Care Instructions">
              <ul className="list-disc pl-5 space-y-4">
                <li>Hand or Machine Wash, Cold</li>
                <li>Line or Tumble Dry, No Heat</li>
                <li>No Bleach</li>
                <li>Do Not Iron or Dry Clean</li>
              </ul>
            </Collapsible>
            <Collapsible icon={'/collapsibleSvgs/fifth.svg'} title="Made in the Americas">
              <ul className="list-disc pl-5 space-y-2">
                <li className="pl-2"><span className="font-[500]">Proudly American-Made Materials:</span> The majority of our components are sourced from the USA, including our industry-leading 100% American-made cut-resistant fabrics.</li>
                <li className="pl-2"><span className="font-[500]">Expert Assembly in Colombia:</span> Assembling nearshore allows us to maintain the highest quality standards while offering faster shipping and cost savings under a duty-free trade agreement with Colombia.</li>
                <li className="pl-2"><span className="font-[500]">Sustainability That Matters:</span> Our approach prioritizes cleaner energy sources, with Manizales, Colombia using 100% renewable energy compared to less than 10% in China, significantly reducing our carbon footprint.</li>
                <li className="pl-2"><span className="font-[500]">Efficient, Reliable Delivery:</span> With distribution hubs in Florida, we ensure quick and dependable delivery to your door.</li>
                <li className="pl-2"><span className="font-[500]">Ethics and Excellence at Every Step:</span> By keeping production close to home, we support American jobs, maintain transparency, and uphold the highest standards of environmental responsibility.</li>
                <img className="py-3" src="https://www.titanbattlegear.com/cdn/shop/files/made_americas_color.svg?v=1733750975&width=393" alt="Made in americas" />
              </ul>
            </Collapsible>
            <Collapsible icon={'/collapsibleSvgs/sixth.svg'} title="Product Disclamer">
              <div className=" pl-5 space-y-2">
                <p>Products offering “cut resistance” and “cut protection” do not 100% prevent or eliminate cut injuries or lacerations, especially against powered blades or sharp equipment.</p>

                <p>The information provided by Titan Battlegear is based on current knowledge and is intended as guidance for your decisions or product selections.</p>

                <p>Titan Battlegear’s cut protection products are highly resistant to cuts, but they are not completely cut-proof. Nothing is 100% cut-proof under all conditions.</p>

                <p>The Battlegear collection provides a very high level of protection, but caution is advised during use. Despite their high resistance to cuts, there is always a possibility that objects could penetrate these products under certain circumstances.</p>
              </div>
            </Collapsible>
          </div>
          <img src="https://cdn.shopify.com/s/files/1/0635/2401/2210/files/ansi_pill.svg?v=1738688294?v=1738611986?v=1733439885" alt="Cut resistance safety scale" />
        </div>
        {/* <span className={`absolute right-0 top-10 p-5 border-t border-l border-b rounded-tl-2xl rounded-bl-2xl z-[999] bg-red-500 text-white text-xs transition-all duration-300 ease-in-out ${rows.some((row) => row.size === "") ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          Please select a size
        </span> */}
      </div>
    </div>
  );
};

export default JerseyConfigurator;
