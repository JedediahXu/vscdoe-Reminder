"use strict";
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from "vscode";

export class Utility {
    public  constructor() {}
    // Get configuration item
    public static getConfiguration(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration("reminder");
    }
}

export default class Asset  extends Utility {

    //* When the parameter is directly given the parameter type, equal to the declaration and then assignment */
    public constructor(private context: vscode.ExtensionContext) {
        super();
    }

    // Get the title
    public getTitle(): string {
        return Utility.getConfiguration().get<string>('title', '');
    }

    public getImages():string[] {
        return Utility.getConfiguration().get<string[]>('picture', []);
    }

    public getmotif(): string {
        return Utility.getConfiguration().get<string>('motif', '');
    }
    
}
