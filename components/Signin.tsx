'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Signin() {
  const router = useRouter();
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/signin')
  };
  return (
    <Button
      className="bg-slate-900 cursor-pointer font-semibold text-sm text-white my-3 "
      variant="outline"
      onClick={handleClick}
    >
      Sign in
    </Button>
  );
}
