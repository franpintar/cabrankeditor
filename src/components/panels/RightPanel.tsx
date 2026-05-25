import { useState, useEffect } from "react";
import { useScene } from "../../context/SceneContext";
import { ProjectionType, type Entity, type Vector3, type Vector4 } from "../../types/ecs";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border-b border-neutral-700">
            <div className="px-3 py-1.5 bg-neutral-750 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                {title}
            </div>
            <div className="px-3 py-2 flex flex-col gap-1">
                {children}
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-baseline justify-between gap-2 text-xs">
            <span className="text-neutral-500 shrink-0">{label}</span>
            <span className="text-neutral-200 font-mono text-right">{value}</span>
        </div>
    );
}

function fmt(n: number) { return n.toFixed(3); }
function Vec3({ v }: { v: Vector3 }) { return <>{fmt(v.x)}  {fmt(v.y)}  {fmt(v.z)}</>; }
function Vec4({ v }: { v: Vector4 }) { return <>{fmt(v.x)}  {fmt(v.y)}  {fmt(v.z)}  {fmt(v.w)}</>; }

function Inspector({ entity }: { entity: Entity }) {
    const c = entity.components;
    return (
        <div className="flex flex-col">
            <div className="px-3 py-2 border-b border-neutral-700">
                <span className="text-sm font-medium text-neutral-100">{entity.name}</span>
            </div>

            {c.transform && (
                <Section title="Transform">
                    <Row label="Position" value={<Vec3 v={c.transform.position} />} />
                    <Row label="Rotation" value={<Vec3 v={c.transform.rotation} />} />
                    <Row label="Scale" value={<Vec3 v={c.transform.scale} />} />
                </Section>
            )}

            {c.camera && (
                <Section title="Camera">
                    <Row label="Type" value={c.camera.type === ProjectionType.Perspective ? 'Perspective' : 'Orthographic'} />
                    <Row label="FOV Y" value={fmt(c.camera.fovY)} />
                    <Row label="Near" value={fmt(c.camera.near)} />
                    <Row label="Far" value={fmt(c.camera.far)} />
                    <Row label="Active" value={c.camera.isActive ? 'Yes' : 'No'} />
                </Section>
            )}

            {c.cameraController && (
                <Section title="Camera Controller">
                    <Row label="Speed" value={fmt(c.cameraController.translationSpeed)} />
                    <Row label="Sensitivity" value={fmt(c.cameraController.mouseSensitivity)} />
                    <Row label="Yaw" value={fmt(c.cameraController.yaw)} />
                    <Row label="Pitch" value={fmt(c.cameraController.pitch)} />
                </Section>
            )}

            {c.directionalLight && (
                <Section title="Directional Light">
                    <Row label="Direction" value={<Vec3 v={c.directionalLight.direction} />} />
                    <Row label="Radiance" value={<Vec3 v={c.directionalLight.radiance} />} />
                </Section>
            )}

            {c.pointLight && (
                <Section title="Point Light">
                    <Row label="Radiance" value={<Vec3 v={c.pointLight.radiance} />} />
                    <Row label="Constant" value={fmt(c.pointLight.constant)} />
                    <Row label="Linear" value={fmt(c.pointLight.linear)} />
                    <Row label="Quadratic" value={fmt(c.pointLight.quadratic)} />
                </Section>
            )}

            {c.text && (
                <Section title="Text">
                    <Row label="Text" value={c.text.text} />
                    <Row label="Font Scale" value={fmt(c.text.fontScale)} />
                    <Row label="Color" value={<Vec4 v={c.text.color} />} />
                </Section>
            )}

            {c.phongModel && (
                <Section title="Phong Model">
                    <Row label="Path" value={c.phongModel.path} />
                </Section>
            )}

            {c.pbrModel && (
                <Section title="PBR Model">
                    <Row label="Path" value={c.pbrModel.path} />
                </Section>
            )}
        </div>
    );
}

export function RightPanel() {
    const [rightTab, setRightTab] = useState('inspector');
    const { entities, selectedId } = useScene();

    useEffect(() => {
        if (selectedId !== null) setRightTab('inspector');
    }, [selectedId]);

    const selectedEntity = selectedId !== null ? entities.find(e => e.id === selectedId) : null;

    return (
        <>
            <div className="flex bg-neutral-900 border-b border-neutral-700">
                <button
                    onClick={() => setRightTab('inspector')}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${rightTab === 'inspector'
                        ? 'text-neutral-200 bg-neutral-800'
                        : 'text-neutral-500 hover:text-neutral-300'
                        }`}>
                    Inspector
                </button>
                <button
                    onClick={() => setRightTab('history')}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${rightTab === 'history'
                        ? 'text-neutral-200 bg-neutral-800'
                        : 'text-neutral-500 hover:text-neutral-300'
                        }`}>
                    History
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {rightTab === 'inspector' && (
                    selectedEntity
                        ? <Inspector entity={selectedEntity} />
                        : <div className="p-3"><span className="text-neutral-500 text-xs">Select an entity to inspect</span></div>
                )}
                {rightTab === 'history' && (
                    <div className="p-2"><span className="text-neutral-400 text-sm">History content</span></div>
                )}
            </div>
        </>
    );
}
