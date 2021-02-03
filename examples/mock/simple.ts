export default {
    name: "Root",
    children: [
        {
            name: "Leaf-1",
            children: [
                { name: "Leaf-1-1" },
                { name: "Leaf-1-2" }
            ]
        },
        { name: "Leaf-2", children: [{ name: "Leaf-2-1" }] }
    ]
}