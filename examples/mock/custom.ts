export default {
    root: { id: "root", name: "Root" },
    children: {
        "root": [{ id: "1", name: "Leaf-1" }, { id: "2", name: "Leaf-2" }],
        "1": [{ id: "1-1", name: "Leaf-1-1" }, { id: "1-2", name: "Leaf-1-2" }],
        "2": [{ id: "2-1", name: "Leaf-2-1" }]
    }
}