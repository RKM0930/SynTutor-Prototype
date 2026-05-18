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
const sentenceSelector = document.getElementById("sentenceSelector");
const sentenceList = document.getElementById("sentenceList");
const sentenceSelectButton = document.getElementById("sentenceSelectButton");
const sentenceSelectLabel = document.getElementById("sentenceSelectLabel");
const sentenceSelectedPreview = document.getElementById("sentenceSelectedPreview");
const sentenceSelectCount = document.getElementById("sentenceSelectCount");
const sentenceModalOverlay = document.getElementById("sentenceModalOverlay");
const sentencePopover = document.getElementById("sentencePopover");
const sentencePopoverSummary = document.getElementById("sentencePopoverSummary");
const sentencePopoverClose = document.getElementById("sentencePopoverClose");
const clearButton = document.getElementById("clearButton");
const syntaxTree = document.getElementById("syntaxTree");
const emptyTreeState = document.getElementById("emptyTreeState");
const emptyXaiState = document.getElementById("emptyXaiState");
const xaiContent = document.getElementById("xaiContent");
const xaiExplanation = document.getElementById("xaiExplanation");
const comparisonPanel = document.getElementById("comparisonPanel");
const comparisonList = document.getElementById("comparisonList");
const viewInputButton = document.getElementById("viewInputButton");
const inputModalOverlay = document.getElementById("inputModalOverlay");
const inputModalTextarea = document.getElementById("inputModalTextarea");
const inputModalClose = document.getElementById("inputModalClose");
const inputModalDone = document.getElementById("inputModalDone");
const treeFullscreenButton = document.getElementById("treeFullscreenButton");

const COLOR = {
  black: "#111111",
  valid: "#3b93d1",
  issue: "#e21d2f",
};

const SAMPLE_MAP = {
  "driver should taken the cadillac": "problem",
  "the driver should have taken the cadillac": "correct",
  "the curious student quickly solved the difficult puzzle in class and she proudly explained it": "posRich",
  "because the lesson was confusing the teacher explained the rule again": "complex",
  "wow the curious student quickly explained the difficult lesson to her classmates because they were confused": "testAllPos",
  "although the sentence was complex the class understood the structure clearly": "testAlthoughComplex",
  "the teacher praised their effort and encouraged them to keep practicing": "testClosing",
};

const CORRECTION_MAP = {
  problem: "correct",
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

  posRich: {
    sentence: "The curious student quickly solved the difficult puzzle in class, and she proudly explained it.",
    viewBox: "0 0 1100 720",
    initialNode: "posrich-s",
    nodes: [
      { id: "posrich-s", label: "S", x: 550, y: 42, type: "node" },
      { id: "posrich-s-main", label: "S", x: 430, y: 125, type: "node" },
      { id: "posrich-conj", label: "Conj", x: 725, y: 125, type: "node" },
      { id: "posrich-and", label: "and", x: 725, y: 205, type: "word" },
      { id: "posrich-s-second", label: "S", x: 930, y: 125, type: "node" },
      { id: "posrich-np-subj", label: "NP", x: 265, y: 220, type: "node" },
      { id: "posrich-vp-main", label: "VP", x: 520, y: 220, type: "node" },
      { id: "posrich-det", label: "Det", x: 170, y: 315, type: "node" },
      { id: "posrich-adj", label: "Adj", x: 265, y: 315, type: "node" },
      { id: "posrich-n", label: "N", x: 360, y: 315, type: "node" },
      { id: "posrich-the", label: "the", x: 170, y: 410, type: "word" },
      { id: "posrich-curious", label: "curious", x: 265, y: 410, type: "word" },
      { id: "posrich-student", label: "student", x: 360, y: 410, type: "word" },
      { id: "posrich-adv", label: "Adv", x: 465, y: 315, type: "node" },
      { id: "posrich-quickly", label: "quickly", x: 465, y: 410, type: "word" },
      { id: "posrich-v-solved", label: "V", x: 575, y: 315, type: "node" },
      { id: "posrich-solved", label: "solved", x: 575, y: 410, type: "word" },
      { id: "posrich-np-obj", label: "NP", x: 720, y: 315, type: "node" },
      { id: "posrich-pp", label: "PP", x: 870, y: 315, type: "node" },
      { id: "posrich-det-obj", label: "Det", x: 635, y: 410, type: "node" },
      { id: "posrich-adj-obj", label: "Adj", x: 720, y: 410, type: "node" },
      { id: "posrich-n-obj", label: "N", x: 815, y: 410, type: "node" },
      { id: "posrich-the-obj", label: "the", x: 635, y: 505, type: "word" },
      { id: "posrich-difficult", label: "difficult", x: 720, y: 505, type: "word" },
      { id: "posrich-puzzle", label: "puzzle", x: 815, y: 505, type: "word" },
      { id: "posrich-p", label: "P", x: 900, y: 410, type: "node" },
      { id: "posrich-n-class", label: "N", x: 1000, y: 410, type: "node" },
      { id: "posrich-in", label: "in", x: 900, y: 505, type: "word" },
      { id: "posrich-class", label: "class", x: 1000, y: 505, type: "word" },
      { id: "posrich-pron", label: "Pron", x: 835, y: 245, type: "node" },
      { id: "posrich-she", label: "she", x: 835, y: 330, type: "word" },
      { id: "posrich-vp-second", label: "VP", x: 985, y: 245, type: "node" },
      { id: "posrich-adv2", label: "Adv", x: 930, y: 330, type: "node" },
      { id: "posrich-proudly", label: "proudly", x: 930, y: 420, type: "word" },
      { id: "posrich-v-explained", label: "V", x: 1030, y: 330, type: "node" },
      { id: "posrich-explained", label: "explained", x: 1030, y: 420, type: "word" },
      { id: "posrich-pron-obj", label: "Pron", x: 1030, y: 500, type: "node" },
      { id: "posrich-it", label: "it", x: 1030, y: 585, type: "word" },
    ],
    edges: [
      ["posrich-s", "posrich-s-main"],
      ["posrich-s", "posrich-conj"],
      ["posrich-conj", "posrich-and"],
      ["posrich-s", "posrich-s-second"],
      ["posrich-s-main", "posrich-np-subj"],
      ["posrich-s-main", "posrich-vp-main"],
      ["posrich-np-subj", "posrich-det"],
      ["posrich-np-subj", "posrich-adj"],
      ["posrich-np-subj", "posrich-n"],
      ["posrich-det", "posrich-the"],
      ["posrich-adj", "posrich-curious"],
      ["posrich-n", "posrich-student"],
      ["posrich-vp-main", "posrich-adv"],
      ["posrich-adv", "posrich-quickly"],
      ["posrich-vp-main", "posrich-v-solved"],
      ["posrich-v-solved", "posrich-solved"],
      ["posrich-vp-main", "posrich-np-obj"],
      ["posrich-vp-main", "posrich-pp"],
      ["posrich-np-obj", "posrich-det-obj"],
      ["posrich-np-obj", "posrich-adj-obj"],
      ["posrich-np-obj", "posrich-n-obj"],
      ["posrich-det-obj", "posrich-the-obj"],
      ["posrich-adj-obj", "posrich-difficult"],
      ["posrich-n-obj", "posrich-puzzle"],
      ["posrich-pp", "posrich-p"],
      ["posrich-pp", "posrich-n-class"],
      ["posrich-p", "posrich-in"],
      ["posrich-n-class", "posrich-class"],
      ["posrich-s-second", "posrich-pron"],
      ["posrich-pron", "posrich-she"],
      ["posrich-s-second", "posrich-vp-second"],
      ["posrich-vp-second", "posrich-adv2"],
      ["posrich-adv2", "posrich-proudly"],
      ["posrich-vp-second", "posrich-v-explained"],
      ["posrich-v-explained", "posrich-explained"],
      ["posrich-vp-second", "posrich-pron-obj"],
      ["posrich-pron-obj", "posrich-it"],
    ],
    explanations: {
      "posrich-s": "This sentence-level tree contains a coordinated clause structure and representatives of the major parts of speech: determiner, adjective, noun, adverb, verb, preposition, conjunction, and pronoun.",
      "posrich-s-main": "This first clause contains the subject 'the curious student' and the predicate 'quickly solved the difficult puzzle in class.'",
      "posrich-conj": "The Conjunction node connects two coordinated clauses of the same sentence.",
      "posrich-and": "The word 'and' functions as a coordinating conjunction, linking the first clause to the second clause.",
      "posrich-s-second": "This second clause contains the pronoun subject 'she' and the predicate 'proudly explained it.'",
      "posrich-np-subj": "This Noun Phrase functions as the subject of the first clause. It is complete because it contains a determiner, an adjective modifier, and a noun head.",
      "posrich-vp-main": "This Verb Phrase functions as the predicate of the first clause. It contains an adverb, a lexical verb, a direct object, and a prepositional phrase.",
      "posrich-det": "The Determiner introduces the subject noun phrase and helps specify the noun.",
      "posrich-adj": "The Adjective modifies the subject noun by describing what kind of student is being discussed.",
      "posrich-n": "The Noun node is the head of the subject noun phrase.",
      "posrich-the": "The word 'the' is a Determiner that specifies a particular student.",
      "posrich-curious": "The word 'curious' is an Adjective describing the noun 'student.'",
      "posrich-student": "The word 'student' is a Noun and the lexical head of the subject phrase.",
      "posrich-adv": "The Adverb modifies the verb by showing how the action was performed.",
      "posrich-quickly": "The word 'quickly' is an Adverb modifying the action 'solved.'",
      "posrich-v-solved": "The Verb node identifies the main action of the first clause.",
      "posrich-solved": "The word 'solved' is a Lexical Verb expressing the action performed by the subject.",
      "posrich-np-obj": "This Noun Phrase functions as the direct object of the verb 'solved.'",
      "posrich-pp": "This Prepositional Phrase adds contextual information about where the action occurred.",
      "posrich-det-obj": "The Determiner introduces the object noun phrase.",
      "posrich-adj-obj": "The Adjective modifies the object noun by describing the puzzle.",
      "posrich-n-obj": "The Noun node is the head of the object noun phrase.",
      "posrich-the-obj": "The word 'the' is a Determiner specifying a particular puzzle.",
      "posrich-difficult": "The word 'difficult' is an Adjective describing the noun 'puzzle.'",
      "posrich-puzzle": "The word 'puzzle' is a Noun functioning as the direct object.",
      "posrich-p": "The Preposition introduces the phrase 'in class.'",
      "posrich-n-class": "The Noun node identifies the object of the preposition.",
      "posrich-in": "The word 'in' is a Preposition connecting the action to a location or setting.",
      "posrich-class": "The word 'class' is a Noun functioning as the object of the preposition.",
      "posrich-pron": "The Pronoun node functions as the subject of the second clause.",
      "posrich-she": "The word 'she' is a Pronoun referring back to the student.",
      "posrich-vp-second": "This Verb Phrase is the predicate of the second clause and contains an adverb, a verb, and a pronoun object.",
      "posrich-adv2": "The Adverb modifies the verb in the second clause.",
      "posrich-proudly": "The word 'proudly' is an Adverb describing how the explanation was given.",
      "posrich-v-explained": "The Verb node identifies the action in the second clause.",
      "posrich-explained": "The word 'explained' is a Lexical Verb expressing the second action.",
      "posrich-pron-obj": "The Pronoun node functions as the object of the verb 'explained.'",
      "posrich-it": "The word 'it' is a Pronoun referring to the solved puzzle or its solution.",
    },
  },

  complex: {
    sentence: "Because the lesson was confusing, the teacher explained the rule again.",
    viewBox: "0 0 940 660",
    initialNode: "complex-s",
    nodes: [
      { id: "complex-s", label: "S", x: 470, y: 42, type: "node" },
      { id: "complex-sbar", label: "SBAR", x: 250, y: 125, type: "node" },
      { id: "complex-main", label: "S", x: 650, y: 125, type: "node" },
      { id: "complex-subord", label: "Sub", x: 105, y: 215, type: "node" },
      { id: "complex-because", label: "Because", x: 105, y: 300, type: "word" },
      { id: "complex-sub-s", label: "S", x: 320, y: 215, type: "node" },
      { id: "complex-sub-np", label: "NP", x: 235, y: 300, type: "node" },
      { id: "complex-sub-vp", label: "VP", x: 405, y: 300, type: "node" },
      { id: "complex-sub-det", label: "Det", x: 180, y: 390, type: "node" },
      { id: "complex-sub-n", label: "N", x: 285, y: 390, type: "node" },
      { id: "complex-the-lesson", label: "the", x: 180, y: 480, type: "word" },
      { id: "complex-lesson", label: "lesson", x: 285, y: 480, type: "word" },
      { id: "complex-was", label: "was", x: 390, y: 390, type: "word" },
      { id: "complex-adjp", label: "ADJP", x: 495, y: 390, type: "node" },
      { id: "complex-confusing", label: "confusing", x: 495, y: 480, type: "word" },
      { id: "complex-main-np", label: "NP", x: 555, y: 215, type: "node" },
      { id: "complex-main-vp", label: "VP", x: 760, y: 215, type: "node" },
      { id: "complex-main-det", label: "Det", x: 500, y: 305, type: "node" },
      { id: "complex-main-n", label: "N", x: 610, y: 305, type: "node" },
      { id: "complex-the-teacher", label: "the", x: 500, y: 395, type: "word" },
      { id: "complex-teacher", label: "teacher", x: 610, y: 395, type: "word" },
      { id: "complex-v-explained", label: "V", x: 715, y: 305, type: "node" },
      { id: "complex-explained", label: "explained", x: 715, y: 395, type: "word" },
      { id: "complex-obj-np", label: "NP", x: 835, y: 305, type: "node" },
      { id: "complex-adv", label: "Adv", x: 885, y: 305, type: "node" },
      { id: "complex-obj-det", label: "Det", x: 785, y: 395, type: "node" },
      { id: "complex-obj-n", label: "N", x: 875, y: 395, type: "node" },
      { id: "complex-the-rule", label: "the", x: 785, y: 485, type: "word" },
      { id: "complex-rule", label: "rule", x: 875, y: 485, type: "word" },
      { id: "complex-again", label: "again", x: 885, y: 485, type: "word" },
    ],
    edges: [
      ["complex-s", "complex-sbar"],
      ["complex-s", "complex-main"],
      ["complex-sbar", "complex-subord"],
      ["complex-subord", "complex-because"],
      ["complex-sbar", "complex-sub-s"],
      ["complex-sub-s", "complex-sub-np"],
      ["complex-sub-s", "complex-sub-vp"],
      ["complex-sub-np", "complex-sub-det"],
      ["complex-sub-np", "complex-sub-n"],
      ["complex-sub-det", "complex-the-lesson"],
      ["complex-sub-n", "complex-lesson"],
      ["complex-sub-vp", "complex-was"],
      ["complex-sub-vp", "complex-adjp"],
      ["complex-adjp", "complex-confusing"],
      ["complex-main", "complex-main-np"],
      ["complex-main", "complex-main-vp"],
      ["complex-main-np", "complex-main-det"],
      ["complex-main-np", "complex-main-n"],
      ["complex-main-det", "complex-the-teacher"],
      ["complex-main-n", "complex-teacher"],
      ["complex-main-vp", "complex-v-explained"],
      ["complex-v-explained", "complex-explained"],
      ["complex-main-vp", "complex-obj-np"],
      ["complex-main-vp", "complex-adv"],
      ["complex-obj-np", "complex-obj-det"],
      ["complex-obj-np", "complex-obj-n"],
      ["complex-obj-det", "complex-the-rule"],
      ["complex-obj-n", "complex-rule"],
      ["complex-adv", "complex-again"],
    ],
    explanations: {
      "complex-s": "This sentence is complex because it contains a subordinate clause introduced by 'Because' and an independent main clause.",
      "complex-sbar": "The SBAR node marks the dependent clause. It provides the reason or condition for the main clause but cannot stand alone as a complete sentence in this structure.",
      "complex-main": "This main clause can stand independently: 'the teacher explained the rule again.'",
      "complex-subord": "The Subordinator introduces the dependent clause and shows the relationship between the two clauses.",
      "complex-because": "The word 'Because' is a subordinating conjunction that links the reason clause to the main clause.",
      "complex-sub-s": "This embedded sentence forms the internal structure of the dependent clause.",
      "complex-sub-np": "This Noun Phrase functions as the subject of the dependent clause.",
      "complex-sub-vp": "This Verb Phrase functions as the predicate of the dependent clause.",
      "complex-sub-det": "The Determiner specifies the noun 'lesson.'",
      "complex-sub-n": "The Noun node is the head of the dependent-clause subject.",
      "complex-the-lesson": "The word 'the' is a Determiner identifying a specific lesson.",
      "complex-lesson": "The word 'lesson' is a Noun functioning as the subject head of the dependent clause.",
      "complex-was": "The word 'was' is a linking verb connecting the subject to its adjective complement.",
      "complex-adjp": "The Adjective Phrase describes the state of the lesson.",
      "complex-confusing": "The word 'confusing' is an Adjective complement describing the lesson.",
      "complex-main-np": "This Noun Phrase functions as the subject of the independent main clause.",
      "complex-main-vp": "This Verb Phrase forms the predicate of the main clause.",
      "complex-main-det": "The Determiner specifies the noun 'teacher.'",
      "complex-main-n": "The Noun node is the head of the main-clause subject.",
      "complex-the-teacher": "The word 'the' is a Determiner identifying a specific teacher.",
      "complex-teacher": "The word 'teacher' is a Noun serving as the subject head of the main clause.",
      "complex-v-explained": "The Verb node identifies the action performed by the main-clause subject.",
      "complex-explained": "The word 'explained' is a Lexical Verb expressing the action in the main clause.",
      "complex-obj-np": "This Noun Phrase functions as the direct object of the verb 'explained.'",
      "complex-adv": "The Adverb modifies the verb by indicating repetition or timing.",
      "complex-obj-det": "The Determiner specifies the noun 'rule.'",
      "complex-obj-n": "The Noun node is the head of the direct-object phrase.",
      "complex-the-rule": "The word 'the' is a Determiner identifying a specific rule.",
      "complex-rule": "The word 'rule' is a Noun functioning as the direct object.",
      "complex-again": "The word 'again' is an Adverb modifying the verb 'explained.'",
    },
  },

  testAllPos: {
    sentence: "Wow, the curious student quickly explained the difficult lesson to her classmates because they were confused.",
    viewBox: "0 0 1420 760",
    initialNode: "testall-s",
    nodes: [
      { id: "testall-s", label: "S", x: 710, y: 42, type: "node" },
      { id: "testall-intj", label: "INTJ", x: 90, y: 120, type: "node" },
      { id: "testall-wow", label: "Wow", x: 90, y: 205, type: "word" },
      { id: "testall-main-s", label: "S", x: 760, y: 120, type: "node" },
      { id: "testall-np-subj", label: "NP", x: 265, y: 210, type: "node" },
      { id: "testall-vp-main", label: "VP", x: 890, y: 210, type: "node" },
      { id: "testall-det", label: "Det", x: 130, y: 310, type: "node" },
      { id: "testall-adj", label: "Adj", x: 265, y: 310, type: "node" },
      { id: "testall-n", label: "N", x: 400, y: 310, type: "node" },
      { id: "testall-the", label: "the", x: 130, y: 410, type: "word" },
      { id: "testall-curious", label: "curious", x: 265, y: 410, type: "word" },
      { id: "testall-student", label: "student", x: 400, y: 410, type: "word" },
      { id: "testall-adv", label: "Adv", x: 545, y: 310, type: "node" },
      { id: "testall-v", label: "V", x: 680, y: 310, type: "node" },
      { id: "testall-np-obj", label: "NP", x: 865, y: 310, type: "node" },
      { id: "testall-pp", label: "PP", x: 1110, y: 310, type: "node" },
      { id: "testall-sbar", label: "SBAR", x: 1290, y: 310, type: "node" },
      { id: "testall-quickly", label: "quickly", x: 545, y: 410, type: "word" },
      { id: "testall-explained", label: "explained", x: 680, y: 410, type: "word" },
      { id: "testall-obj-det", label: "Det", x: 745, y: 410, type: "node" },
      { id: "testall-obj-adj", label: "Adj", x: 880, y: 410, type: "node" },
      { id: "testall-obj-n", label: "N", x: 1015, y: 410, type: "node" },
      { id: "testall-obj-the", label: "the", x: 745, y: 520, type: "word" },
      { id: "testall-difficult", label: "difficult", x: 880, y: 520, type: "word" },
      { id: "testall-lesson", label: "lesson", x: 1015, y: 520, type: "word" },
      { id: "testall-p", label: "P", x: 1090, y: 410, type: "node" },
      { id: "testall-pp-np", label: "NP", x: 1225, y: 410, type: "node" },
      { id: "testall-to", label: "to", x: 1090, y: 520, type: "word" },
      { id: "testall-poss", label: "Poss", x: 1175, y: 520, type: "node" },
      { id: "testall-classmates-n", label: "N", x: 1320, y: 520, type: "node" },
      { id: "testall-her", label: "her", x: 1175, y: 625, type: "word" },
      { id: "testall-classmates", label: "classmates", x: 1320, y: 625, type: "word" },
      { id: "testall-sub", label: "Sub", x: 1310, y: 410, type: "node" },
      { id: "testall-sub-s", label: "S", x: 1460, y: 410, type: "node" },
      { id: "testall-because", label: "because", x: 1310, y: 520, type: "word" },
      { id: "testall-sub-np", label: "NP", x: 1405, y: 520, type: "node" },
      { id: "testall-sub-vp", label: "VP", x: 1535, y: 520, type: "node" },
      { id: "testall-they", label: "they", x: 1405, y: 625, type: "word" },
      { id: "testall-were", label: "were", x: 1500, y: 625, type: "word" },
      { id: "testall-adjp", label: "ADJP", x: 1625, y: 625, type: "node" },
      { id: "testall-confused", label: "confused", x: 1625, y: 725, type: "word" },
    ],
    edges: [
      ["testall-s", "testall-intj"],
      ["testall-intj", "testall-wow"],
      ["testall-s", "testall-main-s"],
      ["testall-main-s", "testall-np-subj"],
      ["testall-main-s", "testall-vp-main"],
      ["testall-np-subj", "testall-det"],
      ["testall-np-subj", "testall-adj"],
      ["testall-np-subj", "testall-n"],
      ["testall-det", "testall-the"],
      ["testall-adj", "testall-curious"],
      ["testall-n", "testall-student"],
      ["testall-vp-main", "testall-adv"],
      ["testall-adv", "testall-quickly"],
      ["testall-vp-main", "testall-v"],
      ["testall-v", "testall-explained"],
      ["testall-vp-main", "testall-np-obj"],
      ["testall-np-obj", "testall-obj-det"],
      ["testall-np-obj", "testall-obj-adj"],
      ["testall-np-obj", "testall-obj-n"],
      ["testall-obj-det", "testall-obj-the"],
      ["testall-obj-adj", "testall-difficult"],
      ["testall-obj-n", "testall-lesson"],
      ["testall-vp-main", "testall-pp"],
      ["testall-pp", "testall-p"],
      ["testall-p", "testall-to"],
      ["testall-pp", "testall-pp-np"],
      ["testall-pp-np", "testall-poss"],
      ["testall-poss", "testall-her"],
      ["testall-pp-np", "testall-classmates-n"],
      ["testall-classmates-n", "testall-classmates"],
      ["testall-vp-main", "testall-sbar"],
      ["testall-sbar", "testall-sub"],
      ["testall-sub", "testall-because"],
      ["testall-sbar", "testall-sub-s"],
      ["testall-sub-s", "testall-sub-np"],
      ["testall-sub-np", "testall-they"],
      ["testall-sub-s", "testall-sub-vp"],
      ["testall-sub-vp", "testall-were"],
      ["testall-sub-vp", "testall-adjp"],
      ["testall-adjp", "testall-confused"],
    ],
    explanations: {
      "testall-s": "This sentence-level tree contains an interjection plus a main clause with a reason clause, showing major parts of speech in one structure.",
      "testall-intj": "The Interjection Phrase contains 'Wow,' which adds emotion without changing the core clause structure.",
      "testall-main-s": "This main clause has a subject Noun Phrase and a predicate Verb Phrase.",
      "testall-np-subj": "This Noun Phrase functions as the subject: 'the curious student.'",
      "testall-vp-main": "This Verb Phrase contains the action, object, prepositional phrase, and subordinate reason clause.",
      "testall-sbar": "The SBAR node introduces the subordinate clause beginning with 'because.'",
      "testall-sub-s": "This embedded sentence explains why the classmates needed the explanation.",
      "testall-wow": "'Wow' is an interjection expressing reaction or emphasis.",
      "testall-quickly": "'quickly' is an adverb modifying the verb 'explained.'",
      "testall-explained": "'explained' is the main lexical verb of the sentence.",
      "testall-to": "'to' is a preposition introducing the indirect recipient phrase.",
      "testall-because": "'because' is a subordinating conjunction introducing the reason clause.",
      "testall-confused": "'confused' is an adjective complement describing the pronoun 'they.'",
    },
  },

  testAlthoughComplex: {
    sentence: "Although the sentence was complex, the class understood the structure clearly.",
    viewBox: "0 0 1160 720",
    initialNode: "testcomplex-s",
    nodes: [
      { id: "testcomplex-s", label: "S", x: 580, y: 42, type: "node" },
      { id: "testcomplex-sbar", label: "SBAR", x: 300, y: 130, type: "node" },
      { id: "testcomplex-main", label: "S", x: 780, y: 130, type: "node" },
      { id: "testcomplex-sub", label: "Sub", x: 105, y: 225, type: "node" },
      { id: "testcomplex-although", label: "Although", x: 105, y: 325, type: "word" },
      { id: "testcomplex-sub-s", label: "S", x: 360, y: 225, type: "node" },
      { id: "testcomplex-sub-np", label: "NP", x: 260, y: 325, type: "node" },
      { id: "testcomplex-sub-vp", label: "VP", x: 500, y: 325, type: "node" },
      { id: "testcomplex-sub-det", label: "Det", x: 195, y: 430, type: "node" },
      { id: "testcomplex-sub-n", label: "N", x: 330, y: 430, type: "node" },
      { id: "testcomplex-the-sentence", label: "the", x: 195, y: 540, type: "word" },
      { id: "testcomplex-sentence", label: "sentence", x: 330, y: 540, type: "word" },
      { id: "testcomplex-was", label: "was", x: 455, y: 430, type: "word" },
      { id: "testcomplex-adjp", label: "ADJP", x: 590, y: 430, type: "node" },
      { id: "testcomplex-complex", label: "complex", x: 590, y: 540, type: "word" },
      { id: "testcomplex-main-np", label: "NP", x: 715, y: 235, type: "node" },
      { id: "testcomplex-main-vp", label: "VP", x: 955, y: 235, type: "node" },
      { id: "testcomplex-main-det", label: "Det", x: 650, y: 340, type: "node" },
      { id: "testcomplex-main-n", label: "N", x: 780, y: 340, type: "node" },
      { id: "testcomplex-the-class", label: "the", x: 650, y: 450, type: "word" },
      { id: "testcomplex-class", label: "class", x: 780, y: 450, type: "word" },
      { id: "testcomplex-v", label: "V", x: 900, y: 340, type: "node" },
      { id: "testcomplex-understood", label: "understood", x: 900, y: 450, type: "word" },
      { id: "testcomplex-obj-np", label: "NP", x: 1080, y: 340, type: "node" },
      { id: "testcomplex-adv", label: "Adv", x: 1245, y: 340, type: "node" },
      { id: "testcomplex-obj-det", label: "Det", x: 1010, y: 450, type: "node" },
      { id: "testcomplex-obj-n", label: "N", x: 1150, y: 450, type: "node" },
      { id: "testcomplex-the-structure", label: "the", x: 1010, y: 560, type: "word" },
      { id: "testcomplex-structure", label: "structure", x: 1150, y: 560, type: "word" },
      { id: "testcomplex-clearly", label: "clearly", x: 1245, y: 560, type: "word" },
    ],
    edges: [
      ["testcomplex-s", "testcomplex-sbar"],
      ["testcomplex-s", "testcomplex-main"],
      ["testcomplex-sbar", "testcomplex-sub"],
      ["testcomplex-sub", "testcomplex-although"],
      ["testcomplex-sbar", "testcomplex-sub-s"],
      ["testcomplex-sub-s", "testcomplex-sub-np"],
      ["testcomplex-sub-s", "testcomplex-sub-vp"],
      ["testcomplex-sub-np", "testcomplex-sub-det"],
      ["testcomplex-sub-det", "testcomplex-the-sentence"],
      ["testcomplex-sub-np", "testcomplex-sub-n"],
      ["testcomplex-sub-n", "testcomplex-sentence"],
      ["testcomplex-sub-vp", "testcomplex-was"],
      ["testcomplex-sub-vp", "testcomplex-adjp"],
      ["testcomplex-adjp", "testcomplex-complex"],
      ["testcomplex-main", "testcomplex-main-np"],
      ["testcomplex-main", "testcomplex-main-vp"],
      ["testcomplex-main-np", "testcomplex-main-det"],
      ["testcomplex-main-det", "testcomplex-the-class"],
      ["testcomplex-main-np", "testcomplex-main-n"],
      ["testcomplex-main-n", "testcomplex-class"],
      ["testcomplex-main-vp", "testcomplex-v"],
      ["testcomplex-v", "testcomplex-understood"],
      ["testcomplex-main-vp", "testcomplex-obj-np"],
      ["testcomplex-obj-np", "testcomplex-obj-det"],
      ["testcomplex-obj-det", "testcomplex-the-structure"],
      ["testcomplex-obj-np", "testcomplex-obj-n"],
      ["testcomplex-obj-n", "testcomplex-structure"],
      ["testcomplex-main-vp", "testcomplex-adv"],
      ["testcomplex-adv", "testcomplex-clearly"],
    ],
    explanations: {
      "testcomplex-s": "This sentence is complex because it combines an Although-clause with an independent main clause.",
      "testcomplex-sbar": "The SBAR node marks the subordinate clause that sets up a contrast.",
      "testcomplex-main": "The main clause can stand on its own: 'the class understood the structure clearly.'",
      "testcomplex-although": "'Although' is a subordinating conjunction introducing the dependent clause.",
      "testcomplex-main-vp": "This Verb Phrase contains the verb 'understood,' its direct object, and an adverb.",
      "testcomplex-clearly": "'clearly' is an adverb modifying how the class understood the structure.",
    },
  },

  testClosing: {
    sentence: "The teacher praised their effort and encouraged them to keep practicing.",
    viewBox: "0 0 1160 700",
    initialNode: "testclosing-s",
    nodes: [
      { id: "testclosing-s", label: "S", x: 580, y: 42, type: "node" },
      { id: "testclosing-np", label: "NP", x: 220, y: 130, type: "node" },
      { id: "testclosing-vp", label: "VP", x: 760, y: 130, type: "node" },
      { id: "testclosing-det", label: "Det", x: 155, y: 230, type: "node" },
      { id: "testclosing-n", label: "N", x: 285, y: 230, type: "node" },
      { id: "testclosing-the", label: "the", x: 155, y: 335, type: "word" },
      { id: "testclosing-teacher", label: "teacher", x: 285, y: 335, type: "word" },
      { id: "testclosing-vp1", label: "VP", x: 530, y: 230, type: "node" },
      { id: "testclosing-conj", label: "Conj", x: 760, y: 230, type: "node" },
      { id: "testclosing-vp2", label: "VP", x: 1000, y: 230, type: "node" },
      { id: "testclosing-v-praised", label: "V", x: 455, y: 335, type: "node" },
      { id: "testclosing-praised", label: "praised", x: 455, y: 445, type: "word" },
      { id: "testclosing-obj1", label: "NP", x: 615, y: 335, type: "node" },
      { id: "testclosing-poss", label: "Poss", x: 550, y: 445, type: "node" },
      { id: "testclosing-effort-n", label: "N", x: 690, y: 445, type: "node" },
      { id: "testclosing-their", label: "their", x: 550, y: 555, type: "word" },
      { id: "testclosing-effort", label: "effort", x: 690, y: 555, type: "word" },
      { id: "testclosing-and", label: "and", x: 760, y: 335, type: "word" },
      { id: "testclosing-v-encouraged", label: "V", x: 890, y: 335, type: "node" },
      { id: "testclosing-encouraged", label: "encouraged", x: 890, y: 445, type: "word" },
      { id: "testclosing-np-them", label: "NP", x: 1030, y: 335, type: "node" },
      { id: "testclosing-them", label: "them", x: 1030, y: 445, type: "word" },
      { id: "testclosing-vp-inf", label: "VP", x: 1190, y: 335, type: "node" },
      { id: "testclosing-to", label: "to", x: 1125, y: 445, type: "word" },
      { id: "testclosing-keep", label: "keep", x: 1220, y: 445, type: "word" },
      { id: "testclosing-gerund", label: "V", x: 1345, y: 445, type: "node" },
      { id: "testclosing-practicing", label: "practicing", x: 1345, y: 555, type: "word" },
    ],
    edges: [
      ["testclosing-s", "testclosing-np"],
      ["testclosing-s", "testclosing-vp"],
      ["testclosing-np", "testclosing-det"],
      ["testclosing-det", "testclosing-the"],
      ["testclosing-np", "testclosing-n"],
      ["testclosing-n", "testclosing-teacher"],
      ["testclosing-vp", "testclosing-vp1"],
      ["testclosing-vp", "testclosing-conj"],
      ["testclosing-vp", "testclosing-vp2"],
      ["testclosing-vp1", "testclosing-v-praised"],
      ["testclosing-v-praised", "testclosing-praised"],
      ["testclosing-vp1", "testclosing-obj1"],
      ["testclosing-obj1", "testclosing-poss"],
      ["testclosing-poss", "testclosing-their"],
      ["testclosing-obj1", "testclosing-effort-n"],
      ["testclosing-effort-n", "testclosing-effort"],
      ["testclosing-conj", "testclosing-and"],
      ["testclosing-vp2", "testclosing-v-encouraged"],
      ["testclosing-v-encouraged", "testclosing-encouraged"],
      ["testclosing-vp2", "testclosing-np-them"],
      ["testclosing-np-them", "testclosing-them"],
      ["testclosing-vp2", "testclosing-vp-inf"],
      ["testclosing-vp-inf", "testclosing-to"],
      ["testclosing-vp-inf", "testclosing-keep"],
      ["testclosing-vp-inf", "testclosing-gerund"],
      ["testclosing-gerund", "testclosing-practicing"],
    ],
    explanations: {
      "testclosing-s": "This sentence continues the paragraph with a subject and a coordinated Verb Phrase.",
      "testclosing-vp": "The predicate contains two coordinated actions: praising and encouraging.",
      "testclosing-vp1": "The first Verb Phrase describes the teacher praising the students' effort.",
      "testclosing-vp2": "The second Verb Phrase describes the teacher encouraging the students to continue practicing.",
      "testclosing-vp-inf": "This infinitival Verb Phrase completes the meaning of 'encouraged them.'",
      "testclosing-and": "'and' is a coordinating conjunction linking the two predicate actions.",
    },
  },
};

function n(label, key, children = [], options = {}) {
  return { label, key, children, type: "node", ...options };
}

function w(label, key, options = {}) {
  return { label, key, children: [], type: "word", ...options };
}

function createMockDataset(prefix, sentence, root, initialKey, explanationOverrides = {}) {
  const nodes = [];
  const edges = [];
  const explanations = {};

  function visit(item) {
    const id = `${prefix}-${item.key}`;
    const node = {
      id,
      label: item.label,
      x: 0,
      y: 0,
      type: item.type || "node",
    };

    if (item.status) {
      node.status = item.status;
    }

    nodes.push(node);

    if (item.explanation) {
      explanations[id] = item.explanation;
    }

    (item.children || []).forEach((child) => {
      const childId = visit(child);
      edges.push([id, childId]);
    });

    return id;
  }

  visit(root);

  Object.entries(explanationOverrides).forEach(([key, value]) => {
    const id = key.startsWith(`${prefix}-`) ? key : `${prefix}-${key}`;
    explanations[id] = value;
  });

  return {
    sentence,
    viewBox: "0 0 900 620",
    initialNode: `${prefix}-${initialKey}`,
    nodes,
    edges,
    explanations,
  };
}

Object.assign(SAMPLE_MAP, {
  "the student carefully reviewed the lesson because the topic was difficult": "reviewBecause",
  "she explain the answer clearly to her classmates": "sheExplainProblem",
  "she explains the answer clearly to her classmates": "sheExplainsCorrect",
  "after the discussion the teacher corrected the sentence and showed the proper structure": "teacherCorrectedStructure",
});

Object.assign(CORRECTION_MAP, {
  sheExplainProblem: "sheExplainsCorrect",
});

Object.assign(DATASETS, {
  reviewBecause: createMockDataset(
    "reviewbecause",
    "The student carefully reviewed the lesson because the topic was difficult.",
    n("S", "s", [
      n("NP", "np-subj", [
        n("Det", "det-subj", [w("The", "the-subj")]),
        n("N", "n-subj", [w("student", "student")]),
      ]),
      n("VP", "vp-main", [
        n("Adv", "adv-carefully", [w("carefully", "carefully")]),
        n("V", "v-reviewed", [w("reviewed", "reviewed")]),
        n("NP", "np-obj", [
          n("Det", "det-obj", [w("the", "the-obj")]),
          n("N", "n-obj", [w("lesson", "lesson")]),
        ]),
        n("SBAR", "sbar-because", [
          n("Sub", "sub-because", [w("because", "because")]),
          n("S", "sub-s", [
            n("NP", "sub-np", [
              n("Det", "sub-det", [w("the", "topic-the")]),
              n("N", "sub-n", [w("topic", "topic")]),
            ]),
            n("VP", "sub-vp", [
              n("V", "sub-v-was", [w("was", "was")]),
              n("ADJP", "sub-adjp", [w("difficult", "difficult")]),
            ]),
          ]),
        ]),
      ]),
    ]),
    "s",
    {
      "s": "This sentence combines a main clause with a reason clause introduced by 'because'.",
      "vp-main": "The main Verb Phrase contains the action 'reviewed', its direct object, and a subordinate reason clause.",
      "sbar-because": "The SBAR introduces a dependent clause that explains why the student reviewed the lesson carefully.",
      "adv-carefully": "The adverb 'carefully' modifies the verb 'reviewed' by showing how the action was done.",
    }
  ),

  sheExplainProblem: createMockDataset(
    "sheexplain",
    "She explain the answer clearly to her classmates.",
    n("S", "s", [
      n("NP", "np-subj", [
        n("Pron", "pron-she", [w("She", "she")]),
      ]),
      n("VP*", "vp-main", [
        n("V*", "v-explain", [w("explain*", "explain", { status: "issue" })], { status: "issue" }),
        n("NP", "np-obj", [
          n("Det", "det-answer", [w("the", "the-answer")]),
          n("N", "n-answer", [w("answer", "answer")]),
        ]),
        n("Adv", "adv-clearly", [w("clearly", "clearly")]),
        n("PP", "pp-to", [
          n("P", "p-to", [w("to", "to")]),
          n("NP", "np-classmates", [
            n("Poss", "poss-her", [w("her", "her")]),
            n("N", "n-classmates", [w("classmates", "classmates")]),
          ]),
        ]),
      ], { status: "issue" }),
    ]),
    "explain",
    {
      "s": "The sentence has a subject and predicate, but the predicate contains a subject-verb agreement error.",
      "np-subj": "The subject is the singular third-person pronoun 'She'. This subject requires a present-tense verb with -s.",
      "vp-main": "This Verb Phrase is marked because its head verb does not agree with the singular subject.",
      "v-explain": "The verb form 'explain' is incorrect after the third-person singular subject 'She'.",
      "explain": "The word should be 'explains' because the subject is third-person singular in the simple present tense.",
    }
  ),

  sheExplainsCorrect: createMockDataset(
    "sheexplains",
    "She explains the answer clearly to her classmates.",
    n("S", "s", [
      n("NP", "np-subj", [
        n("Pron", "pron-she", [w("She", "she")]),
      ]),
      n("VP", "vp-main", [
        n("V", "v-explains", [w("explains", "explains")]),
        n("NP", "np-obj", [
          n("Det", "det-answer", [w("the", "the-answer")]),
          n("N", "n-answer", [w("answer", "answer")]),
        ]),
        n("Adv", "adv-clearly", [w("clearly", "clearly")]),
        n("PP", "pp-to", [
          n("P", "p-to", [w("to", "to")]),
          n("NP", "np-classmates", [
            n("Poss", "poss-her", [w("her", "her")]),
            n("N", "n-classmates", [w("classmates", "classmates")]),
          ]),
        ]),
      ]),
    ]),
    "s",
    {
      "s": "This sentence is grammatical because the subject 'She' agrees with the verb 'explains'.",
      "vp-main": "The Verb Phrase contains the correctly inflected verb, a direct object, an adverb, and a prepositional phrase.",
      "v-explains": "The verb 'explains' correctly carries the third-person singular -s ending.",
      "pp-to": "The prepositional phrase 'to her classmates' identifies the audience or recipient of the explanation.",
    }
  ),

  teacherCorrectedStructure: createMockDataset(
    "teachercorrected",
    "After the discussion, the teacher corrected the sentence and showed the proper structure.",
    n("S", "s", [
      n("PP", "pp-after", [
        n("P", "p-after", [w("After", "after")]),
        n("NP", "np-discussion", [
          n("Det", "det-discussion", [w("the", "the-discussion")]),
          n("N", "n-discussion", [w("discussion", "discussion")]),
        ]),
      ]),
      n("S", "main-s", [
        n("NP", "np-subj", [
          n("Det", "det-teacher", [w("the", "the-teacher")]),
          n("N", "n-teacher", [w("teacher", "teacher")]),
        ]),
        n("VP", "vp-main", [
          n("VP", "vp-corrected", [
            n("V", "v-corrected", [w("corrected", "corrected")]),
            n("NP", "np-sentence", [
              n("Det", "det-sentence", [w("the", "the-sentence")]),
              n("N", "n-sentence", [w("sentence", "sentence")]),
            ]),
          ]),
          n("Conj", "conj-and", [w("and", "and")]),
          n("VP", "vp-showed", [
            n("V", "v-showed", [w("showed", "showed")]),
            n("NP", "np-structure", [
              n("Det", "det-structure", [w("the", "the-structure")]),
              n("Adj", "adj-proper", [w("proper", "proper")]),
              n("N", "n-structure", [w("structure", "structure")]),
            ]),
          ]),
        ]),
      ]),
    ]),
    "s",
    {
      "s": "This sentence begins with a prepositional phrase and then presents a main clause with a coordinated predicate.",
      "pp-after": "The opening prepositional phrase sets the time/context for the teacher's actions.",
      "vp-main": "The main Verb Phrase coordinates two actions: corrected and showed.",
      "conj-and": "The conjunction 'and' links two compatible Verb Phrases.",
      "np-structure": "This object Noun Phrase contains a determiner, adjective, and noun head.",
    }
  ),
});

let currentDatasetKey = null;
let currentSelectedNode = null;
let currentParagraphSentences = [];
let currentSelectedSentenceIndex = null;
let inputAnalyzeTimer = null;
let treeZoom = 1;
let treePanX = 0;
let treePanY = 0;
let isTreePointerDown = false;
let isTreePanning = false;
let hasTreePanMoved = false;
let ignoreNextTreeClick = false;
let activeTreePointerId = null;
let treePanStart = { clientX: 0, clientY: 0, panX: 0, panY: 0 };

const loginButton = document.getElementById("loginButton");
const themeToggle = document.getElementById("themeToggle");
const menuThemeToggle = document.getElementById("menuThemeToggle");
const menuButton = document.getElementById("menuButton");
const appMenu = document.getElementById("appMenu");
const menuLoginButton = document.getElementById("menuLoginButton");
const chatTitle = document.getElementById("chatTitle");

function setChatTitle(value) {
  if (chatTitle) {
    chatTitle.textContent = value;
  }
}
const emptyTreeTitle = document.getElementById("emptyTreeTitle");
const emptyTreeCopy = document.getElementById("emptyTreeCopy");
const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");
const zoomResetButton = document.getElementById("zoomResetButton");
const treeViewport = syntaxTree?.closest(".tree-card");

const ZOOM_MIN = 0.75;
const ZOOM_MAX = 1.6;
const ZOOM_STEP = 0.15;
const WHEEL_ZOOM_SENSITIVITY = 0.0014;
const PAN_DRAG_THRESHOLD = 4;
const INPUT_ANALYZE_DELAY = 180;
const INPUT_VIEW_THRESHOLD = 120;
const MODAL_TRANSITION_MS = 190;
const TREE_TRANSITION_MS = 170;
let sentenceModalCloseTimer = null;
let inputModalCloseTimer = null;
let xaiUpdateTimer = null;
const DEFAULT_CHAT_TITLE = "Untitled chat...";
const DEFAULT_EMPTY_TITLE = "No Syntax tree to generate yet!";
const DEFAULT_EMPTY_COPY = "Add your text to see the syntax tree here";
const UNSUPPORTED_EMPTY_TITLE = "No matching mock tree found";
const UNSUPPORTED_EMPTY_COPY = "This prototype keeps the mock-data approach, so only internally mapped sentences can display trees.";
const PARAGRAPH_EMPTY_TITLE = "Select a sentence to generate a tree";
const PARAGRAPH_EMPTY_COPY = "Open Select sentence to choose one detected sentence.";
const SELECTED_UNSUPPORTED_EMPTY_COPY = "This sentence was separated correctly, but no mock syntax tree is available for it yet.";
const PENDING_EMPTY_TITLE = "Processing text";
const PENDING_EMPTY_COPY = "SynTutor is separating the input into sentence-level units.";

[launchButton, loginButton].forEach((button) => {
  button?.addEventListener("click", showAppScreen);
});

themeToggle?.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("is-dark"));
});

menuThemeToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  setTheme(!document.body.classList.contains("is-dark"));
});

menuButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMenu();
});

appMenu?.addEventListener("click", (event) => {
  event.stopPropagation();
});

menuLoginButton?.addEventListener("click", () => {
  appScreen.classList.add("is-hidden");
  landingScreen.classList.remove("is-hidden");
  closeMenu();
  launchButton.focus();
});

sentenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  processCurrentInput();
});

sentenceInput.addEventListener("input", handleInputEditing);

sentenceInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    processCurrentInput();
    return;
  }

  if (event.key === "Escape" && sentenceInput.value) {
    resetAnalysis();
  }
});

clearButton.addEventListener("click", () => {
  resetAnalysis();
  sentenceInput.focus();
});

viewInputButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  openInputModal();
});

inputModalOverlay?.addEventListener("click", (event) => {
  if (event.target === inputModalOverlay) {
    closeInputModal({ commit: true });
    sentenceInput.focus();
  }
});

inputModalClose?.addEventListener("click", () => {
  closeInputModal({ commit: true });
  sentenceInput.focus();
});

inputModalDone?.addEventListener("click", () => {
  closeInputModal({ commit: true });
  sentenceInput.focus();
});

sentenceSelector?.addEventListener("click", (event) => {
  event.stopPropagation();
});

sentenceSelectButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  openSentenceModal();
});

sentenceModalOverlay?.addEventListener("click", (event) => {
  if (event.target === sentenceModalOverlay) {
    closeSentenceModal();
    sentenceSelectButton?.focus();
  }
});

sentencePopover?.addEventListener("click", (event) => {
  event.stopPropagation();
});

sentencePopoverClose?.addEventListener("click", (event) => {
  event.stopPropagation();
  closeSentenceModal();
  sentenceSelectButton?.focus();
});

zoomInButton?.addEventListener("click", () => changeTreeZoom(ZOOM_STEP));
zoomOutButton?.addEventListener("click", () => changeTreeZoom(-ZOOM_STEP));
zoomResetButton?.addEventListener("click", resetTreeView);
treeFullscreenButton?.addEventListener("click", () => toggleTreeFullscreen());
treeViewport?.addEventListener("wheel", handleTreeWheel, { passive: false });

syntaxTree.addEventListener("pointerdown", startTreePan);
syntaxTree.addEventListener("pointermove", moveTreePan);
syntaxTree.addEventListener("pointerup", endTreePan);
syntaxTree.addEventListener("pointercancel", endTreePan);
syntaxTree.addEventListener("lostpointercapture", endTreePan);

document.addEventListener("click", () => {
  closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeSentenceModal();
    closeInputModal({ commit: true });
    setTreeFullscreen(false);
  }
});

window.addEventListener("resize", () => {
  if (!currentDatasetKey) return;
  requestAnimationFrame(() => {
    applyTreeViewBox(DATASETS[currentDatasetKey]);
    updateZoomControls();
  });
});

function showAppScreen() {
  landingScreen.classList.add("is-hidden");
  appScreen.classList.remove("is-hidden");
  closeMenu();
  sentenceInput.focus();
}

function setTheme(isDark) {
  document.body.classList.toggle("is-dark", isDark);

  const nextModeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";
  const nextModeIcon = isDark ? "☀" : "☾";

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", nextModeLabel);

    const icon = themeToggle.querySelector("span");
    if (icon) icon.textContent = nextModeIcon;
  }

  if (menuThemeToggle) {
    menuThemeToggle.setAttribute("aria-checked", String(isDark));
    menuThemeToggle.setAttribute("aria-label", isDark ? "Turn off dark mode" : "Turn on dark mode");
    menuThemeToggle.classList.toggle("is-on", isDark);
  }

  try {
    localStorage.setItem("syntutor-theme", isDark ? "dark" : "light");
  } catch (error) {
    // The prototype still works when localStorage is unavailable.
  }
}

function loadStoredTheme() {
  try {
    setTheme(localStorage.getItem("syntutor-theme") === "dark");
  } catch (error) {
    setTheme(false);
  }
}

function toggleMenu(forceOpen) {
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : appMenu.classList.contains("is-hidden");
  appMenu.classList.toggle("is-hidden", !shouldOpen);
  menuButton?.classList.toggle("is-open", shouldOpen);
  menuButton?.setAttribute("aria-expanded", String(shouldOpen));
}

function closeMenu() {
  if (!appMenu || appMenu.classList.contains("is-hidden")) return;
  toggleMenu(false);
}

function setSentence(value) {
  sentenceInput.value = value;
  updateClearButton();
  analyzeInput(value);
  sentenceInput.focus();
}

function resetAnalysis() {
  clearTimeout(inputAnalyzeTimer);
  sentenceInput.value = "";
  currentParagraphSentences = [];
  currentSelectedSentenceIndex = null;
  hideSentenceSelector();
  hideComparisonPanel();
  updateClearButton();
  showEmptyState();
  setChatTitle(DEFAULT_CHAT_TITLE);
}

function updateClearButton() {
  const value = sentenceInput.value;
  clearButton.classList.toggle("is-hidden", value.length === 0);
  updateInputViewButton(value);
}

function updateInputViewButton(value = sentenceInput.value) {
  if (!viewInputButton) return;

  const trimmed = value.trim();
  const shouldShow = trimmed.length >= INPUT_VIEW_THRESHOLD || splitIntoSentences(trimmed).length > 1;
  viewInputButton.classList.toggle("is-hidden", !shouldShow);
  viewInputButton.disabled = !shouldShow;
}

function handleInputEditing() {
  updateClearButton();
  hideSentenceSelector();
  hideComparisonPanel();

  clearTimeout(inputAnalyzeTimer);

  if (!sentenceInput.value.trim()) {
    showEmptyState();
    setChatTitle(DEFAULT_CHAT_TITLE);
    return;
  }

  showEmptyState({ pending: true });
  setChatTitle("Processing text");
  inputAnalyzeTimer = window.setTimeout(processCurrentInput, INPUT_ANALYZE_DELAY);
}

function processCurrentInput() {
  clearTimeout(inputAnalyzeTimer);
  analyzeInput(sentenceInput.value);
}

function openInputModal() {
  if (!inputModalOverlay || !inputModalTextarea) return;

  clearTimeout(inputModalCloseTimer);
  inputModalTextarea.value = sentenceInput.value;
  inputModalOverlay.classList.remove("is-hidden", "is-closing");
  inputModalOverlay.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    inputModalOverlay.classList.add("is-active");
    inputModalTextarea.focus();
  });
}

function closeInputModal(options = {}) {
  if (!inputModalOverlay || inputModalOverlay.classList.contains("is-hidden")) return;

  if (options.commit && inputModalTextarea && sentenceInput.value !== inputModalTextarea.value) {
    sentenceInput.value = inputModalTextarea.value;
    updateClearButton();
    handleInputEditing();
  }

  clearTimeout(inputModalCloseTimer);
  inputModalOverlay.classList.remove("is-active");
  inputModalOverlay.classList.add("is-closing");
  inputModalOverlay.setAttribute("aria-hidden", "true");

  inputModalCloseTimer = window.setTimeout(() => {
    inputModalOverlay.classList.add("is-hidden");
    inputModalOverlay.classList.remove("is-closing");
  }, MODAL_TRANSITION_MS);
}

function normalizeSentence(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[’]/g, "'")
    .replace(/[.?!]+$/g, "")
    .replace(/[,;:]+/g, "")
    .replace(/\s+/g, " ");
}

function splitIntoSentences(value) {
  const cleaned = value.trim();
  if (!cleaned) return [];

  const matches = cleaned
    .replace(/\s+/g, " ")
    .match(/[^.!?]+(?:[.!?]+|$)/g) || [];

  return matches
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function analyzeInput(value) {
  const sentences = splitIntoSentences(value);
  currentParagraphSentences = sentences;
  currentSelectedSentenceIndex = null;
  hideComparisonPanel();

  if (!sentences.length) {
    hideSentenceSelector();
    showEmptyState();
    setChatTitle(DEFAULT_CHAT_TITLE);
    return;
  }

  if (sentences.length > 1) {
    renderSentenceSelector(sentences);
    showEmptyState({ paragraph: true });
    setChatTitle(`${sentences.length} sentences detected`);
    return;
  }

  hideSentenceSelector();
  analyzeSentenceUnit(sentences[0]);
}

function analyzeSentenceUnit(sentence) {
  const normalized = normalizeSentence(sentence);

  if (!normalized) {
    hideComparisonPanel();
    showEmptyState();
    setChatTitle(DEFAULT_CHAT_TITLE);
    return;
  }

  const datasetKey = SAMPLE_MAP[normalized];

  if (!datasetKey) {
    hideComparisonPanel();
    showEmptyState({ unsupported: true, selectedSentence: currentSelectedSentenceIndex !== null });
    setChatTitle(currentSelectedSentenceIndex !== null ? "Selected sentence unsupported" : "No matching mock tree");
    return;
  }

  renderDatasetByKey(datasetKey);

  if (CORRECTION_MAP[datasetKey]) {
    renderComparisonPanel(datasetKey, datasetKey);
  } else {
    hideComparisonPanel();
  }
}

function renderDatasetByKey(datasetKey) {
  const dataset = DATASETS[datasetKey];
  if (!dataset) return;

  const isNewTree = datasetKey !== currentDatasetKey;
  currentDatasetKey = datasetKey;
  currentSelectedNode = null;

  if (isNewTree) {
    treeZoom = 1;
    treePanX = 0;
    treePanY = 0;
  }

  setChatTitle(dataset.sentence);
  renderTree(dataset);
}

function renderSentenceSelector(sentences, activeIndex = null) {
  if (!sentenceSelector || !sentenceList) return;

  currentParagraphSentences = sentences;
  currentSelectedSentenceIndex = activeIndex;
  sentenceSelector.classList.remove("is-hidden");
  sentenceList.innerHTML = "";

  updateSentenceSelectBlock(sentences, activeIndex);

  if (sentenceSelectButton) {
    sentenceSelectButton.setAttribute("aria-expanded", String(sentenceModalOverlay && !sentenceModalOverlay.classList.contains("is-hidden")));
  }

  if (sentencePopoverSummary) {
    sentencePopoverSummary.textContent = `${sentences.length} sentences detected. Choose one to generate its tree.`;
  }

  sentences.forEach((sentence, index) => {
    const normalized = normalizeSentence(sentence);
    const datasetKey = SAMPLE_MAP[normalized];
    const hasMockTree = Boolean(datasetKey);
    const hasCorrection = Boolean(datasetKey && CORRECTION_MAP[datasetKey]);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sentence-option";
    button.setAttribute("aria-pressed", String(index === activeIndex));
    button.dataset.index = String(index);

    if (index === activeIndex) {
      button.classList.add("is-active");
    }

    const statusText = hasCorrection ? "Correction available" : hasMockTree ? "Mock tree available" : "Sentence detected";
    button.innerHTML = `
      <span class="sentence-option-index">Sentence ${index + 1}</span>
      <span class="sentence-option-text"></span>
      <span class="sentence-option-status">${statusText}</span>
    `;
    button.querySelector(".sentence-option-text").textContent = sentence;
    button.addEventListener("click", () => selectSentenceFromParagraph(index));
    sentenceList.appendChild(button);
  });
}

function openSentenceModal() {
  if (!sentenceModalOverlay || !sentenceSelectButton || !currentParagraphSentences.length) return;

  clearTimeout(sentenceModalCloseTimer);
  sentenceModalOverlay.classList.remove("is-hidden", "is-closing");
  sentenceModalOverlay.setAttribute("aria-hidden", "false");
  sentenceSelectButton.classList.add("is-open");
  sentenceSelectButton.setAttribute("aria-expanded", "true");

  const activeOption = sentenceList?.querySelector(".sentence-option.is-active");
  const firstOption = sentenceList?.querySelector(".sentence-option");
  requestAnimationFrame(() => {
    sentenceModalOverlay.classList.add("is-active");
    (activeOption || firstOption || sentencePopoverClose)?.focus();
  });
}

function closeSentenceModal() {
  if (!sentenceModalOverlay || sentenceModalOverlay.classList.contains("is-hidden")) return;

  clearTimeout(sentenceModalCloseTimer);
  sentenceModalOverlay.classList.remove("is-active");
  sentenceModalOverlay.classList.add("is-closing");
  sentenceModalOverlay.setAttribute("aria-hidden", "true");
  sentenceSelectButton?.classList.remove("is-open");
  sentenceSelectButton?.setAttribute("aria-expanded", "false");

  sentenceModalCloseTimer = window.setTimeout(() => {
    sentenceModalOverlay.classList.add("is-hidden");
    sentenceModalOverlay.classList.remove("is-closing");
  }, MODAL_TRANSITION_MS);
}

function updateSentenceSelectBlock(sentences, activeIndex = null) {
  if (sentenceSelectLabel) {
    sentenceSelectLabel.textContent = "Select sentence";
  }

  if (sentenceSelectedPreview) {
    sentenceSelectedPreview.textContent =
      activeIndex !== null && sentences[activeIndex]
        ? sentences[activeIndex]
        : "No sentence selected yet";
  }

  if (sentenceSelectCount) {
    sentenceSelectCount.textContent = `${sentences.length} sentences detected`;
  }
}

function hideSentenceSelector() {
  if (!sentenceSelector || !sentenceList) return;
  closeSentenceModal();
  sentenceSelector.classList.add("is-hidden");
  sentenceList.innerHTML = "";

  if (sentenceSelectLabel) {
    sentenceSelectLabel.textContent = "Select sentence";
  }

  if (sentenceSelectedPreview) {
    sentenceSelectedPreview.textContent = "No sentence selected yet";
  }

  if (sentenceSelectCount) {
    sentenceSelectCount.textContent = "";
  }
}

function selectSentenceFromParagraph(index) {
  const sentence = currentParagraphSentences[index];
  if (!sentence) return;

  renderSentenceSelector(currentParagraphSentences, index);
  closeSentenceModal();
  analyzeSentenceUnit(sentence);
}

function renderComparisonPanel(originalKey, activeKey) {
  if (!comparisonPanel || !comparisonList) return;

  const correctedKey = CORRECTION_MAP[originalKey];
  const original = DATASETS[originalKey];
  const corrected = DATASETS[correctedKey];

  if (!original || !corrected) {
    hideComparisonPanel();
    return;
  }

  comparisonPanel.classList.remove("is-hidden");
  comparisonList.innerHTML = "";

  const entries = [
    { key: originalKey, tag: "Original", statusClass: "is-incorrect", dataset: original },
    { key: correctedKey, tag: "Corrected", statusClass: "is-corrected", dataset: corrected },
  ];

  entries.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `comparison-card ${entry.statusClass}`;
    button.setAttribute("aria-pressed", String(entry.key === activeKey));

    if (entry.key === activeKey) {
      button.classList.add("is-active");
    }

    button.innerHTML = `
      <span class="comparison-tag">${entry.tag}</span>
      <span class="comparison-text"></span>
    `;
    button.querySelector(".comparison-text").textContent = entry.dataset.sentence;
    button.addEventListener("click", () => {
      renderDatasetByKey(entry.key);
      renderComparisonPanel(originalKey, entry.key);
    });
    comparisonList.appendChild(button);
  });
}

function hideComparisonPanel() {
  if (!comparisonPanel || !comparisonList) return;
  comparisonPanel.classList.add("is-hidden");
  comparisonList.innerHTML = "";
}

function showEmptyState(options = {}) {
  currentDatasetKey = null;
  currentSelectedNode = null;
  treeZoom = 1;
  treePanX = 0;
  treePanY = 0;
  isTreePointerDown = false;
  isTreePanning = false;
  hasTreePanMoved = false;
  ignoreNextTreeClick = false;
  activeTreePointerId = null;
  setTreeFullscreen(false);

  syntaxTree.classList.remove("is-panning");
  syntaxTree.classList.add("is-hidden");
  syntaxTree.innerHTML = "";
  emptyTreeState.classList.remove("is-hidden");
  xaiContent.classList.add("is-hidden");
  emptyXaiState.classList.remove("is-hidden");

  if (options.paragraph) {
    emptyTreeTitle.textContent = PARAGRAPH_EMPTY_TITLE;
    emptyTreeCopy.textContent = PARAGRAPH_EMPTY_COPY;
  } else if (options.pending) {
    emptyTreeTitle.textContent = PENDING_EMPTY_TITLE;
    emptyTreeCopy.textContent = PENDING_EMPTY_COPY;
  } else if (options.unsupported) {
    emptyTreeTitle.textContent = UNSUPPORTED_EMPTY_TITLE;
    emptyTreeCopy.textContent = options.selectedSentence ? SELECTED_UNSUPPORTED_EMPTY_COPY : UNSUPPORTED_EMPTY_COPY;
  } else {
    emptyTreeTitle.textContent = DEFAULT_EMPTY_TITLE;
    emptyTreeCopy.textContent = DEFAULT_EMPTY_COPY;
  }
  updateZoomControls();
}

function renderTree(dataset, options = {}) {
  const shouldAnimateTree = options.transition !== false;

  if (shouldAnimateTree) {
    syntaxTree.classList.add("is-refreshing");
  }

  const layout = computeTreeLayout(dataset);
  dataset.layoutViewBox = layout.viewBox;
  applyTreeViewBox(dataset);
  syntaxTree.innerHTML = "";

  const childMap = buildChildMap(dataset.edges);
  const activeIds = collectDescendants(currentSelectedNode, childMap);
  const nodeLookup = Object.fromEntries(layout.nodes.map((node) => [node.id, node]));

  const edgeLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const labelLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");

  dataset.edges.forEach(([fromId, toId]) => {
    const from = nodeLookup[fromId];
    const to = nodeLookup[toId];
    if (!from || !to) return;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y + 24);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y - 24);
    line.classList.add("tree-edge");

    if (activeIds.has(fromId) && activeIds.has(toId)) {
      line.classList.add("is-active");
    }

    edgeLayer.appendChild(line);
  });

  layout.nodes.forEach((node) => {
    const isSelected = node.id === currentSelectedNode;
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.textContent = node.label;
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y);
    text.setAttribute("tabindex", "0");
    text.setAttribute("role", "button");
    text.setAttribute("aria-label", `Explain ${node.label}`);
    text.setAttribute("aria-pressed", String(isSelected));
    text.dataset.nodeId = node.id;
    text.classList.add("tree-label");

    if (node.type === "word") {
      text.classList.add("terminal");
    }

    if (activeIds.has(node.id)) {
      text.classList.add(node.status === "issue" ? "is-issue" : "is-active");
    }

    if (isSelected) {
      text.classList.add("is-selected");
    }

    text.addEventListener("click", (event) => {
      if (ignoreNextTreeClick) {
        event.preventDefault();
        event.stopPropagation();
        ignoreNextTreeClick = false;
        return;
      }

      selectTreeNode(node.id);
    });
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
  updateZoomControls();

  if (shouldAnimateTree) {
    window.setTimeout(() => {
      syntaxTree.classList.remove("is-refreshing");
    }, TREE_TRANSITION_MS);
  } else {
    syntaxTree.classList.remove("is-refreshing");
  }
}

function computeTreeLayout(dataset) {
  const nodeMap = new Map(dataset.nodes.map((node) => [node.id, { ...node }]));
  const childMap = buildChildMap(dataset.edges);
  const childIds = new Set(dataset.edges.map(([, child]) => child));
  const roots = dataset.nodes.filter((node) => !childIds.has(node.id));
  const rootId = roots[0]?.id || dataset.nodes[0]?.id;
  const depthMap = new Map();
  const positioned = new Map();
  let cursorX = 90;
  const siblingGap = 42;
  const levelGap = 112;

  function getLeafWidth(node) {
    const labelLength = String(node.label || "").length;
    const baseWidth = node.type === "word" ? 92 : 66;
    const characterWidth = node.type === "word" ? 16 : 13;
    return Math.max(baseWidth, labelLength * characterWidth + 46);
  }

  function place(nodeId, depth = 0) {
    const source = nodeMap.get(nodeId);
    if (!source) return null;

    depthMap.set(nodeId, depth);
    const children = childMap[nodeId] || [];
    const childPositions = children.map((childId) => place(childId, depth + 1)).filter(Boolean);
    const y = 72 + depth * levelGap;
    let x;

    if (!childPositions.length) {
      const leafWidth = getLeafWidth(source);
      x = cursorX + leafWidth / 2;
      cursorX += leafWidth + siblingGap;
    } else {
      const first = childPositions[0];
      const last = childPositions[childPositions.length - 1];
      x = (first.x + last.x) / 2;
    }

    const node = { ...source, x, y };
    positioned.set(nodeId, node);
    return node;
  }

  place(rootId);

  // Include any disconnected mock nodes defensively without changing the main tree order.
  dataset.nodes.forEach((node) => {
    if (!positioned.has(node.id)) {
      const leafWidth = getLeafWidth(node);
      positioned.set(node.id, { ...node, x: cursorX + leafWidth / 2, y: 62 });
      cursorX += leafWidth + siblingGap;
    }
  });

  const nodes = dataset.nodes.map((node) => positioned.get(node.id)).filter(Boolean);
  const maxDepth = Math.max(0, ...Array.from(depthMap.values()));
  const maxX = Math.max(900, ...nodes.map((node) => node.x + getLeafWidth(node) / 2));
  const width = Math.ceil(maxX + 120);
  const height = Math.max(600, 72 + maxDepth * levelGap + 130);

  return {
    nodes,
    viewBox: `0 0 ${width} ${height}`,
  };
}

function selectTreeNode(nodeId) {
  if (!currentDatasetKey) return;

  currentSelectedNode = nodeId;
  renderTree(DATASETS[currentDatasetKey], { transition: false });
}

function updateExplanation(dataset, nodeId) {
  const selectedNode = dataset.nodes.find((node) => node.id === nodeId);

  if (!selectedNode) {
    xaiExplanation.textContent = "Select a label or word in the syntax tree to view its structural explanation.";
    animateXaiUpdate();
    return;
  }

  xaiExplanation.textContent = buildGrammarLearningExplanation(dataset, selectedNode);
  animateXaiUpdate();
}

function animateXaiUpdate() {
  if (!xaiContent || xaiContent.classList.contains("is-hidden")) return;

  clearTimeout(xaiUpdateTimer);
  xaiContent.classList.add("is-updating");
  xaiUpdateTimer = window.setTimeout(() => {
    xaiContent.classList.remove("is-updating");
  }, 130);
}

function buildGrammarLearningExplanation(dataset, selectedNode) {
  const datasetKey = getDatasetKey(dataset);
  const label = cleanNodeLabel(selectedNode.label);
  const phrase = getNodePhrase(dataset, selectedNode.id);
  const baseExplanation = dataset.explanations[selectedNode.id]
    || `${label} is part of this sentence-level mock constituent structure.`;

  if (datasetKey && CORRECTION_MAP[datasetKey]) {
    return buildIncorrectNodeExplanation(dataset, selectedNode, label, phrase, baseExplanation, datasetKey);
  }

  return buildCorrectNodeExplanation(dataset, selectedNode, label, phrase, baseExplanation);
}

function buildIncorrectNodeExplanation(dataset, selectedNode, label, phrase, baseExplanation, datasetKey) {
  const correctionKey = CORRECTION_MAP[datasetKey];
  const correctedSentence = DATASETS[correctionKey]?.sentence || "the corrected sentence";
  const issue = getIssueFeedbackForNode(selectedNode.id, label);

  return [
    `Detected grammatical issue: ${issue.detected}`,
    `Original sentence: “${dataset.sentence}”`,
    `Corrected sentence: “${correctedSentence}”`,
    `Selected node: ${label}${phrase ? ` — “${phrase}”` : ""}`,
    `Node focus: ${issue.role}`,
    `Why the correction is needed: ${issue.reason} ${baseExplanation}`,
    `Grammar rule: ${issue.rule}`,
    [
      "Separate example:",
      `Incorrect: “${issue.exampleIncorrect}”`,
      `Correct: “${issue.exampleCorrect}”`,
    ].join("\n"),
  ].join("\n\n");
}

function buildCorrectNodeExplanation(dataset, selectedNode, label, phrase, baseExplanation) {
  const role = getRoleForLabel(label, phrase);
  const rule = getRuleForLabel(label);
  const structure = getStructureSummaryForNode(label, phrase, dataset.sentence);
  const example = getExampleForLabel(label, dataset.sentence);

  return [
    `Selected node: ${label}${phrase ? ` — “${phrase}”` : ""}`,
    `Current syntactic structure: ${structure}`,
    `Grammar explanation: ${baseExplanation}`,
    `Function in the sentence: ${role}`,
    `Grammar rule: ${rule}`,
    `Separate example: “${example}”`,
  ].join("\n\n");
}

function getDatasetKey(dataset) {
  return Object.keys(DATASETS).find((key) => DATASETS[key] === dataset) || null;
}

function getIssueFeedbackForNode(nodeId, label) {
  const normalized = cleanNodeLabel(label).toUpperCase();
  const normalizedNodeId = String(nodeId || "").toLowerCase();

  if (normalizedNodeId.startsWith("sheexplain-")) {
    const isVerbIssue = ["sheexplain-vp-main", "sheexplain-v-explain", "sheexplain-explain"].includes(normalizedNodeId);
    const isSubjectBranch = ["sheexplain-np-subj", "sheexplain-pron-she", "sheexplain-she"].includes(normalizedNodeId);

    if (isSubjectBranch) {
      return {
        detected: "The subject is third-person singular, so the simple-present verb must also be third-person singular.",
        role: "This subject branch contains the pronoun “She,” which controls the verb form in the predicate.",
        reason: "In the simple present tense, a singular third-person subject such as “she,” “he,” or “it” normally takes a verb ending in -s or -es.",
        rule: "Use subject + verb-s/-es for third-person singular simple present forms.",
        exampleIncorrect: "He write the summary carefully.",
        exampleCorrect: "He writes the summary carefully.",
      };
    }

    if (isVerbIssue) {
      return {
        detected: "The verb phrase has a subject-verb agreement error: “She explain” should be “She explains.”",
        role: normalized === "VP"
          ? "This VP carries the predicate, so its head verb must agree with the subject."
          : "This verb is the head of the predicate and must take the correct simple-present form.",
        reason: "The base form “explain” does not agree with the singular subject “She” in the simple present tense.",
        rule: "For third-person singular subjects in the simple present, add -s or -es to the main verb.",
        exampleIncorrect: "Maria explain the rule to the group.",
        exampleCorrect: "Maria explains the rule to the group.",
      };
    }

    return {
      detected: "The sentence has a subject-verb agreement error in the predicate.",
      role: "This selected branch is structurally acceptable, but it belongs to a sentence whose main verb needs agreement correction.",
      reason: "The object, adverb, and prepositional phrase can remain the same; only the verb form needs to match the singular subject.",
      rule: "Fix agreement errors by checking whether the subject is singular or plural before choosing the present-tense verb form.",
      exampleIncorrect: "The learner answer the question clearly.",
      exampleCorrect: "The learner answers the question clearly.",
    };
  }

  if (["problem-np-subj", "problem-n-subj", "problem-driver-word"].includes(nodeId)) {
    return {
      detected: "The subject noun phrase is incomplete because the singular countable noun “Driver” is missing a determiner.",
      role: normalized === "NP"
        ? "The NP should function as a complete subject, but it lacks the specifier needed before the noun."
        : "This noun belongs to the subject branch, where it needs a determiner to form a complete NP.",
      reason: "A bare singular countable noun usually cannot stand alone as a specific subject in standard English.",
      rule: "Use a determiner such as “the,” “a,” or “this” before a singular countable noun when it functions as a noun phrase.",
      exampleIncorrect: "Student answered the question quickly.",
      exampleCorrect: "The student answered the question quickly.",
    };
  }

  if (["problem-vp-main", "problem-vp-error", "problem-v-taken", "problem-taken-word", "problem-v-should", "problem-should-word"].includes(nodeId)) {
    return {
      detected: "The modal verb phrase is malformed because “should” is followed directly by the past participle “taken.”",
      role: normalized === "VP"
        ? "This VP should contain a grammatical auxiliary sequence after the modal."
        : "This verb item participates in the modal-perfect verb chain and must match the form required by the larger VP.",
      reason: "A modal auxiliary such as “should” must be followed by a base-form verb. To express a past recommendation, the sentence needs “have” before the past participle.",
      rule: "Use modal + base verb. For past recommendations, use modal + have + past participle.",
      exampleIncorrect: "The team should completed the report yesterday.",
      exampleCorrect: "The team should have completed the report yesterday.",
    };
  }

  if (["problem-np-obj", "problem-det-obj", "problem-the-obj", "problem-n-obj", "problem-cadillac-word"].includes(nodeId)) {
    return {
      detected: "The sentence contains errors in the subject NP and modal verb phrase, although this object NP is structurally acceptable.",
      role: "This branch functions as the direct object receiving the action of the verb phrase.",
      reason: "The object “the Cadillac” is complete because it has a determiner plus a noun, but the full sentence still needs the corrected subject and verb structure.",
      rule: "A direct object is often a complete noun phrase, while the surrounding verb phrase must still follow the correct auxiliary pattern.",
      exampleIncorrect: "Pilot should landed the plane on the runway.",
      exampleCorrect: "The pilot should have landed the plane on the runway.",
    };
  }

  return {
    detected: "The sentence has an incomplete subject noun phrase and an incorrect modal-perfect verb phrase.",
    role: getRoleForLabel(label),
    reason: "Both the noun phrase and verb phrase must be structurally complete for the sentence to be grammatical.",
    rule: "A sentence should combine a complete subject NP with a correctly formed predicate VP.",
    exampleIncorrect: "Teacher should explained the answer again.",
    exampleCorrect: "The teacher should have explained the answer again.",
  };
}

function getNodePhrase(dataset, nodeId) {
  const nodeMap = new Map(dataset.nodes.map((node) => [node.id, node]));
  const childMap = buildChildMap(dataset.edges);
  const phraseParts = [];

  function walk(currentId) {
    const currentNode = nodeMap.get(currentId);
    if (!currentNode) return;

    const children = childMap[currentId] || [];
    if (currentNode.type === "word" || children.length === 0) {
      if (currentNode.type === "word") {
        phraseParts.push(cleanNodeLabel(currentNode.label));
      }
      return;
    }

    children.forEach(walk);
  }

  walk(nodeId);

  if (phraseParts.length) {
    return phraseParts.join(" ");
  }

  const selectedNode = nodeMap.get(nodeId);
  return selectedNode ? cleanNodeLabel(selectedNode.label) : "";
}

function cleanNodeLabel(label) {
  return String(label || "").replace(/\*+$/g, "").trim();
}

function getStructureSummaryForNode(label, phrase, sentence) {
  const normalized = cleanNodeLabel(label).toUpperCase();

  if (normalized === "S") return "The sentence is organized as a clause, usually combining a subject phrase with a predicate phrase.";
  if (normalized === "SBAR") return "The selected structure introduces a dependent clause that adds a reason, condition, contrast, or time relationship.";
  if (normalized === "NP") return `The selected noun phrase${phrase ? ` “${phrase}”` : ""} groups a noun with its determiners, modifiers, or complements.`;
  if (normalized === "VP") return `The selected verb phrase${phrase ? ` “${phrase}”` : ""} organizes the action or state with its objects, complements, or modifiers.`;
  if (normalized === "PP") return `The selected prepositional phrase${phrase ? ` “${phrase}”` : ""} adds relational information, such as direction, location, recipient, or time.`;
  if (normalized === "ADJP") return "The selected adjective phrase describes a quality, condition, or state.";
  if (normalized === "ADJ") return "The selected adjective describes or limits the meaning of a noun.";
  if (normalized === "ADVP") return "The selected adverb phrase modifies how, when, where, or to what degree something happens.";
  if (normalized === "ADV") return "The selected adverb modifies a verb, adjective, or clause by adding manner, time, place, or degree.";
  if (normalized === "DET") return "The selected determiner helps specify the noun that follows it.";
  if (normalized === "N") return "The selected noun acts as the lexical head of a noun phrase.";
  if (normalized === "V") return "The selected verb carries action, tense/aspect support, or auxiliary meaning inside the verb phrase.";
  if (normalized === "P") return "The selected preposition begins a prepositional phrase and links its complement to the rest of the sentence.";
  if (normalized === "SUB") return "The selected subordinator introduces a dependent clause and shows how it relates to the main clause.";
  if (normalized === "CONJ") return "The selected conjunction connects parallel words, phrases, or clauses.";
  if (normalized === "PRON") return "The selected pronoun functions like a noun phrase and usually refers to a person, thing, or idea already known in context.";
  if (normalized === "POSS") return "The selected possessive determiner shows ownership or relationship inside a noun phrase.";
  if (normalized === "INTJ") return "The selected interjection adds reaction or emotion while remaining outside the core clause pattern.";
  return `This node is one constituent within the sentence “${sentence}.”`;
}

function getRoleForLabel(label, phrase = "") {
  const normalized = cleanNodeLabel(label).toUpperCase();

  if (normalized === "S") return "It functions as the main clause or sentence-level container that holds the subject and predicate structure.";
  if (normalized === "SBAR") return "It functions as a subordinate clause unit that depends on or modifies the main clause.";
  if (normalized === "NP") return "It functions as a noun phrase, which may act as the subject, object, complement, or object of a preposition.";
  if (normalized === "VP") return "It functions as a verb phrase, expressing the action/state and carrying complements or modifiers.";
  if (normalized === "PP") return "It functions as a prepositional phrase that adds relational detail such as place, direction, recipient, or time.";
  if (normalized === "ADJP") return "It functions as an adjective phrase that describes a noun or subject state.";
  if (normalized === "ADJ") return "It functions as an adjective that modifies or describes a noun.";
  if (normalized === "ADVP") return "It functions as an adverb phrase that modifies a verb, adjective, or whole clause.";
  if (normalized === "ADV") return "It functions as an adverb that adds detail about how, when, where, or to what degree the action occurs.";
  if (normalized === "DET") return "It functions as a determiner/specifier that helps complete and identify a noun phrase.";
  if (normalized === "N") return "It functions as the noun head, naming the central person, thing, place, or idea in its phrase.";
  if (normalized === "V") return "It functions as the verb head or auxiliary element that builds the predicate structure.";
  if (normalized === "P") return "It functions as the preposition that introduces a complement and forms a PP.";
  if (normalized === "SUB") return "It functions as a subordinating marker that introduces a dependent clause.";
  if (normalized === "CONJ") return "It functions as a connector between coordinated words, phrases, or clauses.";
  if (normalized === "PRON") return "It functions as a pronoun that stands in for a noun phrase.";
  if (normalized === "POSS") return "It functions as a possessive determiner inside a noun phrase.";
  if (normalized === "INTJ") return "It functions as an interjection that contributes discourse meaning or emotion.";
  if (phrase) return `It functions as the phrase segment “${phrase}” in the sentence tree.`;
  return "It functions as a constituent within the sentence-level structure.";
}

function getRuleForLabel(label) {
  const normalized = cleanNodeLabel(label).toUpperCase();

  if (normalized === "S") return "A sentence or clause is built from constituents such as a subject NP and a predicate VP; subordinate clauses attach where meaning requires them.";
  if (normalized === "SBAR") return "A subordinate clause is introduced by a subordinator such as “because,” “although,” or “when,” and it depends on a main clause.";
  if (normalized === "NP") return "A noun phrase is built around a noun head and may include determiners, adjectives, possessives, complements, or other modifiers.";
  if (normalized === "VP") return "A verb phrase is built around a verb head and may include auxiliaries, objects, complements, or adverbial modifiers.";
  if (normalized === "PP") return "A prepositional phrase usually contains a preposition followed by a noun phrase complement.";
  if (normalized === "ADJP") return "An adjective phrase describes a noun or subject state and may include degree modifiers such as “very” or “extremely.”";
  if (normalized === "ADJ") return "Adjectives typically appear before nouns or after linking verbs to describe qualities, identity, or condition.";
  if (normalized === "ADVP") return "An adverb phrase modifies actions, adjectives, or clauses and often answers how, when, where, or to what degree.";
  if (normalized === "ADV") return "Adverbs modify verbs, adjectives, or whole clauses and often answer how, when, where, or to what degree.";
  if (normalized === "DET") return "Determiners introduce or specify nouns and often make singular countable nouns usable in a complete noun phrase.";
  if (normalized === "N") return "A noun can serve as the head of a noun phrase; singular countable nouns often require a determiner.";
  if (normalized === "V") return "Verb forms must match the tense, aspect, auxiliary pattern, and phrase position required by the larger VP.";
  if (normalized === "P") return "A preposition normally takes a complement, often a noun phrase, to form a complete PP.";
  if (normalized === "SUB") return "A subordinator such as “because” or “although” introduces a dependent clause and links it to a main clause.";
  if (normalized === "CONJ") return "A conjunction connects grammatically compatible elements, such as words with words, phrases with phrases, or clauses with clauses.";
  if (normalized === "PRON") return "A pronoun functions as a noun phrase and should agree with its antecedent in person, number, and case where required.";
  if (normalized === "POSS") return "A possessive determiner appears before a noun and marks ownership or association within a noun phrase.";
  if (normalized === "INTJ") return "An interjection can stand outside the core clause while still contributing emotional or discourse meaning.";
  return "Phrase-structure rules explain how smaller constituents combine into larger grammatical units.";
}

function getExampleForLabel(label, selectedSentence) {
  const normalized = cleanNodeLabel(label).toUpperCase();
  const examples = {
    S: "The researcher carefully explained the result after the experiment ended.",
    SBAR: "Because the road was slippery, the driver slowed the car.",
    NP: "The careful writer revised the paragraph.",
    VP: "The volunteers quickly organized the supplies.",
    PP: "The child placed the book on the wooden shelf.",
    ADJP: "The final answer was extremely clear.",
    ADJ: "The careful student checked the answer.",
    ADVP: "The student quietly reviewed the notes.",
    ADV: "The student quickly reviewed the notes.",
    DET: "A musician tuned the violin before the concert.",
    N: "The scientist recorded the observation.",
    V: "The coach encouraged the players during practice.",
    P: "The message traveled through the network.",
    SUB: "Because the passage was long, the teacher selected one sentence.",
    CONJ: "The team planned the task and finished it early.",
    PRON: "She solved it before lunch.",
    POSS: "Her classmates admired the project.",
    INTJ: "Oh, the answer became clear after the example.",
  };
  const fallback = "The learner identified the phrase and explained its function.";
  const example = examples[normalized] || fallback;

  return normalizeSentence(example) === normalizeSentence(selectedSentence)
    ? fallback
    : example;
}

function toggleTreeFullscreen() {
  setTreeFullscreen(!treeViewport?.classList.contains("is-fullscreen"));
}

function setTreeFullscreen(isOpen) {
  if (!treeViewport || !treeFullscreenButton) return;

  const shouldOpen = Boolean(isOpen && currentDatasetKey);
  treeViewport.classList.toggle("is-fullscreen", shouldOpen);
  document.body.classList.toggle("is-tree-fullscreen", shouldOpen);
  treeFullscreenButton.textContent = shouldOpen ? "×" : "⛶";
  treeFullscreenButton.setAttribute(
    "aria-label",
    shouldOpen ? "Close syntax tree fullscreen" : "Open syntax tree fullscreen"
  );
  treeFullscreenButton.setAttribute("title", shouldOpen ? "Close fullscreen" : "Fullscreen tree");

  if (currentDatasetKey) {
    requestAnimationFrame(() => {
      applyTreeViewBox(DATASETS[currentDatasetKey]);
      updateZoomControls();
    });
  }
}

function changeTreeZoom(amount) {
  if (!currentDatasetKey) return;
  setTreeZoom(treeZoom + amount);
}

function handleTreeWheel(event) {
  if (!currentDatasetKey || syntaxTree.classList.contains("is-hidden") || isTreePanning) return;
  if (event.target.closest?.("#zoomControls")) return;

  event.preventDefault();

  const modeMultiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? syntaxTree.clientHeight : 1;
  const normalizedDelta = Math.max(-240, Math.min(240, event.deltaY * modeMultiplier));
  const zoomFactor = Math.exp(-normalizedDelta * WHEEL_ZOOM_SENSITIVITY);
  setTreeZoomAt(treeZoom * zoomFactor, event.clientX, event.clientY);
}

function setTreeZoom(value) {
  if (!currentDatasetKey) return;

  const rect = syntaxTree.getBoundingClientRect();
  setTreeZoomAt(value, rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function setTreeZoomAt(value, clientX, clientY) {
  if (!currentDatasetKey) return;

  const dataset = DATASETS[currentDatasetKey];
  const rect = syntaxTree.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const ratioX = Math.min(1, Math.max(0, (clientX - rect.left) / width));
  const ratioY = Math.min(1, Math.max(0, (clientY - rect.top) / height));
  const currentView = getCurrentViewBox(dataset);
  const currentX = currentView.centerX + treePanX;
  const currentY = currentView.centerY + treePanY;
  const anchorX = currentX + ratioX * currentView.width;
  const anchorY = currentY + ratioY * currentView.height;
  const nextZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Number(value.toFixed(3))));

  if (nextZoom === treeZoom) {
    updateZoomControls();
    return;
  }

  treeZoom = nextZoom;

  const nextView = getCurrentViewBox(dataset);
  treePanX = anchorX - ratioX * nextView.width - nextView.centerX;
  treePanY = anchorY - ratioY * nextView.height - nextView.centerY;

  applyTreeViewBox(dataset);
  updateZoomControls();
}

function resetTreeView() {
  if (!currentDatasetKey) return;

  treeZoom = 1;
  treePanX = 0;
  treePanY = 0;
  applyTreeViewBox(DATASETS[currentDatasetKey]);
  updateZoomControls();
}

function startTreePan(event) {
  if (!currentDatasetKey || event.button > 0) return;

  // Do not call preventDefault or capture the pointer here.
  // A simple tap/click on an SVG text node must remain available for XAI selection.
  isTreePointerDown = true;
  isTreePanning = false;
  hasTreePanMoved = false;
  activeTreePointerId = event.pointerId;
  treePanStart = {
    clientX: event.clientX,
    clientY: event.clientY,
    panX: treePanX,
    panY: treePanY,
  };
}

function moveTreePan(event) {
  if (!isTreePointerDown || !currentDatasetKey || event.pointerId !== activeTreePointerId) return;

  const dataset = DATASETS[currentDatasetKey];
  const viewBox = getCurrentViewBox(dataset);
  const dx = event.clientX - treePanStart.clientX;
  const dy = event.clientY - treePanStart.clientY;
  const distance = Math.hypot(dx, dy);

  if (!isTreePanning && distance <= PAN_DRAG_THRESHOLD) return;

  if (!isTreePanning) {
    isTreePanning = true;
    hasTreePanMoved = true;
    ignoreNextTreeClick = true;
    syntaxTree.classList.add("is-panning");
    syntaxTree.setPointerCapture?.(event.pointerId);
  }

  event.preventDefault();

  const unitX = viewBox.width / Math.max(1, syntaxTree.clientWidth);
  const unitY = viewBox.height / Math.max(1, syntaxTree.clientHeight);

  treePanX = treePanStart.panX - dx * unitX;
  treePanY = treePanStart.panY - dy * unitY;
  applyTreeViewBox(dataset);
  updateZoomControls();
}

function endTreePan(event) {
  if (activeTreePointerId !== null && event.pointerId !== activeTreePointerId) return;

  const finishedAfterDrag = isTreePanning && hasTreePanMoved;

  isTreePointerDown = false;
  isTreePanning = false;
  hasTreePanMoved = false;
  activeTreePointerId = null;
  syntaxTree.classList.remove("is-panning");

  try {
    syntaxTree.releasePointerCapture?.(event.pointerId);
  } catch (error) {
    // Pointer capture may already be released by the browser.
  }

  if (finishedAfterDrag) {
    requestAnimationFrame(() => {
      ignoreNextTreeClick = false;
    });
  }
}

function applyTreeViewBox(dataset) {
  syntaxTree.setAttribute("preserveAspectRatio", "xMidYMin meet");
  const viewBox = getCurrentViewBox(dataset);
  const x = viewBox.centerX + treePanX;
  const y = viewBox.centerY + treePanY;

  syntaxTree.setAttribute("viewBox", `${x} ${y} ${viewBox.width} ${viewBox.height}`);
}

function getCurrentViewBox(dataset) {
  const sourceViewBox = dataset.layoutViewBox || dataset.viewBox;
  const [baseX, baseY, baseWidth, baseHeight] = sourceViewBox.split(" ").map(Number);
  const width = baseWidth / treeZoom;
  const height = baseHeight / treeZoom;

  return {
    baseX,
    baseY,
    baseWidth,
    baseHeight,
    width,
    height,
    centerX: baseX + (baseWidth - width) / 2,
    centerY: baseY + (baseHeight - height) / 2,
  };
}

// Panning is intentionally unbounded so users can freely move around the tree canvas.
// The reset control remains responsible for returning the tree to its default centered view.

function updateZoomControls() {
  const hasTree = Boolean(currentDatasetKey);

  [zoomInButton, zoomOutButton, zoomResetButton, treeFullscreenButton].forEach((button) => {
    if (button) button.disabled = !hasTree;
  });

  if (!hasTree) return;

  zoomInButton.disabled = treeZoom >= ZOOM_MAX;
  zoomOutButton.disabled = treeZoom <= ZOOM_MIN;
  zoomResetButton.disabled = treeZoom === 1 && treePanX === 0 && treePanY === 0;
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

loadStoredTheme();
showEmptyState();
