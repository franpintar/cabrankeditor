import { useScene } from "../../context/SceneContext"

export function LeftPanel() {
    const { entities, selectedId, setSelectedId } = useScene();

    return (
        <>
            <div className="flex-1 border-b border-neutral-700 flex flex-col">
                <div className="p-2 border-b border-neutral-700 bg-neutral-900">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Scene</span>
                </div>

                <div className="flex-1 overflow-y-auto p-1">
                    {entities.map((entity) => (
                        <div
                            key={entity.id}
                            onClick={() => setSelectedId(entity.id)}
                            className={`px-2 py-1 text-sm cursor-pointer ${entity.id === selectedId
                                ? 'bg-blue-600 text-white'
                                : 'text-neutral-300 hover:bg-neutral-700'
                                }`}
                        >
                            {entity.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="p-2 border-b border-neutral-700 bg-neutral-900">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">FileSystem</span>
                </div>
            </div>
        </>
    )
}
