import Copy from "../../assets/copy.svg";
import CopyGray from "../../assets/copygray.svg";
import Invoicing from "../../assets/invoicing.svg";
import InvoicingGray from "../../assets/invoicingray.svg";
import MediaKit from "../../assets/mediakit.svg";
import MediaKitGray from "../../assets/mediakitgray.svg";
import Store from "../../assets/store.svg";
import StoreGray from "../../assets/storegray.svg";

const items = [
  { color: Copy, gray: CopyGray, alt: "copy" },
  { color: Store, gray: StoreGray, alt: "store" },
  { color: MediaKit, gray: MediaKitGray, alt: "media kit" },
  { color: Invoicing, gray: InvoicingGray, alt: "invoicing" },
];

const SideNav = () => {
  return (
    <div className="p-1 shadow-md bg-white flex flex-col gap-2 shadow-[#5C738314] rounded-b-full rounded-t-full">
      <ul className="flex md:flex-col gap-2 [&>li]:relative  [&>li]:p-2 [&>li]:cursor-pointer [&>li]:rounded-full [&>li]:hover:bg-gray-100">
        {items.map((item, idx) => (
          <li key={idx} className="p-2 group">
            {/* Gray icon (default) */}
            <img
              src={item.gray}
              alt={item.alt}
              className=" group-hover:hidden"
            />
            {/* Color icon (hover) */}
            <img
              src={item.color}
              alt={item.alt}
              className="hidden group-hover:flex "
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
