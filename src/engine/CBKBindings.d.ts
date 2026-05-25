import type { CameraComponent, CameraControllerComponent, DirectionalLightComponent, PointLightComponent, TextComponent, TransformComponent } from "../types/ecs";

interface CBKModule {
    FS: {
        mkdirTree(path: string): void;
        writeFile(path: string, data: Uint8Array): void;
    };
    sceneNew(name: string): void;
    serializeScene(): string;
    deserializeScene(json: string): void;
    entityCreate(name: string): number;
    entityDestroy(id: number): void;
    getTransform(id: number): string;
    getCamera(id: number): string;
    getCameraController(id: number): string;
    getDirectionalLight(id: number): string;
    getPointLight(id: number): string;
    getText(id: number): string;
    setTransform(id: number, json: string): boolean;
    setCamera(id: number, json: string): boolean;
    setCameraController(id: number, json: string): boolean;
    setDirectionalLight(id: number, json: string): boolean;
    setPointLight(id: number, json: string): boolean;
    setText(id: number, json: string): boolean;
    addTransform(id: number, json: string): void;
    addCamera(id: number, json: string): void;
    addCameraController(id: number, json: string): void;
    addDirectionalLight(id: number, json: string): void;
    addPointLight(id: number, json: string): void;
    addText(id: number, json: string): void;
    addPhongModel(id: number, json: string): void;
    removeTransform(id: number, json: string): void;
    removeCamera(id: number, json: string): void;
    removeCameraController(id: number, json: string): void;
    removeDirectionalLight(id: number, json: string): void;
    removePointLight(id: number, json: string): void;
    removeText(id: number, json: string): void;
}

declare function CabrankEngine(opts?: {
    canvas?: HTMLCanvasElement;
    print?: (text: string) => void;
    printErr?: (text: string) => void;
}): Promise<CBKModule>;

export default CabrankEngine;
