# REPRO.md  
## Reproduction Steps for SIGTRAP Crash in ChatGPT macOS (Observed April 2025)

This file describes the exact steps and environment used to reliably trigger a fatal `EXC_BREAKPOINT (SIGTRAP)` crash in the ChatGPT macOS application (`1.2025.091`) while performing tool-assisted patching via the `oboe` system.

---

## 🖥️ Environment

- **macOS Version:** macOS 15.3.2 (24D81)
- **Hardware:** Apple M2 Max (Mac14,5)
- **System Integrity Protection (SIP):** Disabled
- **WebStorm Version:** WebStorm 2024.3.5 (Build March 12, 2025)
- **ChatGPT Version:** ChatGPT macOS 1.2025.091 (Build 1743812765)
- **Prompt Agent:** ChatGPT-4o with Oboe enabled

---

## 📁 Project State

The active project was the `oracle-ify` package inside a monorepo. These files were open in WebStorm, in split view:

```
packages/oracle-ify/src/index.ts  
packages/oracle-ify/src/browser/index.ts  
packages/oracle-ify/src/browser/types.ts  
packages/oracle-ify/src/browser/browser.ts  
packages/oracle-ify/src/browser/core.ts
```

Repo structure at the time:

```
packages/oracle-ify/src
├── browser/
│   ├── browser.ts
│   ├── core.ts
│   ├── index.ts
│   └── types.ts
├── index.ts
├── node/
│   ├── cli.ts
│   ├── converter.ts
│   ├── index.ts
│   ├── options.ts
│   └── preprocess.ts
└── shared/
    ├── index.ts
    ├── types.ts
    └── utils.ts
```

---

## 🔁 Reproduction Prompt

This prompt initiated the first crash:

```
okay that's done. patch made. also nuked some extraneous files since we didn't need duplicated core and pre process. 

~/Developer/src/scene-release/scene-release/packages/oracle-ify/src main*  
❯ tre  
.  
├── browser  
│   ├── browser.ts  
│   ├── core.ts  
│   ├── index.ts  
│   └── types.ts  
├── index.ts  
├── node  
│   ├── cli.ts  
│   ├── converter.ts  
│   ├── index.ts  
│   ├── options.ts  
│   └── preprocess.ts  
└── shared  
    ├── index.ts  
    ├── types.ts  
    └── utils.ts  

look at the files I have open for you. I think browser might be good to go. we just now need to update the index.ts for browser and for the library itself.
```

ChatGPT began a patch sequence. The desktop app crashed shortly after.

---

## ✅ Notes

- No scrolling, editing, or animation was required — merely having the listed files open and issuing the patch-related prompt was sufficient to trigger the fault
- The crash did not require additional input or canvas reflow
- Subsequent re-prompts asking ChatGPT to reapply patches triggered the same crash again
- Crash was confirmed to hit a `brk #0x1` within `ChatGPT.framework`

---

## 🪧 Greetz

Greetz to BERT, of course.

Report authored by Lucien Brulé  
lucien@brule.io  
