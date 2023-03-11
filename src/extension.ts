import * as vscode from 'vscode';
import { Reminder } from './Reminder';
import { Scheduler } from './scheduler';

export function activate(context: vscode.ExtensionContext) {

	const scheduler = new Scheduler(context);
	scheduler.start();

	let disposable = vscode.commands.registerCommand('extension.start', () => {
		Reminder.show(context);
	});
	
	// Instruction binding
	context.subscriptions.push(disposable);
}

export function deactivate() {}
