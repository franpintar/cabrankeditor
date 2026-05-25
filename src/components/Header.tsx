import * as Menubar from '@radix-ui/react-menubar';
export function Header() {
    return (
        <header className="bg-neutral-800 border-b border-neutral-700 flex flex-col">

            <Menubar.Root>
                <nav className="h-8 flex items-center px-2 text-xs text-neutral-400">

                    <Menubar.Menu>
                        <Menubar.Trigger className="px-2 py-1 data-highlighted:bg-neutral-700 cursor-pointer outline-none data-[state=open]:bg-neutral-700">
                            Scene
                        </Menubar.Trigger>

                        <Menubar.Portal>

                            <Menubar.Content
                                className="bg-neutral-800 border border-neutral-700 shadow-xl p-1 min-w-40 text-neutral-300 text-xs z-50"
                                sideOffset={4}
                            >

                                <Menubar.Item className="px-2 py-1.5 data-highlighted:bg-blue-600 data-highlighted:text-white cursor-default outline-none">
                                    New Scene
                                </Menubar.Item>

                                <Menubar.Item className="px-2 py-1.5 data-highlighted:bg-blue-600 data-highlighted:text-white cursor-default outline-none">
                                    Open Scene...
                                </Menubar.Item>

                                <Menubar.Separator className="h-px bg-neutral-700 my-1" />

                                <Menubar.Item className="px-2 py-1.5 data-highlighted:bg-blue-600 data-highlighted:text-white rounded cursor-default outline-none">
                                    Save Scene
                                </Menubar.Item>

                                <Menubar.Item className="px-2 py-1.5 data-highlighted:bg-blue-600 data-highlighted:text-white rounded cursor-default outline-none">
                                    Save Scene As...
                                </Menubar.Item>

                            </Menubar.Content>

                        </Menubar.Portal>
                    </Menubar.Menu>

                    <Menubar.Menu>
                        <Menubar.Trigger className="px-2 py-1 data-highlighted:bg-neutral-700 cursor-pointer outline-none data-[state=open]:bg-neutral-700">
                            Project
                        </Menubar.Trigger>

                        <Menubar.Portal>

                            <Menubar.Content
                                className="bg-neutral-800 border border-neutral-700 shadow-xl p-1 min-w-40 text-neutral-300 text-xs z-50"
                                sideOffset={4}
                            >

                                <Menubar.Item className="px-2 py-1.5 data-highlighted:bg-blue-600 data-highlighted:text-white cursor-default outline-none">
                                    Project Settings...
                                </Menubar.Item>

                                <Menubar.Separator className="h-px bg-neutral-700 my-1" />

                                <Menubar.Item className="px-2 py-1.5 data-highlighted:bg-blue-600 data-highlighted:text-white cursor-default outline-none">
                                    Export...
                                </Menubar.Item>

                            </Menubar.Content>

                        </Menubar.Portal>
                    </Menubar.Menu>

                    <Menubar.Menu>
                        <Menubar.Trigger className="px-2 py-1 data-highlighted:bg-neutral-700 cursor-pointer outline-none data-[state=open]:bg-neutral-700">
                            Help
                        </Menubar.Trigger>

                        <Menubar.Portal>

                            <Menubar.Content
                                className="bg-neutral-800 border border-neutral-700 shadow-xl p-1 min-w-40 text-neutral-300 text-xs z-50"
                                sideOffset={4}
                            >

                                <Menubar.Item className="px-2 py-1.5 data-highlighted:bg-blue-600 hover:text-white cursor-default outline-none">
                                    About...
                                </Menubar.Item>

                            </Menubar.Content>

                        </Menubar.Portal>
                    </Menubar.Menu>

                </nav>
            </Menubar.Root>
        </header>
    )
}
