// SPDX-License-Identifier: MIT
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Moon has been listening for four billion years, so the joke is
// built on that age and on its tired patience. The first clause lists
// everything people send up at night — wishes, howls, and promises made
// at 2 a.m. — and the em dash turns the whole list into a setup. The
// second clause is the comeback: after all that asking, nobody has ever
// asked after the Moon itself. "Wished me a good night back" lands
// because it is small, polite, and completely overdue, and it makes the
// Moon sound wry and old rather than angry. At 115 characters the line
// is one breath, one line, and it wastes none of its budget.
const moonLine =
  "Four billion years of wishes, howls, and 2 a.m. promises — and not one of you has ever wished me a good night back.";

// Gate: the bounty judges a single line of 1-240 UTF-8 characters.
// A blank line, a second line, or a carriage return would break that
// shape, so all three are rejected before anything is written. A
// trailing space would also waste a character and look like the Moon
// trailed off, so a line that does not end on its final word is out.
if (
  moonLine.length < 1 ||
  moonLine.length > 240 ||
  moonLine.trim().length === 0 ||
  moonLine.trimEnd() !== moonLine ||
  moonLine.includes("\n") ||
  moonLine.includes("\r")
) {
  throw new Error(
    `entry must be one line of 1-240 characters, got ${moonLine.length}`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), moonLine, "utf8");
