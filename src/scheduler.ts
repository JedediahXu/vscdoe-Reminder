'use strict';
import * as vscode from "vscode";
import { Reminder } from './Reminder';
import { Utility } from './utility';

export class Scheduler {
    public constructor(private context: vscode.ExtensionContext) {}

    public start() {
        // Execute according to the obtained value
        setInterval(() => {
            Reminder.show(this.context);
        }, 1000 * 60 * Utility.getConfiguration().get<number>('interval', 60));
    }
}
