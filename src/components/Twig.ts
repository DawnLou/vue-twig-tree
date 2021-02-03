import { Vue, Prop, Watch, Component, Ref, Emit } from 'vue-property-decorator';

export interface LoadChildrenCallback {
    (children: any[] | null | undefined): void;
}

export interface LoadChildren {
    (node: any, callback: LoadChildrenCallback): void;
}

export class Node {
    data: any | null = null;
    name: any | null = null;
    hasChild = false;
    children: any[] = [];
}
export interface NodeParser {
    (data: any, labelName: string): Node;
}
const defaultParser: NodeParser = function (data: any, labelName: string) {
    const node = new Node();
    const name = data[labelName];
    if (name) {
        node.name = name;
    }
    const children = data.children;
    if (children && children instanceof Array) {
        node.children = children;
        node.hasChild = children.length > 0;
    }
    return node;
}

@Component
export default class Twig extends Vue {
    @Prop(Object) readonly data!: any | null;
    @Prop(Number) readonly index!: number | null | undefined;
    @Prop({ type: Function, default: defaultParser }) readonly parser!: NodeParser;
    @Prop({ type: String, default: "name" }) readonly labelName!: string;
    @Prop({ type: Array, default: function (): any[] { return []; } }) readonly parents!: any[];
    @Prop({ type: Boolean, default: true }) readonly autoExtend!: boolean;
    @Prop(Function) readonly loadChildren!: LoadChildren | undefined;
    @Ref("twig") readonly twig!: HTMLElement;
    node: Node | null = null;
    extend = false;
    unretractive = false;
    loading = false;
    get span(): number {
        if (!this.node) return 1;
        const len = this.node.children.length;
        return len ? len * 2 : 1;
    }
    @Watch("data", { immediate: true, deep: true })
    onDataChanged(val: any | null | undefined) {
        if (!val) {
            this.node = null;
            this.extend = false;
            this.loading = false;
            return;
        }
        const copy = JSON.parse(JSON.stringify(val));
        this.node = this.parser(copy, this.labelName);
        this.unretractive = val.unretractive ? true : false;
        if (this.unretractive || this.autoExtend) {
            this.extend = true;
        } else {
            this.extend = val.extend ? true : false;
        }
    }
    onExtendHandleClick() {
        if (!this.node) return;
        if (this.extend) {
            this.extend = false;
            return;
        }
        if (this.loadChildren) {
            this.loading = true;
            this.loadChildren(this.node, this.loadChildrenCallback);
            return;
        }
        this.extend = true;
    }
    loadChildrenCallback(children: any[] | null | undefined) {
        this.loading = false;
        if (!this.node) return;
        this.extend = true;
        this.node.children = children ? children : [];
    }
    addChild(child: any) {
        if (!this.node || !child) return;
        this.node.children.push(child);
        this.node.hasChild = true;
        this.extend = true;
    }
    removeChild(i: number | null | undefined) {
        if (!this.node || i === undefined || i === null || i < 0 || i >= this.node.children.length) return;
        this.node.children.splice(i, 1);
        if (this.node.children.length < 1) {
            this.node.hasChild = false;
            this.extend = false;
        }
    }
    @Emit()
    removeCurrent() {
        return this.index;
    }
}