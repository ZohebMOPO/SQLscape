import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <div className="mx-10 flex justify-center">
        <Link href={"/"} className="text-secondary text-4xl mt-[1rem] font-bold">SQLscape</Link>
      </div>
    </>
  );
}
