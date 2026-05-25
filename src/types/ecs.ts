export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;
}

export const ProjectionType = {
    Perspective: 0,
    Orthographic: 1
} as const;

export type ProjectionType = typeof ProjectionType[keyof typeof ProjectionType];

export interface TransformComponent {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
}

export interface CameraComponent {
    type: ProjectionType;
    isActive: boolean;
    fovY: number;
    aspectRatio: number;
    near: number;
    far: number;
    orthoSize: number;
}

export interface CameraControllerComponent {
    translationSpeed: number;
    mouseSensitivity: number;
    yaw: number;
    pitch: number;
}

export interface SpriteComponent {
    path: string;
    tint: Vector4;
    tilingFactor: number;
}

export interface PhongModelComponent {
    path: string;
}

export interface PBRModelComponent {
    path: string;
}

export interface TextComponent {
    text: string;
    fontScale: number;
    color: Vector4;
}

export interface DirectionalLightComponent {
    direction: Vector3;
    radiance: Vector3;
}

export interface PointLightComponent {
    radiance: Vector3;
    constant: number;
    linear: number;
    quadratic: number;
}

export interface CollisionFilterComponent {
    categoryBits: number;
    maskBits: number;
}

export interface AABBColliderComponent {
    halfExtents: Vector3;
}

export interface SphereColliderComponent {
    radius: number;
}

export interface OBBColliderComponent { // Research how to solve 2D vs 3D with templates
    halfExtents: Vector3;
    orientation: number;
}

export interface PlaneColliderComponent {
    normal: Vector3;
    distance: number;
}

export interface CapsuleColliderComponent {
    direction: Vector3;
    halfHeight: number;
    radius: number;
}

export interface CylinderColliderComponent {
    halfHeight: number;
    radius: number;
}

export interface Entity {
    id: number;
    name: string;
    components: {
        transform?: TransformComponent;
        camera?: CameraComponent;
        cameraController?: CameraControllerComponent;
        sprite?: SpriteComponent;
        phongModel?: PhongModelComponent;
        pbrModel?: PBRModelComponent;
        text?: TextComponent;
        directionalLight?: DirectionalLightComponent;
        pointLight?: PointLightComponent;
        collisionFilter?: CollisionFilterComponent;
        aabbCollider?: AABBColliderComponent;
        obbCollider?: OBBColliderComponent;
        planeCollider?: PlaneColliderComponent;
        capsuleCollider?: CapsuleColliderComponent;
        sphereCollider?: SphereColliderComponent;
    }
}
