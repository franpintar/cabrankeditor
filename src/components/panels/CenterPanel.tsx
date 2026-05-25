import { Panel, Group } from 'react-resizable-panels'
import { PanelSeparator } from './PanelSeparator'
import { type EngineModule } from '../../context/EngineContext';
import { EngineCanvas } from '../EngineCanvas';
import { useState } from 'react';

interface CenterPanelProps {
    onEngineReady: (engine: EngineModule) => void;
}

export function CenterPanel({ onEngineReady }: CenterPanelProps) {
    const [logs, setLogs] = useState<string[]>([]);

    const handleLog = (text: string) => {
        setLogs((prevLogs) => {
            const newLines = text
                .split(/[´\n]/)
                .filter(line => line.trim() !== '');
            return [...prevLogs, ...newLines];
        });
    };

    return (
        <Group orientation="vertical">

            <Panel defaultSize={"75"} minSize={"30"} className="bg-neutral-950 flex items-center justify-center">
                <EngineCanvas onReady={onEngineReady} onLog={handleLog} />
            </Panel>

            <PanelSeparator orientation='vertical' />

            <Panel defaultSize={"25"} minSize={"10"} maxSize={"50"} className="bg-neutral-900 flex flex-col">
                <div className="h-8 border-t border-b border-neutral-700 bg-neutral-800 flex items-center px-2">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Output</span>
                </div>
                <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-1">
                    {logs.length === 0 ? (
                        <span className="text-neutral-600 text-xs font-mono italic">Waiting for engine output...</span>
                    ) : (
                        logs.map((log, index) => (
                            <div
                                key={index}
                                className={`text-xs font-mono whitespace-pre-wrap break-all ${log.startsWith('[ERROR]') ? 'text-red-400' : 'text-neutral-400'}`}
                            >
                                {log}
                            </div>
                        ))
                    )}
                </div>
            </Panel>

        </Group >
    )
}
