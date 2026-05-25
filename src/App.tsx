import { Header } from './components/Header';
import { Panel, Group } from 'react-resizable-panels'
import { LeftPanel } from './components/panels/LeftPanel';
import { CenterPanel } from './components/panels/CenterPanel';
import { RightPanel } from './components/panels/RightPanel';
import { PanelSeparator } from './components/panels/PanelSeparator';
import { useState, useEffect } from 'react';
import { EngineContext, type EngineModule } from './context/EngineContext';
import { useScene } from './context/SceneContext';
import { wireComponentsToEcs } from './engine/converters';
import defaultScene from './scenes/default_scene.json?raw';

export default function App() {
  const [engine, setEngine] = useState<EngineModule | null>(null);
  const { setEntities } = useScene();

  useEffect(() => {
    if (!engine) return;
    engine.deserializeScene(defaultScene);

    // Read back what the engine loaded and sync the React-side entity list.
    // deserializeScene doesn't expose the engine's internal entity IDs, so we
    // use the array index as a placeholder. When the Inspector needs to call
    // getTransform/setTransform, this will need to be replaced with entity-by-entity
    // creation via entityCreate() so we can capture the real IDs.
    const { entities } = JSON.parse(engine.serializeScene()) as {
      entities: Array<{ name: string; components: Record<string, Record<string, unknown>> }>;
    };
    setEntities(entities.map((e, i) => ({
      id: i,
      name: e.name,
      components: wireComponentsToEcs(e.components),
    })));
  }, [engine]);

  return (
    <EngineContext.Provider value={engine}>
      <div className="h-screen w-screen flex flex-col">
        <Header />

        <div className="flex-1 flex overflow-hidden">
          <Group orientation="horizontal">

            <Panel defaultSize={"15"} minSize={"10"} maxSize={"40"} className="bg-neutral-800 flex flex-col">
              <LeftPanel />
            </Panel>

            <PanelSeparator orientation='horizontal' />

            <Panel defaultSize={"60"} minSize={"30"} className="flex flex-col">
              <CenterPanel onEngineReady={setEngine} />
            </Panel>

            <PanelSeparator orientation='horizontal' />

            <Panel defaultSize={"20"} minSize={"12"} maxSize={"40"} className="bg-neutral-800 flex flex-col">
              <RightPanel />
            </Panel>

          </Group>
        </div>
      </div>
    </EngineContext.Provider>
  );
}
