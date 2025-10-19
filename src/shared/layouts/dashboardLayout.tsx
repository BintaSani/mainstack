import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import SideNav from "../components/sideNav";
import FilterDrawer from "../../features/filter/components/filterDrawer";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen w-full  bg-white  flex flex-col ">
      <header className="fixed z-20 w-full  px-4 pt-4 bg-white">
        <Navbar />{" "}
      </header>
      <aside className="w-fit z-20 fixed bottom-5 md:top-[40%] left-1/4 md:left-4">
        <SideNav />{" "}
      </aside>
      <main className="flex-1 relative flex pt-36 pb-16">
        <div className=" w-[80%] max-h-full  mx-auto ">
          <Outlet />{" "}
        </div>{" "}
      </main>{" "}
      <FilterDrawer />
    </div>
  );
}
