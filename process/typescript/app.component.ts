// Import all of our dependencies
import {Component, OnInit} from 'angular2/core';
import {MainComponent} from './main.component';
import {JoinComponent} from './join.component';
import {ChatService, Server} from './chat.service';

// Use the @Component Decorator to define the following class as a component and provide the meta data including the view 
@Component({
  selector: "chat-app",
  directives: [MainComponent, JoinComponent],
  providers: [ChatService],
  template: `
    <div class="container">
      <h1>{{title}} 
        <!-- status tag changes based upon the connection state -->
        <span id="status" [ngClass]="statusClass()">{{statusMessage()}}</span>
      </h1>
    </div>
    <!-- show join component if the server is not connected or the user hasn't joined yet -->
    <join-chat *ngIf="!server.connected || !server.joined"></join-chat>
    <!-- else show main component (if conected and user has joined) -->
    <main-chat *ngIf="server.connected && server.joined"></main-chat>
  `
})

export class AppComponent implements OnInit {
  //CLASS PROPERTIES
  title: string = "Angular 2 Chat";
  server : Server;

  //CLASS METHODS
  constructor(private _chatService: ChatService) {}
  
  ngOnInit(){
    //one component is created grab a reference to the server from the Chat Service
    this.server = this._chatService.getServer();
  }
  
  statusClass():string {
    if (this.server.loading) return "label label-default";
    if (this.server.connected) return "label label-success";
    return "label label-danger";
  }
  //decide what status message should be based upon connection
  statusMessage():string {
      if (this.server.loading) return "loading";
      if (this.server.connected) return "connected";
      return "disconnected";
  }
}
