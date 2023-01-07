import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <div className="float-right mt-5 mx-5">
        <Link href={"describe"} className=" text-3xl mx-5 mt-[1.2rem]  border-[#D9D9D9] font-bold"> query describer</Link>
      </div>
      <div className="mx-10 flex justify-center">
        <Link href={"/"} className="text-secondary mx-5 text-4xl mt-[1rem] font-bold">SQLscape</Link>
      </div>
    </>
  );
}
