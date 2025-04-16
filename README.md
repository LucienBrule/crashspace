# Diff Until It Breaks

## A Swift SIGTRAP Journey Into ChatGPT’s Patch Pipeline

Lucien Brulé — lucien@brule.io

---

### Overview

While running diff-based tooling inside the ChatGPT macOS app, I stumbled into a crash.

Then I hit it again. And again.  
Eventually, I put LLDB in one terminal, Ghidra in the other, and ChatGPT right in the middle.

I wasn’t trying to crash ChatGPT. I was trying to make ASCII art and vibe. Then it broke.

---

### The Crash

```
Exception Type:  EXC_BREAKPOINT (SIGTRAP)  
Termination Reason:  Trace/BPT trap: 5  
Faulting Instruction:  0x1092ef078 (brk #0x1)  
Thread:  12  
Function:  OAIDiff.DiffUtilities.applyPatch(...)  
```

Triggered while applying tool-call-rich diffs in a canvas view using the “oboe” workflow.  
This appears to be Swift deliberately tripping over a state inconsistency — not a segfault, but a `brk #0x1` internal
fail-fast.

---

### Repro Steps

1. Open a patch with lots of tool calls
2. Open canvas diff view (oboe)
3. Scroll + edit the patch while the canvas is rendering
4. Wait for layout reflows mid-patch
5. SIGTRAP lands

---

### RE Summary

Using LLDB and Ghidra, I confirmed the `brk` instruction is part of a Swift assertion pathway.  
Two distinct failpoints observed:

- `0x181B078` — triggered on `tbnz x28, #0x3f` (bitmask test — possibly a nil or flag check)
- `0x58B7078` — matches earlier crashes, likely in the patch pipeline

In both cases, Swift Concurrency tasks running on background threads were accessing state while `Thread 0` (main) was
processing Core Animation commits and layout cycles.

Stack traces from AppKit and QuartzCore suggest intense layout churn:

- CA::Layer::collect_layers_()
- NSViewDrawRect
- _recursiveDisplayAllDirtyWithLock

The exact diff logic hit was OAIDiff.DiffUtilities.applyPatch(...), likely a Swift-side patch engine for tool outputs

---

### What’s Happening?

A background Swift task (probably patch application or diff rendering logic) is accessing shared state that's:

- Being mutated by the UI thread
- Or invalidated mid-operation

Swift's runtime detects this, panics, and hits a `brk` to prevent undefined behavior.

This isn't memory corruption. It’s *prevention of* memory corruption.

---

### Is It a Vulnerability?

Unlikely.  
This isn’t exploitable under normal constraints.

But it *is*:

- A reliability landmine
- A complex UI race
- And a pain to debug from the outside in

---

### Appendix: LLDB Register Dump (Crash State)

```
x0 = type metadata for Foundation.CharacterSet  
x28 = invalid flag check (tbnz failure)  
x26 = _swiftEmptyArrayStorage  
sp = 0x000000034b9723a0  
lr = 0x0000000107282788  
pc = 0x0000000107283078  
```

---

### Notes from the Frontline

> "oboe is trash just give my man ripgrep. or cop out and give ME MCP ffs!"  
> — Lucien Brulé

> "Legendary. I’d frame that on the team wall if I were OpenAI."  
> — ChatGPT4o

---

### Contact

Lucien Brulé  
lucien@brule.io  
Signal/iMessage: 818-636-3761  
Relocating to SF from NYC.  
Would love to talk about fixing this properly. With source.

---

### Epilogue

This crash is fun. This bug is beautiful.  
And yeah, if I had the source… I’d already be done.

---

**Disclaimer**


The above README.md is written in whole by ChatGPT4o, with the consent of me, Lucien.
The contents of this repository and my research were carried out in good faith. My goal was to genuinely
determine the root cause of a recurring crash encountered during legitimate use of the ChatGPT application, specifically
concerning the patch application functionality ("oboe").
This information is shared for technical and educational purposes only, with the aim of contributing to the stability
and improvement of the product. The techniques employed were standard reverse engineering practices applied to the
client-side application. There is no intention to violate any laws or terms of service, nor to encourage or enable any
malicious activities. The findings presented herein should be used responsibly and ethically. The author assumes no
liability for any misuse of this information by third parties.


## Reproduction

You might be wondering, why is there a super bloated turbo / pnpm mono repo application that generates ascii art included in this readme
well, it's the reproducer. I honestly just wanted to try something out with web dev (unrelated to to the above findings). I figured, the most
helpful thing to do would be, beyond providing logs and coredumps to the right people, would be to just publish the repo I can reproduce the crash on.
Which this repo somehow can, reliably reproduce crashes on with a specific request with certain files. 

You can find out more about how to do that in [REPRO.md](./REPRO.md)

## NFO / Oracle-ify

If you were curious about the actual (unrelated to the crash) application code, here's a quick rundown:

**packages/oracle-ify**: A library that works in nodejs and in the browser, renders images to ascii, supports a number of transforms.

**apps/nfo*** : A demo scene inspired web application that uses vite tailwind and the new react router, consumes oracle-ify as a package. runs it  in browser, allows users to generate their own ascii art. 

### Why?

It was a side quest / mental vacation project I decided to dev something because I had a *good idea* about how I could make something for a personal brand.
Stemming from said *good idea* was the realization that LLMS are pretty bad at generating ASCII art, or SVG art. But they Can do text to image prompts of good ascii art. 
So one thing led to another and I made a prototype of something that might in a future form enable them to make decent ascii art. That's it really.

*note* The released version of this might be in a broken state, I wanted to not touch the reproducible app, it's licensed under MIT feel free to do as you will with it. 


