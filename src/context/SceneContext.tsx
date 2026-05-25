import { createContext, useContext, useState, type ReactNode } from "react";
import type { Entity } from "../types/ecs";

interface SceneContextType {
    entities: Entity[];
    setEntities: (entities: Entity[]) => void;
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: ReactNode }) {
    const [entities, setEntities] = useState<Entity[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <SceneContext.Provider value={{ entities, setEntities, selectedId, setSelectedId }}>
            {children}
        </SceneContext.Provider>
    );
}

export function useScene() {
    const context = useContext(SceneContext);
    if (!context) throw new Error('useScene must be used inside a SceneProvider');
    return context;
}
