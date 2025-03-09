import { useState } from "react";
import VariantSelector from "./rightSectionComponents/VariantSelector";
import ColorsSelector from "./rightSectionComponents/ColorsSelector";
// import TextSelector from "./rightSectionComponents/TextSelector";
import LogosSelector from "./rightSectionComponents/LogosSelector";
// const VariantsSection = ({ texts, setTexts, textSettings, setTextSettings, selectedColors, setSelectedColors, selectedVariant, setSelectedVariant }: any) => {
    const VariantsSection = ({ selectedColors, setSelectedColors, uploadedLogos, setUploadedLogos, selectedColorsLabel, setSelectedColorsLabel, logoSize,  setLogoSize, selectedVariant, setSelectedVariant }: any) => {
    // const VariantsSection = ({ selectedColors, setSelectedColors, uploadedLogos, setUploadedLogos, logoSize, setLogoSize, selectedVariant, setSelectedVariant }: any) => {

    const [activeTab, setActiveTab] = useState<string>("Design");
    const [animatingTab, setAnimatingTab] = useState<string>("Design");

    const tabs = [
        { id: "Design", name: "Design" },
        { id: "Colors", name: "Colors" },
        // { id: "Text", name: "Text" },
        { id: "Logos", name: "Team Logo" },
    ];

    const handleTabClick = (tabId: string) => {
        if (activeTab !== tabId) {
            setAnimatingTab(tabId); // Start animation
            setTimeout(() => setActiveTab(tabId), 300); // Delay real tab switch
        }
    };

    return (
        <div id="variants-section" className="relative pt-5 pb-2 lg:py-5 w-full  rounded-xl ">
            {/* Tabs */}
            <div id="tabs" className="flex min-w-full font-semibold">
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id}
                        className={`relative  grow px-4 pt-2 text-center pb-4 cursor-pointer transition-all duration-300 ease-in-out text-[#666666] 
                            ${activeTab === tab.id
                                ? "bg-white text-black rounded-t-xl shadow-[0px_2px_10px_#969696]"
                                : "hover:text-gray-500 transition duration-300"
                            }`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        <span className={` ${activeTab === tab.id ? '' : 'opacity-0 translate-y-10'} ${index === tabs.length - 1 ? 'opacity-0' : ''} transition-all duration-300 ease-in-out absolute bottom-0 left-full`}>
                            <svg className="rotate-270 w-5 h-auto" viewBox="0 0 101 101" stroke="none" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M101 0H0V101H1C1 45.7715 45.7715 1 101 1V0Z"></path>
                                <path d="M1 101C1 45.7715 45.7715 1 101 1" fill="none"></path>
                            </svg>
                        </span>
                        {tab.name}
                        <span className={`${activeTab === tab.id ? '' : 'opacity-0 translate-y-10'} ${index === 0 ? 'opacity-0' : ''} transition-all duration-300 ease-in-out absolute bottom-0 right-full`}>
                            <svg className="rotate-180 w-5 h-auto" viewBox="0 0 101 101" stroke="none" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M101 0H0V101H1C1 45.7715 45.7715 1 101 1V0Z"></path>
                                <path d="M1 101C1 45.7715 45.7715 1 101 1" fill="none"></path>
                            </svg>
                        </span>
                    </div>
                ))}
            </div>
            <div className={`absolute w-full  h-5 flex ${activeTab === tabs[0].id ? 'rounded-tl-none' : 'rounded-tl-2xl'}  ${activeTab === tabs[2].id ? 'rounded-tr-none' : 'rounded-tr-2xl'}   overflow-clip`}>

                <div className={` bg-white w-full  h-5`} />

            </div>


            {/* Tab Content */}
            <div className=" bg-white p-3 shadow-[0px_0px_10px_#aaaaaafa] rounded-xl">
                <div className={`  transition-all duration-300 ease-in-out ${animatingTab === "Design" ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-90"}`} style={{ display: activeTab === "Design" ? "block" : "none" }}>
                    <VariantSelector selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
                </div>
                <div className={`  transition-all duration-300 ease-in-out ${animatingTab === "Colors" ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-90"}`} style={{ display: activeTab === "Colors" ? "block" : "none" }}>
                    <ColorsSelector activeTab={activeTab} selectedColors={selectedColors} setSelectedColors={setSelectedColors} selectedColorsLabel={selectedColorsLabel} setSelectedColorsLabel={setSelectedColorsLabel} setActiveTab={setActiveTab} setAnimatingTab={setAnimatingTab} selectedVariant={selectedVariant} />
                </div>
                {/* <div className={`  transition-all duration-300 ease-in-out ${animatingTab === "Text" ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ display: activeTab === "Text" ? "block" : "none" }}>
                    <TextSelector texts={texts} setTexts={setTexts} textSettings={textSettings} setTextSettings={setTextSettings} />
                </div> */}
                <div className={`  transition-all duration-300 ease-in-out ${animatingTab === "Logos" ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ display: activeTab === "Logos" ? "block" : "none" }}>
                    {/* <LogosSelector uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos}  logoSize={logoSize} logoPosition={logoPosition} setLogoPosition={setLogoPosition} setLogoSize={setLogoSize} /> */}
                    <LogosSelector uploadedLogos={uploadedLogos} setUploadedLogos={setUploadedLogos}  logoSize={logoSize} setLogoSize={setLogoSize} />
                </div>
            </div>

        </div>
    );
};

export default VariantsSection;
