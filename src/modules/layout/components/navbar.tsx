import { Button } from "@/components/ui/button";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import UserControl from "./user-controls";
import { AudioLines } from "lucide-react";
import SearchBar from "./search-bar";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-[#efefef] dark:border-white/10 transition-all duration-200 hover:bg-white/15 dark:hover:bg-black/15 px-4">
                <div className="px-6 py-4 flex justify-between items-center">
                    <Link href={"/"} className="flex items-center justify-center gap-20">
                        <div className="flex items-center justify-center gap-2">
                            <div>
                                <AudioLines size={25} />
                            </div>
                            <span className="font-bold text-2xl dark:text-[#f3f3f3] text-[#101114] font-sans tracking-[-1.1px]">
                                Aurelia
                            </span>
                        </div>

                        <div className='flex items-center justify-between space-x-2 w-120'>
                            <div className="border-animation relative p-[1px] rounded flex-1 self-stretch overflow-hidden flex items-center justify-center" aria-hidden="true">
                                <SearchBar />
                            </div>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <SignedIn >
                            <UserControl />
                        </SignedIn>

                        <SignedOut>
                            <div className="flex items-center gap-2">
                                <SignInButton>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10"
                                    >
                                        Sign In
                                    </Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button
                                        size="sm"
                                        className="text-sm font-medium bg-[#41B313] hover:bg-[#369611] text-white rounded-[5px]"
                                    >
                                        Sign Up
                                    </Button>
                                </SignUpButton>
                            </div>
                        </SignedOut>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar