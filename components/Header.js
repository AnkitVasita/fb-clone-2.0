import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  SearchIcon,
  PlayIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { signOut, useSession } from "next-auth/client";

const Header = () => {
  const [
    {
      user: { name, image },
    },
  ] = useSession();

  return (
    <div className="flex items-center sticky top-0 z-50 bg-white p-1 lg:px-5 shadow-md">
      {/* left */}
      <div className="flex items-center">
        <Image
          src="http://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
      </div>
      <div className="flex  items-center ml-2 rounded-full bg-gray-100 p-2 text-gray-600">
        <SearchIcon className="h-6 " />
        <input
          className=" hidden md:inline-flex  ml-2 items-center bg-transparent  outline-none placeholder-gray-500 flex-shrink "
          type="text"
          placeholder="Search Facebook"
        />
      </div>

      {/* center */}
      <div className="flex justify-center flex-grow ">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon Icon={HomeIcon} active />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* right */}
      <div className="flex items-center justify-end sm:space-x-2">
        <Image
          src={image}
          width={40}
          height={40}
          layout="fixed"
          className="rounded-full
          cursor-pointer
          "
          onClick={signOut}
        />
        <p className=" hidden md:inline-flex whitespace-nowrap font-semibold  pr-3 ">
          {name}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
