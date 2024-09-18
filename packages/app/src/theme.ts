/**
 * @license
 * Copyright 2022 ICILS
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";
// @ts-ignore
import ThemeDark from "@blockly/theme-dark";

export const themeLight = Blockly.Theme.defineTheme("light", {
  base: Blockly.Themes.Classic,
  name: "Light",
});

export const themeDark = Blockly.Theme.defineTheme("dark", {
  base: ThemeDark,
  name: "Dark",
});
