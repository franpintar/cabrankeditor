import { Separator } from "react-resizable-panels";

interface PanelSeparatorProps {
    orientation: 'horizontal' | 'vertical';
}

export function PanelSeparator({ orientation }: PanelSeparatorProps) {
    const isVertical = orientation === 'vertical';
    const sizeClass = isVertical ? 'h-1 cursor-row-resize' : 'w-1 cursor-col-resize';

    return (
        <Separator className={`${sizeClass} bg-neutral-900 focus:outline-none hover:bg-blue-500 transition-colors`} />
    )
}
