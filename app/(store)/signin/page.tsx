import SignInForm from "@/components/forms/SignInForm";
export default async function signin({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
   const { message, role } = searchParams;

  return (
    <div className="contain mt-[5rem] w-full min-h-screen">
      <SignInForm message={message} role={role} />
    </div>
  );
}