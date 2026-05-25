import { ProjectionType, type Entity, type Vector3, type Vector4 } from '../types/ecs';

type WireVec3 = [number, number, number];
type WireVec4 = [number, number, number, number];
type WireComponents = Record<string, Record<string, unknown>>;

function toVec3(arr: WireVec3): Vector3 {
    return { x: arr[0], y: arr[1], z: arr[2] };
}

function toVec4(arr: WireVec4): Vector4 {
    return { x: arr[0], y: arr[1], z: arr[2], w: arr[3] };
}

// Converts the engine's wire-format component map (C-prefixed names, snake_case keys,
// vectors as flat arrays) into the typed Entity['components'] used by the React UI.
export function wireComponentsToEcs(wire: WireComponents): Entity['components'] {
    const c: Entity['components'] = {};

    if (wire.CTransform) {
        const t = wire.CTransform as { position: WireVec3; rotation: WireVec3; scale: WireVec3 };
        c.transform = {
            position: toVec3(t.position),
            rotation: toVec3(t.rotation),
            scale: toVec3(t.scale),
        };
    }

    if (wire.CCamera) {
        const cam = wire.CCamera as {
            type: string; is_active: boolean; fov_y: number; aspect_ratio: number;
            near: number; far: number; ortho_size: number;
        };
        c.camera = {
            type: cam.type === 'perspective' ? ProjectionType.Perspective : ProjectionType.Orthographic,
            isActive: cam.is_active,
            fovY: cam.fov_y,
            aspectRatio: cam.aspect_ratio,
            near: cam.near,
            far: cam.far,
            orthoSize: cam.ortho_size,
        };
    }

    if (wire.CCameraController) {
        const cc = wire.CCameraController as {
            translation_speed: number; mouse_sensitivity: number; yaw: number; pitch: number;
        };
        c.cameraController = {
            translationSpeed: cc.translation_speed,
            mouseSensitivity: cc.mouse_sensitivity,
            yaw: cc.yaw,
            pitch: cc.pitch,
        };
    }

    if (wire.CDirectionalLight) {
        const dl = wire.CDirectionalLight as { direction: WireVec3; radiance: WireVec3 };
        c.directionalLight = { direction: toVec3(dl.direction), radiance: toVec3(dl.radiance) };
    }

    if (wire.CPointLight) {
        const pl = wire.CPointLight as {
            radiance: WireVec3; constant: number; linear: number; quadratic: number;
        };
        c.pointLight = {
            radiance: toVec3(pl.radiance),
            constant: pl.constant,
            linear: pl.linear,
            quadratic: pl.quadratic,
        };
    }

    if (wire.CText) {
        const t = wire.CText as { text: string; font_scale: number; color: WireVec4 };
        c.text = { text: t.text, fontScale: t.font_scale, color: toVec4(t.color) };
    }

    if (wire.CPhongModel) {
        c.phongModel = { path: (wire.CPhongModel as { path: string }).path };
    }

    if (wire.CPBRModel) {
        c.pbrModel = { path: (wire.CPBRModel as { path: string }).path };
    }

    return c;
}
