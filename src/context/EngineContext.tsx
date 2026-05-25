
import { createContext, useContext } from 'react';
import CabrankEngine from '../engine/CBKBindings.js';

export type EngineModule = Awaited<ReturnType<typeof CabrankEngine>>;

// Wraps the live WASM module instance. Use this to mutate engine state
// (entityCreate, setTransform, deserializeScene, etc.).
//
// SceneContext holds the React-side Entity[] that drives the outliner/inspector UI.
// The two are NOT automatically synchronized: the engine is the source of truth
// for the 3D simulation; React state is the source of truth for the UI.
// Any code that modifies one side must manually update the other.
export const EngineContext = createContext<EngineModule | null>(null);

export function useEngine() {
    const m = useContext(EngineContext);
    if (!m) throw new Error('useEngine must be used inside EngineProvider');
    return m;
}
