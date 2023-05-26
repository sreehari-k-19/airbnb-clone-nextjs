"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItems from "./navbar/MenuItems";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "../types";
import useRentalModal from "../hooks/useRentModal";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const Usermenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal=useRentalModal()
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen()
  }, [currentUser, loginModal,rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm  font-semibold  py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItems onClick={() => {}} label="My trips" />
                <MenuItems onClick={() => {}} label="My favorites" />
                <MenuItems onClick={() => {}} label="My reservations" />
                <MenuItems onClick={() => {}} label="My properties" />
                <MenuItems onClick={rentModal.onOpen} label="Airbnb my Home" />
                <hr />
                <MenuItems
                  onClick={() => {
                    signOut();
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItems onClick={registerModal.onOpen} label="Signup" />
                <MenuItems onClick={loginModal.onOpen} label="Login" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
