// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
type MyVariables = string | undefined | number;
let clock;
let configuration = vscode.workspace.getConfiguration("workbench");
let selectedDarkTheme: MyVariables = vscode.workspace.getConfiguration("vscode_darkmode").get("dark");
let selectedLightTheme: MyVariables = vscode.workspace.getConfiguration("vscode_darkmode").get("light");
let selectedTimeDay: MyVariables = vscode.workspace.getConfiguration("vscode_darkmode").get("day");
let selectedTimeNight: MyVariables = vscode.workspace.getConfiguration("vscode_darkmode").get("night");

let getThemes = vscode.workspace.getConfiguration("workspace").inspect("colorTheme");
console.log(getThemes);

// Detect Time Cahnging in every 10 seconds
setInterval(() => {
  selectedDarkTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("dark");
  selectedLightTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("light");
  selectedTimeDay = vscode.workspace.getConfiguration("vscode_darkmode").get("day");
  selectedTimeNight = vscode.workspace.getConfiguration("vscode_darkmode").get("night");

  clock = new Date().getHours();
  if (selectedTimeDay !== undefined && selectedTimeNight !== undefined) {
    if ((24 >= clock && clock > selectedTimeNight) || (clock >= 0 && selectedTimeDay > clock)) {
      configuration
        .update("colorTheme", selectedDarkTheme, vscode.ConfigurationTarget.Global)
        .then((a) => console.log("Changed Theme"));
    } else if (clock <= selectedTimeNight && clock > selectedTimeDay) {
      configuration
        .update("colorTheme", selectedLightTheme, vscode.ConfigurationTarget.Global)
        .then((a) => console.log("Changed Theme"));
    }
  }
}, 1000);
// Pop Up

let messages = ["https://twitter.com/KccEnes"];

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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
  // Fire when plugin enabled
  selectedDarkTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("dark");
  selectedLightTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("light");
  selectedTimeDay = vscode.workspace.getConfiguration("vscode_darkmode").get("day");
  selectedTimeNight = vscode.workspace.getConfiguration("vscode_darkmode").get("night");

  clock = new Date().getHours();
  if (selectedTimeDay !== undefined && selectedTimeNight !== undefined) {
    if ((24 >= clock && clock > selectedTimeNight) || (clock >= 0 && selectedTimeDay > clock)) {
      configuration
        .update("colorTheme", selectedDarkTheme, vscode.ConfigurationTarget.Global)
        .then((a) => console.log("Changed Theme"));
    } else if (clock <= selectedTimeNight && clock > selectedTimeDay) {
      configuration
        .update("colorTheme", selectedLightTheme, vscode.ConfigurationTarget.Global)
        .then((a) => console.log("Changed Theme"));
    }
  }

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  selectedDarkTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("dark");
  selectedLightTheme = vscode.workspace.getConfiguration("vscode_darkmode").get("light");
  selectedTimeDay = vscode.workspace.getConfiguration("vscode_darkmode").get("day");
  selectedTimeNight = vscode.workspace.getConfiguration("vscode_darkmode").get("night");

  clock = new Date().getHours();

  const darkModeCommand = "vscodeDarkmode.Dark";
  const ligthModeCommand = "vscodeDarkmode.Light";
  const command = "theme.helloWorld";
  const darkModeCommandHandler = (name: string = "dark") => {
    console.log(`Theme is : ${name}`);
  };
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
}

// this method is called when your extension is deactivated
export function deactivate() {}
