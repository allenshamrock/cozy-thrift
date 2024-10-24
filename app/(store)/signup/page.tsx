import SignUpForm from "@/components/forms/SignUpForm"
import { redirect } from "next/navigation";
export default async function signup({searchParams}:{searchParams: {[key:string]:string | undefined}}){

    const {message} = searchParams
    return(
        <div className="w-full h-screen contain mt-[5rem]">
            <SignUpForm message={message}/>
        </div>
    )
}