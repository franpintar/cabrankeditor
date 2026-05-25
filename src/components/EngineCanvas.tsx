import { useEffect, useRef } from "react";
import type { EngineModule } from "../context/EngineContext";
import CabrankEngine from "../engine/CBKBindings";

interface EngineCanvasProps {
    onReady: (m: EngineModule) => void;
    onLog: (text: string) => void;
}

export function EngineCanvas({ onReady, onLog }: EngineCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // ref persists across StrictMode's mount > unmount > remount cycle; useState would reset to false and allow a second init
    const isInitializing = useRef(false);

    useEffect(() => {
        if (isInitializing.current) return;
        isInitializing.current = true;

        CabrankEngine({
            canvas: canvasRef.current!,
            print: (text: string) => onLog(text),
            printErr: (text: string) => onLog(`[ERROR] ${text}`)
        }).then(m => {
            onReady(m);
        });
    }, []);

    return <canvas ref={canvasRef} width={1280} height={720} className="w-full h-full object-contain" />;
}
