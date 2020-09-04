// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { time } from "console";

type MyVariables = string | undefined | number;
let clock;
let configuration = vscode.workspace.getConfiguration("workbench");
let workspaceTheme: MyVariables = vscode.workspace.getConfiguration("workbench").get("colorTheme");
let selectedDarkTheme: MyVariables = vscode.workspace.getConfiguration("vscode_darkmode").get("dark");
let selectedLightTheme: MyVariables = vscode.workspace.getConfiguration("vscode_darkmode").get("light");
let selectedTimeDay: MyVariables = vscode.workspace.getConfiguration("vscode_darkmode").get("day");
let selectedTimeNight: MyVariables = vscode.workspace.getConfiguration("vscode_darkmode").get("night");

// AM - PM

// Detect Time Changing in every  seconds
console.log(workspaceTheme);
console.log(selectedDarkTheme);

// Pop Up

let messages = ["https://twitter.com/KccEnes"];
var themeInterval: any;
vscode.window
  .showInformationMessage(
    "Thank You for installed vscode dark mode. Do you have any idea ? Feel free to contact with me",
    ...messages
  )
  .then((selection) => {
    if (selection === "https://twitter.com/KccEnes") {
      vscode.env.openExternal(vscode.Uri.parse("https://twitter.com/KccEnes"));
    }
  });
// vscode.workspace.getConfiguration().update("vscode_darkmode.dark", "light", vscode.ConfigurationTarget.Global);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// vscode.extensions.all.forEach((ext) => {
//   const ThemeExtension = ext.packageJSON.contributes
//     ? ext.packageJSON.contributes.themes
//       ? ext.packageJSON.contributes.themes
//       : undefined
//     : undefined;
//   if (ThemeExtension) {
//     for (var i = 0; i < ThemeExtension.length; i++) {
//       const themeName = ThemeExtension[i].label;
//       console.log(themeName);
//     }
//   }
// });

export function activate(context: vscode.ExtensionContext) {
  function setTheme() {
    workspaceTheme = vscode.workspace.getConfiguration("workbench").get("colorTheme");
    selectedDarkTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("dark");
    selectedLightTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("light");
    selectedTimeDay = vscode.workspace.getConfiguration("vscode_darkmode").get("day");
    selectedTimeNight = vscode.workspace.getConfiguration("vscode_darkmode").get("night");

    clock = new Date().getHours();
    if (selectedTimeDay !== undefined && selectedTimeNight !== undefined) {
      if (
        ((24 >= clock && clock > selectedTimeNight) || (clock >= 0 && selectedTimeDay > clock)) &&
        selectedDarkTheme !== workspaceTheme
      ) {
        configuration.update("colorTheme", selectedDarkTheme, vscode.ConfigurationTarget.Global);
      } else if (clock <= selectedTimeNight && clock > selectedTimeDay && selectedLightTheme !== workspaceTheme) {
        configuration.update("colorTheme", selectedLightTheme, vscode.ConfigurationTarget.Global);
      } else {
        return;
      }
    }
  }

  themeInterval = setInterval(setTheme, 1000);
  // Fire when plugin enabled

  // commands

  const stop_darkmode = "vscode_darkmode.stop";
  const start_darkmode = "vscode_darkmode.start";

  // subscribe commands

  function stop_darkmode_func() {
    clearInterval(themeInterval);
  }

  function start_darkmode_func() {
    themeInterval = setInterval(setTheme, 1000);
  }

  // Add commands

  context.subscriptions.push(vscode.commands.registerCommand(stop_darkmode, stop_darkmode_func));
  context.subscriptions.push(vscode.commands.registerCommand(start_darkmode, start_darkmode_func));

  //

  selectedDarkTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("dark");
  selectedLightTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("light");
  selectedTimeDay = vscode.workspace.getConfiguration("vscode_darkmode").get("day");
  selectedTimeNight = vscode.workspace.getConfiguration("vscode_darkmode").get("night");

  clock = new Date().getHours();
  if (selectedTimeDay !== undefined && selectedTimeNight !== undefined) {
    if ((24 >= clock && clock > selectedTimeNight) || (clock >= 0 && selectedTimeDay > clock)) {
      configuration.update("colorTheme", selectedDarkTheme, vscode.ConfigurationTarget.Global);
    } else if (clock <= selectedTimeNight && clock > selectedTimeDay) {
      configuration.update("colorTheme", selectedLightTheme, vscode.ConfigurationTarget.Global);
    }
  }

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
}

// this method is called when your extension is deactivated
export function deactivate() {}
