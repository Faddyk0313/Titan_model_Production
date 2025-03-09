
const VariantSelector = ({ selectedVariant, setSelectedVariant }: any) => {
  const variants = [
    { id: "BATTLE", name: "BATTLE", imgSrc: "/thumbnails/BATTLE.webp" },
    { id: "CONQUER", name: "CONQUER", imgSrc: "/thumbnails/CONQUER.webp" },
    { id: "POWER", name: "POWER", imgSrc: "/thumbnails/POWER.webp" },
    { id: "CLASH", name: "CLASH", imgSrc: "/thumbnails/CLASH.webp" },
    { id: "BROADSTREET", name: "BROADSTREET", imgSrc: "/thumbnails/BROADSTREET.webp" },
    { id: "ASSAULT", name: "ASSAULT", imgSrc: "/thumbnails/ASSULT.webp" },
    { id: "DOMINATE", name: "DOMINATE", imgSrc: "/thumbnails/DOMINATE.webp" },
    { id: "BLADE", name: "BLADE", imgSrc: "/thumbnails/BLADE.webp" },
  ];

  return (
    <div id="variant-group" className="grid grid-cols-4 text-xs md:gap-y-4 py-3 xl:p-6 ">
      {variants.map((variant,index) => (
        <button
          key={index}
          onClick={() => setSelectedVariant(variant.id)}
          className={`text-center h-fit cursor-pointer rounded-xl overflow-clip transition-all duration-200 ease-in-out border-2 py-2 m-0.5 md:m-2 hover:border-[#171717] ${selectedVariant === variant.id ? " border-[#171717] " : " border-[#dcdcdc]"
            }`}
        >
          <img src={variant.imgSrc} alt={`Blue hockey jersey named ${variant.name}`} className=" max-h-[75px] mx-auto" />
          <span className="pt-1 text-[9px] ">{variant.name}</span>
        </button>
        // <a
        //   key={index}
        //   href={`https://titan-3d-product-configurator.vercel.app/?design=${variant.id}`}>
        //   <div
        //     className={`text-center h-fit cursor-pointer rounded-xl overflow-clip transition-all duration-200 ease-in-out border-2 py-2 m-0.5 md:m-2 hover:border-[#171717] ${selectedVariant === variant.id ? " border-[#171717] " : " border-[#dcdcdc]"
        //       }`}
        //   >
        //     <img src={variant.imgSrc} alt={`Blue hockey jersey named ${variant.name}`} className=" max-h-[75px] mx-auto" />
        //     <span className="pt-1 text-[9px] ">{variant.name}</span>
        //   </div>
        // </a>
      ))}
    </div>
  );
};

export default VariantSelector;
