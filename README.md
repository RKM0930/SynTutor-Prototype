# SynTutor Test Inputs

This README contains sample inputs for testing SynTutor’s sentence-level syntactic parsing, comparative error analysis, and paragraph sentence-selection behavior.

## Single-Sentence Inputs

| Input | Purpose |
|---|---|
| `Driver should taken the Cadillac.` | Incorrect sentence; shows comparative error analysis. |
| `The driver should have taken the cadillac.` | Corrected version. |
| `The curious student quickly solved the difficult puzzle in class, and she proudly explained it.` | Compound sentence with multiple syntactic structures. |
| `Because the lesson was confusing, the teacher explained the rule again.` | Complex sentence with a subordinate clause. |
| `Wow, the curious student quickly explained the difficult lesson to her classmates because they were confused.` | Sentence containing major parts of speech and a reason clause. |
| `Although the sentence was complex, the class understood the structure clearly.` | Complex sentence with a concessive subordinate clause. |
| `The teacher praised their effort and encouraged them to keep practicing.` | Sentence with a compound verb phrase. |
| `The student carefully reviewed the lesson because the topic was difficult.` | Sentence with an adverb and reason clause. |
| `She explain the answer clearly to her classmates.` | Incorrect sentence; shows comparative error analysis. |
| `She explains the answer clearly to her classmates.` | Corrected version. |
| `After the discussion, the teacher corrected the sentence and showed the proper structure.` | Sentence with an introductory prepositional phrase and compound verb phrase. |

## Paragraph Inputs

### Paragraph 1

```text
Wow, the curious student quickly explained the difficult lesson to her classmates because they were confused. Although the sentence was complex, the class understood the structure clearly. The teacher praised their effort and encouraged them to keep practicing.
```

**Expected behavior:**

- Detects three sentences.
- Allows the user to select one sentence.
- Generates a constituent tree only for the selected sentence.
- Does not generate a tree for the full paragraph at once.

### Paragraph 2

```text
The student carefully reviewed the lesson because the topic was difficult. She explain the answer clearly to her classmates. After the discussion, the teacher corrected the sentence and showed the proper structure.
```

**Expected behavior:**

- Detects three sentences.
- Allows the user to select one sentence.
- Shows comparative error analysis when the incorrect sentence is selected.
- Incorrect sentence: `She explain the answer clearly to her classmates.`
- Corrected sentence: `She explains the answer clearly to her classmates.`
- Generates a constituent tree only for the selected sentence.

## Notes

SynTutor is designed for sentence-level syntax tree generation. Paragraphs or longer passages should be split into individual sentences, and the syntax tree should appear only after the user selects a specific sentence.
