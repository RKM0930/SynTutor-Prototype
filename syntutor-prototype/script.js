/*
  SynTutor mock interaction layer
  ------------------------------------------------------------
  This file uses fixed mock constituency-tree data from the PDF.
  No backend or real NLP parsing is performed.
*/

const landingScreen = document.getElementById("landingScreen");
const appScreen = document.getElementById("appScreen");
const launchButton = document.getElementById("launchButton");
const sentenceForm = document.getElementById("sentenceForm");
const sentenceInput = document.getElementById("sentenceInput");
const clearButton = document.getElementById("clearButton");
const syntaxTree = document.getElementById("syntaxTree");
const emptyTreeState = document.getElementById("emptyTreeState");
const emptyXaiState = document.getElementById("emptyXaiState");
const xaiContent = document.getElementById("xaiContent");
const xaiExplanation = document.getElementById("xaiExplanation");

const COLOR = {
  black: "#111111",
  valid: "#3b93d1",
  issue: "#e21d2f",
};

const SAMPLE_MAP = {
  "driver should taken the cadillac": "problem",
  "the driver should have taken the cadillac": "correct",
};

const DATASETS = {
  problem: {
    sentence: "Driver should taken the Cadillac",
    viewBox: "0 0 800 610",
    initialNode: "problem-driver-word",
    nodes: [
      { id: "problem-s", label: "S", x: 385, y: 42, type: "node" },
      { id: "problem-np-subj", label: "NP*", x: 205, y: 115, type: "node", status: "issue" },
      { id: "problem-vp-main", label: "VP", x: 505, y: 115, type: "node" },
      { id: "problem-n-subj", label: "N", x: 205, y: 185, type: "node" },
      { id: "problem-driver-word", label: "Driver*", x: 205, y: 255, type: "word", status: "issue" },
      { id: "problem-v-should", label: "V", x: 430, y: 185, type: "node" },
      { id: "problem-should-word", label: "should", x: 430, y: 255, type: "word" },
      { id: "problem-vp-error", label: "VP*", x: 580, y: 185, type: "node", status: "issue" },
      { id: "problem-v-taken", label: "V", x: 548, y: 280, type: "node" },
      { id: "problem-taken-word", label: "taken*", x: 548, y: 365, type: "word", status: "issue" },
      { id: "problem-np-obj", label: "NP", x: 660, y: 280, type: "node" },
      { id: "problem-det-obj", label: "Det", x: 628, y: 365, type: "node" },
      { id: "problem-n-obj", label: "N", x: 718, y: 365, type: "node" },
      { id: "problem-the-obj", label: "the", x: 628, y: 465, type: "word" },
      { id: "problem-cadillac-word", label: "cadillac", x: 718, y: 465, type: "word" },
    ],
    edges: [
      ["problem-s", "problem-np-subj"],
      ["problem-s", "problem-vp-main"],
      ["problem-np-subj", "problem-n-subj"],
      ["problem-n-subj", "problem-driver-word"],
      ["problem-vp-main", "problem-v-should"],
      ["problem-vp-main", "problem-vp-error"],
      ["problem-v-should", "problem-should-word"],
      ["problem-vp-error", "problem-v-taken"],
      ["problem-vp-error", "problem-np-obj"],
      ["problem-v-taken", "problem-taken-word"],
      ["problem-np-obj", "problem-det-obj"],
      ["problem-np-obj", "problem-n-obj"],
      ["problem-det-obj", "problem-the-obj"],
      ["problem-n-obj", "problem-cadillac-word"],
    ],
    explanations: {
      "problem-s": "This structure represents the Main Clause. The Noun Phrase functions as the Subject (the entity performing the action), while the Verb Phrase functions as the Predicate (containing the complex verb chain and its target).",
      "problem-np-subj": "This Noun Phrase is structurally incomplete. Because its internal composition consists only of a singular countable noun, it violates the phrase-structure requirement for a Specifier, rendering it invalid as a dependent daughter to the main Sentence node.",
      "problem-n-subj": "The category N correctly identifies that the terminal word is a Noun. The categorical identification is valid, even though the phrase surrounding it requires structural correction.",
      "problem-driver-word": "The word 'Driver' is a Singular Countable Noun. However, it cannot function independently as a complete Noun Phrase to serve as the Subject. It requires a Determiner (such as 'the' or 'a') to act as a Specifier and structurally complete the phrase.",
      "problem-vp-main": "This is the Highest Verb Phrase in the predicate. It serves as a valid structural container, headed by a modal auxiliary verb that establishes the grammatical mood for the rest of the verbal chain.",
      "problem-v-should": "The category V correctly identifies the terminal word as a Verb. As a structural label, it is a valid head for this parent Verb Phrase.",
      "problem-should-word": "The word 'should' is a Modal Auxiliary Verb. It functions as the Head of the highest Verb Phrase, introducing an element of obligation or recommendation to the entire predicate.",
      "problem-vp-error": "This nested Verb Phrase contains a structural form error. Because it is headed by a past participle, the entire phrase is an invalid dependent for the parent Modal Verb Phrase above it. The attachment at this specific node violates the English head-complement constraint.",
      "problem-v-taken": "The category V correctly identifies the terminal word as a Verb. The categorical identification is correct, but the specific morphological form chosen by the user violates the higher phrase rules.",
      "problem-taken-word": "The word 'taken' is categorized as a Past Participle Lexical Verb. However, it cannot function as the direct constituent of a parent Verb Phrase headed by a modal like 'should'. Structural constraints require a Modal Auxiliary to be immediately followed by a bare infinitive verb (e.g., 'take' or 'have').",
      "problem-np-obj": "This Noun Phrase functions correctly as the Direct Object (Complement). It receives the action of the transitive verb, specifying exactly what entity was affected.",
      "problem-det-obj": "The category Det correctly identifies the terminal word as a Determiner, functioning as a valid structural dependent within this phrase.",
      "problem-the-obj": "The word 'the' is a Determiner. It acts as a Specifier within the object phrase, indicating to the reader that a specific, definite instance of the noun is being referenced.",
      "problem-n-obj": "The category N correctly identifies the terminal word as a Noun, serving as a valid structural head for this phrase.",
      "problem-cadillac-word": "The word 'cadillac' is a Noun. It functions as the Lexical Head of this Noun Phrase, identifying the central object that the specifier modifies.",
    },
  },

  correct: {
    sentence: "The driver should have taken the cadillac",
    viewBox: "0 0 850 640",
    initialNode: "correct-s",
    nodes: [
      { id: "correct-s", label: "S", x: 350, y: 42, type: "node" },
      { id: "correct-np-subj", label: "NP", x: 170, y: 115, type: "node" },
      { id: "correct-vp-main", label: "VP", x: 455, y: 115, type: "node" },
      { id: "correct-det-subj", label: "Det", x: 70, y: 190, type: "node" },
      { id: "correct-n-subj", label: "N", x: 190, y: 190, type: "node" },
      { id: "correct-the-subj", label: "the", x: 70, y: 270, type: "word" },
      { id: "correct-driver-word", label: "driver", x: 190, y: 270, type: "word" },
      { id: "correct-v-should", label: "V", x: 360, y: 190, type: "node" },
      { id: "correct-should-word", label: "should", x: 360, y: 270, type: "word" },
      { id: "correct-vp-perfect", label: "VP", x: 550, y: 190, type: "node" },
      { id: "correct-v-have", label: "V", x: 500, y: 275, type: "node" },
      { id: "correct-have-word", label: "have", x: 500, y: 365, type: "word" },
      { id: "correct-vp-core", label: "VP", x: 640, y: 275, type: "node" },
      { id: "correct-v-taken", label: "V", x: 595, y: 365, type: "node" },
      { id: "correct-taken-word", label: "taken", x: 595, y: 455, type: "word" },
      { id: "correct-np-obj", label: "NP", x: 720, y: 365, type: "node" },
      { id: "correct-det-obj", label: "Det", x: 680, y: 455, type: "node" },
      { id: "correct-n-obj", label: "N", x: 785, y: 455, type: "node" },
      { id: "correct-the-obj", label: "the", x: 680, y: 555, type: "word" },
      { id: "correct-cadillac-word", label: "cadillac", x: 785, y: 555, type: "word" },
    ],
    edges: [
      ["correct-s", "correct-np-subj"],
      ["correct-s", "correct-vp-main"],
      ["correct-np-subj", "correct-det-subj"],
      ["correct-np-subj", "correct-n-subj"],
      ["correct-det-subj", "correct-the-subj"],
      ["correct-n-subj", "correct-driver-word"],
      ["correct-vp-main", "correct-v-should"],
      ["correct-vp-main", "correct-vp-perfect"],
      ["correct-v-should", "correct-should-word"],
      ["correct-vp-perfect", "correct-v-have"],
      ["correct-vp-perfect", "correct-vp-core"],
      ["correct-v-have", "correct-have-word"],
      ["correct-vp-core", "correct-v-taken"],
      ["correct-vp-core", "correct-np-obj"],
      ["correct-v-taken", "correct-taken-word"],
      ["correct-np-obj", "correct-det-obj"],
      ["correct-np-obj", "correct-n-obj"],
      ["correct-det-obj", "correct-the-obj"],
      ["correct-n-obj", "correct-cadillac-word"],
    ],
    explanations: {
      "correct-s": "This structure represents the Main Clause. The Noun Phrase functions as the Subject (the entity performing the action), while the Verb Phrase functions as the Predicate (containing the complex verb chain and its target).",
      "correct-np-subj": "This Noun Phrase functions as the Subject. It identifies the actor of the clause and is structurally complete because it contains both a Determiner and a Noun head.",
      "correct-det-subj": "The category Det correctly identifies the determiner inside the subject Noun Phrase, where it functions as the required Specifier for the noun.",
      "correct-the-subj": "The word 'the' is a Determiner. It acts as a Specifier within the subject phrase, indicating that a specific, previously known driver is being referenced.",
      "correct-n-subj": "The category N correctly identifies the noun head of the subject phrase. It is structurally licensed by the preceding determiner.",
      "correct-driver-word": "The word 'driver' is a Noun. It serves as the Lexical Head of the subject Noun Phrase, identifying the specific actor who is obligated to perform the verb.",
      "correct-vp-main": "This is the Highest Verb Phrase in the predicate. It is headed by a modal auxiliary verb that expresses obligation or likelihood, establishing the mood for the rest of the verbal chain.",
      "correct-v-should": "The category V correctly identifies the modal auxiliary as the verbal head of this highest Verb Phrase.",
      "correct-should-word": "The word 'should' is a Modal Auxiliary Verb. It functions as the Head of the highest Verb Phrase, introducing an element of obligation or recommendation to the entire predicate.",
      "correct-vp-perfect": "This is a Nested Verb Phrase. It is headed by a perfect auxiliary verb, which shifts the temporal aspect of the action to indicate a state of completion relative to the modal.",
      "correct-v-have": "The category V correctly identifies the auxiliary verb that heads this nested Verb Phrase.",
      "correct-have-word": "The word 'have' is an Auxiliary Verb. Within this nested Verb Phrase, it functions to establish the Perfect Aspect, indicating that the recommended action applies to a prior timeframe.",
      "correct-vp-core": "This is the Core Verb Phrase. It contains the main lexical verb and its required complement (the direct object), forming the concrete action of the predicate.",
      "correct-v-taken": "The category V correctly identifies the main lexical verb in past participle form within the core Verb Phrase.",
      "correct-taken-word": "The word 'taken' is a Lexical Verb in its past participle form. It serves as the Lexical Head of the innermost Verb Phrase, providing the core semantic action that requires a direct object to be complete.",
      "correct-np-obj": "This Noun Phrase functions as the Direct Object. It receives the action of the transitive verb, specifying exactly what was affected.",
      "correct-det-obj": "The category Det correctly identifies the determiner functioning as the Specifier inside the object phrase.",
      "correct-the-obj": "The word 'the' is a Determiner. It acts as a Specifier for the object phrase, pointing to a specific instance of the noun.",
      "correct-n-obj": "The category N correctly identifies the lexical head of the object Noun Phrase.",
      "correct-cadillac-word": "The word 'cadillac' is a Noun. It functions as the Lexical Head of the object Noun Phrase, identifying the specific entity that was affected by the action of being taken.",
    },
  },
};

let currentDatasetKey = null;
let currentSelectedNode = null;

launchButton.addEventListener("click", () => {
  landingScreen.classList.add("is-hidden");
  appScreen.classList.remove("is-hidden");
  sentenceInput.focus();
});

sentenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  analyzeInput(sentenceInput.value);
});

sentenceInput.addEventListener("input", () => {
  const value = sentenceInput.value;
  clearButton.classList.toggle("is-hidden", value.length === 0);
  analyzeInput(value);
});

clearButton.addEventListener("click", () => {
  sentenceInput.value = "";
  clearButton.classList.add("is-hidden");
  showEmptyState();
  sentenceInput.focus();
});

function normalizeSentence(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.?!]+$/g, "")
    .replace(/\s+/g, " ");
}

function analyzeInput(value) {
  const normalized = normalizeSentence(value);

  if (!normalized) {
    showEmptyState();
    return;
  }

  const datasetKey = SAMPLE_MAP[normalized];

  if (!datasetKey) {
    showEmptyState();
    return;
  }

  if (datasetKey !== currentDatasetKey) {
    currentDatasetKey = datasetKey;
    currentSelectedNode = DATASETS[datasetKey].initialNode;
    renderTree(DATASETS[datasetKey]);
  } else {
    selectTreeNode(currentSelectedNode || DATASETS[datasetKey].initialNode);
  }
}

function showEmptyState() {
  currentDatasetKey = null;
  currentSelectedNode = null;
  syntaxTree.classList.add("is-hidden");
  emptyTreeState.classList.remove("is-hidden");
  xaiContent.classList.add("is-hidden");
  emptyXaiState.classList.remove("is-hidden");
}

function renderTree(dataset) {
  syntaxTree.setAttribute("viewBox", dataset.viewBox);
  syntaxTree.innerHTML = "";

  const childMap = buildChildMap(dataset.edges);
  const activeIds = collectDescendants(currentSelectedNode, childMap);
  const nodeLookup = Object.fromEntries(dataset.nodes.map((node) => [node.id, node]));

  const edgeLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const labelLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");

  dataset.edges.forEach(([fromId, toId]) => {
    const from = nodeLookup[fromId];
    const to = nodeLookup[toId];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y + 22);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y - 22);
    line.classList.add("tree-edge");

    if (activeIds.has(fromId) && activeIds.has(toId)) {
      line.classList.add("is-active");
    }

    edgeLayer.appendChild(line);
  });

  dataset.nodes.forEach((node) => {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.textContent = node.label;
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y);
    text.setAttribute("tabindex", "0");
    text.setAttribute("role", "button");
    text.setAttribute("aria-label", `Explain ${node.label}`);
    text.dataset.nodeId = node.id;
    text.classList.add("tree-label");

    if (node.type === "word") {
      text.classList.add("terminal");
    }

    if (activeIds.has(node.id)) {
      text.classList.add(node.status === "issue" ? "is-issue" : "is-active");
    }

    text.addEventListener("click", () => selectTreeNode(node.id));
    text.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectTreeNode(node.id);
      }
    });

    labelLayer.appendChild(text);
  });

  syntaxTree.append(edgeLayer, labelLayer);
  syntaxTree.classList.remove("is-hidden");
  emptyTreeState.classList.add("is-hidden");
  emptyXaiState.classList.add("is-hidden");
  xaiContent.classList.remove("is-hidden");
  updateExplanation(dataset, currentSelectedNode);
}

function selectTreeNode(nodeId) {
  if (!currentDatasetKey) return;

  currentSelectedNode = nodeId;
  renderTree(DATASETS[currentDatasetKey]);
}

function updateExplanation(dataset, nodeId) {
  const fallback = "Select a label or word in the syntax tree to view its structural explanation.";
  xaiExplanation.textContent = dataset.explanations[nodeId] || fallback;
}

function buildChildMap(edges) {
  return edges.reduce((map, [from, to]) => {
    if (!map[from]) map[from] = [];
    map[from].push(to);
    return map;
  }, {});
}

function collectDescendants(startId, childMap) {
  const selected = new Set();

  function walk(nodeId) {
    if (!nodeId || selected.has(nodeId)) return;
    selected.add(nodeId);
    (childMap[nodeId] || []).forEach(walk);
  }

  walk(startId);
  return selected;
}

showEmptyState();
