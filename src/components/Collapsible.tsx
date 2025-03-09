import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

type CollapsibleProps = {
  title: string;
  icon: any;
  children: React.ReactNode;
};

const Collapsible: React.FC<CollapsibleProps> = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b  border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between cursor-pointer items-center text-[14px] lg:text-[15px] text-[#171717] w-full py-4 text-left"
      >
        <div className="flex items-center gap-3 text-[#171717] ">
          <img className="collapsible_icon w-7 h-7 lg:w-8 lg:h-8 text-[#171717c1]" src={icon} alt="Icon" />
          <span className="text-[#171717] text font-[500]">{title}</span>
        </div>
        <FaPlus className={` text-[14px] m-0 text-[#171717] transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'} `} />
      </button>
      <div
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
          overflow: "hidden"
        }}
      >
        <div className="pb-4 text-[12px] lg:text-[13px] leading-[21px] text-[rgba(23,23,23,0.6)]">{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
