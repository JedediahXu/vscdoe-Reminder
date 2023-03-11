'use strict';
import * as vscode from 'vscode';
import Asset from './utility';

export class Reminder {
    private static panel: vscode.WebviewPanel | undefined;

    // Display content
    public static show(context: vscode.ExtensionContext, ) {
        let asset: Asset = new Asset(context);

        const title = asset.getTitle();
        const img = asset.getImages();
        const motif = asset.getmotif()

        if (this.panel) {
            this.panel.webview.html = this.generateHtml(img,title,motif);
            this.panel.reveal();
        } else {
            this.panel = vscode.window.createWebviewPanel("Reminder", "提醒窗口", vscode.ViewColumn.Two, {
                enableScripts: true,
                retainContextWhenHidden: true,
            });
            this.panel.webview.html = this.generateHtml(img,title,motif);
            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
        }
    }

    protected static generateHtml(imagePath: string[], title: string,motif:string): string {
        let html = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
            * {
              margin: 0;
              padding: 0;
            }
            
            body.vscode-light {
              color: black;
            }
            
            body.vscode-dark {
              color: white;
            }
            
            body.vscode-high-contrast {
              color: red;
            }
            
        
            body {
              height: 100vh;
        
              display: flex;
              align-items: center;
              justify-content: center;
            }
        
            .loginBox {
              height: 100vh;
              display: flex;
              flex-direction: column;
            }
        
            .box {
              height: 175px;
              font-size: 50px;
              color: #fff;
              font-weight: bold;
        
              display: flex;
              align-items: center;
              justify-content: center;
            }
        
            .box-title {
              height: 117px;
              font-size: 55px;
              color: #45A3DB;
              font-weight: bold;
        
              display: flex;
              align-items: center;
              justify-content: center;
            }
        
            .box-text {
              height: 60px;
              font-size: 21px;
              color: #fff;
        
              display: flex;
              align-items: center;
              justify-content: center;
            }
        
            .box-img {
              height: 300px;
              margin-top: 20px;
              width: 400px;
              margin: 0 auto;
              margin-top: 20px;
              position: relative;
            }
        
            img {
                max-width: 100%;
                max-height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        
          </style>
        </head>
        
        <body>
          <div class="loginBox">
            <div class="box">
            </div>
            <div class="box-title">
              ${motif}
            </div>
            <div class="box-text">
            ${title}
            </div>
            <div class="box-img">
              <img src="${imagePath}">
            </div>
          </div>
        </body>
        <script>
          function getTime() {
            var date = new Date();
            var year = date.getFullYear(); //获取年份
            var month = date.getMonth() + 1; //获取月份
            var day = date.getDate(); //获取日期
            var hour = date.getHours(); //获取小时
            hour = hour < 10 ? '0' + hour : hour;
            var minute = date.getMinutes(); // 获取分
            minute = minute < 10 ? '0' + minute : minute;
            var seconds = date.getSeconds(); //获取秒
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return month + '月' + day + '日&nbsp;' + hour + ':' + minute + ':' + seconds;
          }
        
          setInterval(function () {
            document.querySelector('.box').innerHTML = getTime();
          }, 1000)
        
        </script>
        </html>
        `;
        return html;
    }
}
