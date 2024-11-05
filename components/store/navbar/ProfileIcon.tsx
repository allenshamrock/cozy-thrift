"use client";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { TUserSession } from "@/lib/getSession";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { redirect, useRouter } from "next/navigation";
import {signout} from '@/actions/authActions'

export default function ProfileIcon({ user }: { user: TUserSession | null }) {
  const isAdmin = user && user.role === "admin";
  const isUser = user && user.role === "user";

  const router =useRouter()

  return isAdmin ? (
    <Link
      href="dashboard/overview"
      className="flex items-center border-secondary/50 gap-2 px-3 justify-center py-1.5 bg-secondary/10 rounded-md"
    >
      <LayoutDashboard className="w-4 h-4 text-secondary" />
      <span className="text-secondary text-sm  font-semibold">Dashboard</span>
    </Link>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center border-secondary/50 gap-2 px-3 justify-center py-1.5 bg-secondary/10 rounded-md">
          <LayoutDashboard className="w-4 h-4 text-secondary" />
          <span className="text-secondary text-sm  font-semibold">
            Dashboard
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Login as Admin to view Dashboard
            </DialogTitle>
            <DialogDescription>
                You have to login as an admin to view the Dashboard
            </DialogDescription>
            <div className="flex items-end justify-end gap-2">
                <DialogClose asChild>
                    <button className="text-white bg-primary px-3 py-2 rounded-md font-semibold text-sm" onClick={ ()=>{
                        isUser && signout();
                        router.push('/signin?role=admin')
                    }} >
                        Log in as Admin
                    </button>
                </DialogClose>
            </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
