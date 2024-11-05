import { createClient } from "@/lib/supabase/server";
import AuthBtns from "./AuthBtn";
import CartIcon from "./CartIcon";
import MobileMenu from "./mobilemenu/MobileMenu";
import ProfileIcon from './ProfileIcon'
import SearchBar from "./search/SearchBar";
import { getUserSession } from "@/lib/getSession";


export default async function Navbar(){
    const supabase = createClient()
    const {data:{user}} = await supabase.auth.getUser()
    const {data:categories} = await supabase.from("categories").select()

    const profile = await getUserSession()

    return(
        <nav className="z-[999] h-[4rem] top-0 w-full border-b bg-white" >
            <div className="contain h-full mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    {/* <Logo/> */}
                    <div className="hidden md:block"></div>
                </div>
                <div className="flex items-center gap-3">
                    <SearchBar/>
                    <ProfileIcon user={profile} />
                    <CartIcon/>
                    <AuthBtns user={user} />
                    <MobileMenu categories={categories} user={user}/>
                </div>
            </div>
        </nav>
    )
}