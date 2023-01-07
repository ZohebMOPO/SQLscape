import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, Grid } from "@nextui-org/react";
import {FiLogOut} from "react-icons/fi"

export default function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <>
    {user && (
        <div className="float-right text-2xl font-bold bg-red-600 text-white px-9 rounded-full py-2 mt-5 mx-5">
          {" "}
          <Link href={"/api/auth/logout"}><FiLogOut/></Link>{" "}
        </div>
      )}  
      {user && (
        <div className="float-right mt-5 mx-5">
          {" "}
          <Avatar
            text={`${user.name}`}
            color="success"
            size={"lg"}
            textColor="white"
            className=""
          />{" "}
        </div>
      )}
      
      <div className="float-right mt-5 mx-5">
        <Link
          href={"describe"}
          className=" text-3xl mx-5 mt-[1.2rem]  border-[#D9D9D9] font-bold"
        >
          {" "}
          query describer
        </Link>
      </div>

      <div className="mx-10 flex justify-center">
        <Link
          href={"/"}
          className="text-secondary mx-5 text-4xl mt-[1rem] font-bold"
        >
          SQLscape
        </Link>
      </div>
    </>
  );
}
