import Link from "next/link";
import Listtodo from "./components/Listtodo";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center mt-10">
      <div className="flex gap-40">
        <p className="text-2xl">PocketBase</p>
        <div className="flex gap-4">
          <Link href="/auth">
          <button className="text-2xl border py-2 px-6 text-white bg-green-500 rounded-lg">
            Login|Signup
          </button>
          </Link>
        </div>
      </div>
      <div className="border-b py-2 w-[500px] mx-auto">
        <Listtodo />
      </div>
    </div>
  );
}
