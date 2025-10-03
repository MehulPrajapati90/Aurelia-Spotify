"use client"
import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

const SearchBar = () => {
    const [open, setOpen] = useState(false);

    // Handle keyboard shortcut
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            {/* Search Button */}
            <button
                onClick={() => setOpen(true)}
                className="relative flex flex-1 cursor-text items-center justify-between self-stretch rounded dark:bg-zinc-900 bg-[#f3f3f3] px-4 py-2 dark:text-gray-400 transition dark:hover:bg-zinc-800 hover:bg-[#ffffff] hover:text-zinc-800 border dark:border-none border-[#f3f3f3] dark:focus-visible:bg-zinc-700 focus-visible:bg-[#f2f2f2] dark:focus-visible:text-gray-200 focus-visible:text-zinc-800 overflow-hidden font-sans tracking-[-0.2px]"
            >
                <span className="inline-flex flex-1 items-center">
                    <Search size={16} className="mr-2" />
                    <span className="text-xs text-left">Search</span>
                </span>
                <span className="flex space-x-1">
                    <kbd className="px-1 py-0.5 text-xs dark:bg-zinc-700 bg-[#d4d4d4] rounded">Ctrl</kbd>
                    <kbd className="px-1 py-0.5 text-xs dark:bg-zinc-700 bg-[#d4d4d4] rounded">K</kbd>
                </span>
            </button>

            {/* Command Dialog */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <div className="dark:bg-zinc-900 bg-[#e8e8e8] border dark:border-zinc-800">
                    <CommandInput
                        placeholder="Type a command or search..."
                        className="bg-transparent border-none dark:text-gray-300 text-zinc-700 dark:placeholder:text-gray-500 placeholder:text-zinc-400"
                    />
                    <CommandList className="dark:bg-zinc-900 bg-[#f3f3f3]">
                        <CommandEmpty className="text-gray-500 py-6 text-center">No results found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem onSelect={() => setOpen(false)} className="dark:text-gray-300 text-zinc-800 hover:bg-zinc-800">
                                <span>Love Music</span>
                            </CommandItem>
                            <CommandItem onSelect={() => setOpen(false)} className="dark:text-gray-300 text-zinc-800 hover:bg-zinc-800">
                                <span>Justine Bieber</span>
                            </CommandItem>
                            <CommandItem onSelect={() => setOpen(false)} className="dark:text-gray-300 text-zinc-800 hover:bg-zinc-800">
                                <span>The Weeknd</span>
                            </CommandItem>
                            <CommandItem onSelect={() => setOpen(false)} className="dark:text-gray-300 text-zinc-800 hover:bg-zinc-800">
                                <span>Taylor Swift</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>

                    {/* Bottom navigation hints */}
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-zinc-800 dark:bg-zinc-900 bg-[#e5e5e5] border-[#f4f4f4]">
                        <div className="flex items-center space-x-4 text-xs dark:text-gray-500">
                            <div className="flex items-center space-x-1">
                                <kbd className="px-1.5 py-0.5 dark:bg-zinc-800 dark:text-gray-400 rounded text-xs">↑</kbd>
                                <kbd className="px-1.5 py-0.5 dark:bg-zinc-800 dark:text-gray-400 rounded text-xs">↓</kbd>
                                <span>to navigate</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <kbd className="px-1.5 py-0.5 dark:bg-zinc-800 dark:text-gray-400 rounded text-xs">↵</kbd>
                                <span>to select</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs dark:text-gray-500">
                            <kbd className="px-1.5 py-0.5 dark:bg-zinc-800 dark:text-gray-400 rounded text-xs">ESC</kbd>
                            <span>to close</span>
                        </div>
                    </div>
                </div>
            </CommandDialog>
        </>
    )
}

export default SearchBar