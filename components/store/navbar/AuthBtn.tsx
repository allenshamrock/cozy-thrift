import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import Button from "@/components/Button";

export default function AuthBtns() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button solid label="Sign in" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log in as a user</DialogTitle>
              <DialogDescription>
                You can log in as a new user if you already have an account or
                sign up if not or as John doe for quick demo.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-end gap-3 justify-end">
              <DialogClose asChild>
                <Link
                  className="bg-primary px-3 py-2 rounded-md shadow-sm text-white font-semibold text-sm"
                  href="/signin"
                >
                  Log in
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link
                  className="px-3 py-2 rounded-md bg-white border border-primary shadow-sm text-primary font-semibold text-sm"
                  href="/signin"
                >
                  Log in as John Doe
                </Link>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}
