"use client";

import React, { Fragment, useState } from "react";
import { useParams } from "next/navigation";

import { Popover, Transition } from "@headlessui/react";
import { signout } from "@/lib/data/customer";
import AccountNavLink from "@/components/account/account-nav/account-nav-link";
import { profileNavItemsGroups } from "@/components/account/account-nav/consts";
import { Box } from "@/components/shared/box";
import { Button } from "@/components/shared/button";
import Divider from "@/components/shared/divider";
import LocalizedClientLink from "@/components/shared/localized-client-link";
import {
  HeadphonesIcon,
  LogoutIcon,
  UserIcon,
} from "@/components/shared/icons";

import { ThemeSwitcher } from "./theme-switcher";

const ProfileDropdown = ({ loggedIn }: { loggedIn: boolean }) => {
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const open = () => setCartDropdownOpen(true);
  const close = () => setCartDropdownOpen(false);

  const { countryCode } = useParams();

  const handleLogout = async () => {
    await signout(countryCode as string);
  };

  return (
    <Box className="z-50 h-full" onMouseEnter={open} onMouseLeave={close}>
      <Popover className="relative h-full">
        <Popover.Button
          className="cursor-default rounded-full bg-transparent !p-2 text-action-primary outline-none hover:text-action-primary-hover active:bg-fg-secondary-pressed active:text-action-primary-pressed xsmall:!p-3.5 small:hover:bg-fg-secondary-hover"
          data-testid="profile-dropdown-button"
        >
          <UserIcon />
        </Popover.Button>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="absolute -right-10 top-[calc(100%+8px)] w-[264px] border border-action-primary bg-primary text-basic-primary small:right-0"
          >
            {loggedIn ? (
              profileNavItemsGroups.slice(0, 2).map((group, groupIndex) => (
                <Fragment key={groupIndex}>
                  <ul className="p-2">
                    {group.map((item) => (
                      <li key={item.href || item.type}>
                        {item.type === "logout" ? (
                          <Button
                            variant="text"
                            onClick={handleLogout}
                            className="w-full justify-start rounded-none p-0 hover:bg-hover"
                          >
                            <div className="flex items-center gap-2 p-4 text-lg">
                              {item.icon}
                              {item.label}
                            </div>
                          </Button>
                        ) : (
                          <AccountNavLink href={item.href} icon={item.icon}>
                            {item.label}
                          </AccountNavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                  {groupIndex < profileNavItemsGroups.length - 1 && (
                    <div className="h-px w-full bg-hover" />
                  )}
                </Fragment>
              ))
            ) : (
              <>
                <Box className="flex flex-col gap-2 p-2">
                  <Button
                    size="sm"
                    className="!bg-black !text-white hover:!bg-gray-800"
                    asChild
                  >
                    <LocalizedClientLink href="/account?mode=sign-in">
                      Sign in
                    </LocalizedClientLink>
                  </Button>
                  <Button
                    size="sm"
                    className="!bg-transparent !text-black border border-black hover:!bg-gray-100"
                    asChild
                  >
                    <LocalizedClientLink href="/account?mode=register">
                      Sign up
                    </LocalizedClientLink>
                  </Button>
                </Box>
                <Divider />
              </>
            )}
            {/* <Box className="p-2">
              <ThemeSwitcher />
              <AccountNavLink href="#" icon={<HeadphonesIcon />}>
                Support center
              </AccountNavLink>
            </Box> */}
            {loggedIn && (
              <>
                <Divider />
                <Box className="p-2">
                  <Button
                    variant="text"
                    onClick={handleLogout}
                    className="w-full justify-start rounded-none p-0 hover:bg-hover"
                  >
                    <div className="flex items-center gap-4 p-4 text-lg">
                      <LogoutIcon />
                      Log out
                    </div>
                  </Button>
                </Box>
              </>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </Box>
  );
};

export default ProfileDropdown;
