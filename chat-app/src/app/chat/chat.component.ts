import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';

import { environment } from 'src/environments/environment';
import { Member } from '../models/chat';
import { ChatService } from './chat.service';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chats: any[];
  selectedMember: Member;
  users: Member[];

  newUser = { name: '', group: '' };
  groups = [{ value: 'abc' }, { value: 'bcd' }, { value: 'efg' }, { value: 'ijk' }];
  msgData = { name: '', group: '', message: '' };
  socket = io(environment.serverUrl);
  loggedInUser: any;
  group: string;
  noMember: boolean;
  savingMessage: boolean;
  liveUsers = [];

  constructor(private chatService: ChatService, private accountService: AccountService) {
    this.selectedMember = new Member();
    this.users = [];
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getChatByGroup(group) {
    this.chatService.getChatByGroup(group).then((res) => {
      this.chats = res;
    }, (err) => {
      console.log(err);
    });
  }

  sendMessage() {
    this.msgData.message = this.msgData.message.trim();
    if (this.msgData.message !== '') {
      this.savingMessage = true;
      this.chatService.saveChat(this.msgData).then((result) => {
        this.socket.emit('save-message', result);
        this.savingMessage = false;
      }, (err) => {
        console.log(err);
        this.savingMessage = false;
      });
    }
  }

  startChat(chatWith) {
    this.selectedMember = chatWith;
    this.getGroupIfPresent();
    this.scrollToBottom();

  }

  getInitialChats() {
    if (this.loggedInUser.name !== null && this.selectedMember.name) {
      this.getChatByGroup(this.group);
      this.msgData = { group: this.group, name: this.loggedInUser.name, message: '' };
      this.scrollToBottom();
    }
  }

  getGroupIfPresent() {
    this.chatService.getGroup(this.selectedMember.name, this.loggedInUser.name).then((res) => {
      if (res.group) {
        this.group = res.group;
      } else {
        this.group = this.loggedInUser.name + this.selectedMember.name;
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.getInitialChats();
    });
  }

  checkLiveUsers() {
    for (const user of this.users) {
      user.live = false;
      for (const liveU of this.liveUsers) {
        if (user.name === liveU.name && user.email === liveU.email) {
          user.live = true;
        }
      }
      if (!user.live) {
        user.live = false;
      }
    }
  }

  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.liveUsers = [];
    this.accountService.userList().then((res) => {
      this.users = res;
      const currentUserIndex = this.users.indexOf(this.users.find((u) => u.email === JSON.parse(localStorage.getItem('user')).email));
      this.users.splice(currentUserIndex, 1);
      if (this.users.length > 0) {
        this.selectedMember = this.users[0];
      } else {
        this.noMember = true;
        return;
      }
      this.getGroupIfPresent();
    }, (err) => {
      console.log(err);
    }).finally(() => {
      const us = { name: this.loggedInUser.name, email: this.loggedInUser.email };
      this.socket.emit('liveClients', us);
    });

    // tslint:disable-next-line:space-before-function-paren
    this.socket.on('new-message', function (data) {
      if (data.message.group === this.group) {
        this.chats.push(data.message);
        this.msgData = { group: this.group, name: this.loggedInUser.name, message: '' };
        this.scrollToBottom();
      }
    }.bind(this));

    // tslint:disable-next-line:space-before-function-paren
    this.socket.on('clients', function (data) {
      this.liveUsers = data.clients;
      this.checkLiveUsers();
    }.bind(this));

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    const us = { name: this.loggedInUser.name, email: this.loggedInUser.email };
    this.socket.emit('leaveChat', us);
  }
}
