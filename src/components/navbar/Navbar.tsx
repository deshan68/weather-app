"use client";

import { MapPin, Menu, XIcon } from "lucide-react";
import { Text } from "../ui/text";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "../ui/drawer";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Icon
          asChild
          size="xl"
          color="primary"
          background="secondary"
          rounded="full"
          className="p-2.5"
        >
          <MapPin />
        </Icon>
        <Text size="sm" color="default" weight="light">
          Colombo, Sri Lanka
        </Text>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:flex flex-1 justify-center">
        <Input
          type="text"
          placeholder="Search city..."
          className="max-w-80 w-full"
        />
      </div>

      {/* Desktop Theme Toggle */}
      <div className="hidden md:flex">
        <ModeToggle />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm px-4 py-4 h-full">
              <DrawerHeader className="flex flex-row items-center p-0 mb-5">
                <ModeToggle />

                <DrawerClose asChild>
                  <Icon
                    asChild
                    size="xl"
                    color="primary"
                    background="secondary"
                    rounded="full"
                    className="ml-auto p-2.5"
                  >
                    <XIcon />
                  </Icon>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex flex-col justify-between h-full">
                <Input type="text" placeholder="Search city..." />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;
