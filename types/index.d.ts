import Vue from "vue";

export declare class Node {
    data: any | null;
    name: any | null;
    hasChild: boolean;
    children: any[];
}

export declare interface NodeParser {
    (data: any, labelName: string): Node;
}

export declare interface LoadChildrenCallback {
    (children: any[] | null | undefined): void;
}

export declare interface LoadChildren {
    (node: Node, callback: LoadChildrenCallback): void;
}

declare class Twig extends Vue {
    data: any | null;
    index: number | null | undefined;
    parser: NodeParser;
    labelName: string;
    parents: any[];
    autoExtend: boolean;
    loadChildren: LoadChildren | undefined;
    reloadOnExtend: boolean;
}

export declare class VueTwigTreeH extends Twig { }
export declare class VueTwigTreeV extends Twig { }
