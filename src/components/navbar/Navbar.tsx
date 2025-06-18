import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";
import { Menu, XIcon } from "lucide-react";
import { useWeatherData } from "@/hooks/useWeatherData";
import MarkerDropDown from "./MarkerDropDown";
import FavoriteDropdown from "./FavoriteDropdown";
import ModeToggle from "../ModeToggle";
import TempUnitDropDown from "./TempUnitDropDown";
import RenderCity from "./RenderCity";
import RenderIcon from "./RenderIcon";
import RenderSearch from "./RenderSearch";

function Navbar() {
  const { searchWeatherLocations } = useWeatherData();

  const [query, setQuery] = useState<string>("");
  const [openDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const skipSearchRef = useRef(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    try {
      await searchWeatherLocations(searchQuery);
    } catch (error) {
      console.error("Search failed:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDrawer = (open: boolean) => {
    setIsOpenDrawer(open);
    setQuery("");
    skipSearchRef.current = false;
  };

  useEffect(() => {
    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      if (query) {
        handleSearch(query);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [handleSearch, query]);

  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <RenderIcon />
        <RenderCity />
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <RenderSearch
          query={query}
          setQuery={setQuery}
          skipSearchRef={skipSearchRef}
        />
      </div>

      <div className="hidden gap-x-3 md:flex">
        <ModeToggle />
        <TempUnitDropDown />
        <MarkerDropDown />
        <FavoriteDropdown />
      </div>

      <div className="md:hidden">
        <Drawer
          direction="right"
          open={openDrawer}
          onOpenChange={handleOpenDrawer}
        >
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="size-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm px-4 py-4 h-full">
              <DrawerHeader className="flex flex-row items-center p-0 mb-5 gap-x-3">
                <DrawerTitle className="flex items-center gap-x-3">
                  <ModeToggle />
                  <TempUnitDropDown />
                  <MarkerDropDown />
                  <FavoriteDropdown />
                </DrawerTitle>

                <DrawerDescription />

                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full ml-auto"
                  >
                    <XIcon className="size-5" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>
              <div className="flex flex-col justify-between h-full">
                <RenderSearch
                  query={query}
                  setQuery={setQuery}
                  skipSearchRef={skipSearchRef}
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;
