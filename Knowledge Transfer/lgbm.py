# Create a clearer LightGBM leaf-wise growth example tree using the student pass dataset example.
import matplotlib.pyplot as plt
import networkx as nx

# Create directed graph for LightGBM example
G = nx.DiGraph()

# Define nodes with labels
nodes_labels = {
    "root": "Hours Studied > 4?",
    "low_hours": "Low chance\n(~20%)",
    "high_hours": "Attendance > 80%?",
    "low_attendance": "Medium chance\n(~60%)",
    "high_attendance": "High chance\n(~95%)",
    "high_hours_split": "Study consistency > 6 hrs/day?",
    "inconsistent": "Lower high chance\n(~85%)",
    "consistent": "Max chance\n(~98%)"
}

# Add edges for leaf-wise growth
# First split
G.add_edge("root", "low_hours", label="No")
G.add_edge("root", "high_hours", label="Yes")
# Second split - biggest error in high_hours leaf
G.add_edge("high_hours", "low_attendance", label="No")
G.add_edge("high_hours", "high_attendance", label="Yes")
# Third split - biggest error now in high_attendance leaf
G.add_edge("high_attendance", "inconsistent", label="No")
G.add_edge("high_attendance", "consistent", label="Yes")

# Use graphviz layout for better tree look
pos = nx.nx_agraph.graphviz_layout(G, prog="dot")

# Draw nodes
plt.figure(figsize=(10,6))
nx.draw(G, pos, with_labels=True, labels=nodes_labels,
        node_size=3500, node_color="lightgreen",
        font_size=9, font_weight="bold", edgecolors="black")

# Draw edges with labels
nx.draw_networkx_edge_labels(G, pos, edge_labels=nx.get_edge_attributes(G, 'label'), font_size=9)

plt.title("LightGBM Leaf-wise Growth – Student Pass Prediction Example", fontsize=14)
plt.axis("off")

lgbm_tree_path = "/mnt/data/lightgbm_leafwise_example.png"
plt.savefig(lgbm_tree_path, bbox_inches="tight", dpi=200)
lgbm_tree_path
