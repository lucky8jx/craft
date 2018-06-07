import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

  @Component({
    selector: 'app-account-modal',
    templateUrl: './account-modal.component.html',
    // styleUrls: ['./account-modal.component.css']
  })
  export class AccountModalComponent implements OnInit {
    @Input() title;
    modalTitle: string;
    record: any = {};
    i: any;
    schema: SFSchema = {
      properties: {
        username: { type: 'string', title: '用户名' },
        nickname: { type: 'string', title: '昵称' },
        role: {
          type: 'string',
          title: '角色',
          ui: {
            widget: 'select',
            asyncData: () => this.http.get('/accounts/role?roleName=customer_service').pipe(
              map((item: any) => {
                return item.data.map(type => {
                  return {
                    label: type.username,
                    value: type.id
                  };
                });
              })
            )
          },
        },
        phone: { type: 'string', title: '电话' },
        wechat: { type: 'string', title: '微信' },
        description: { type: 'string', title: '备注', maxLength: 140 },
        avatar: {
          type: 'string',
          title: '图片',
          ui: {
            widget: 'upload',
            action: '/accouts/file',
            name: 'file',
            resReName: 'data.url',
            asyncData: () => {
              if (!this.title) {
                return this.http.get(`/accounts/${this.record.id}`).pipe(
                  map((item: any) => {
                    const photo = item.data.photo.split('/');
                    const photoName = photo[photo.length - 1];
                    return [
                      {
                        uid: -1,
                        name: photoName,
                        status: 'done',
                        url: item.data.photo,
                        response: {
                          data: {
                            url: item.data.photo
                          }
                        }
                      }
                    ];
                  })
                );
              } else {
                return of([]);
              }
            },
            listType: 'picture',
            change: (args) => {
              // console.log(args);
            }
          }
        },
      },
      required: ['username', 'role', 'phone', 'wechat'],
    };
    ui: SFUISchema = {
      '*': {
        spanLabelFixed: 100,
        grid: { span: 12 },
      },
      $href: {
        widget: 'string',
      },
      $description: {
        widget: 'textarea',
        grid: { span: 24 },
      },
    };

    constructor(
      private modal: NzModalRef,
      public msgSrv: NzMessageService,
      public http: _HttpClient,
    ) {}

    ngOnInit(): void {
      if (!this.title) {
        this.modalTitle = `编辑 ${this.record.name} 用户信息`;
        this.http.get(`/accounts/${this.record.id}`).subscribe((res: any) => (this.i = res.data));
      } else {
        this.modalTitle = this.title;
        this.i = {
          'username': '',
          'description': '',
          'phone': '',
          'role': '',
          'wechat': '',
          'nickname': '',
        };
      }
    }

    save(value: any) {
      this.title ? this.addAccount(value) : this.updateAccount(value);
    }

    addAccount(value: any) {
      // console.log(value);
      this.http.post(`/accounts`, value).subscribe(
        res => {
        // console.log(res);
          this.modal.close('onOk');
        },
        err => {
          this.modal.close('onError');
        }
      );
    }

    updateAccount(value: any) {
      this.http.put(`/accounts/${this.record.id}`, value).subscribe(
        res => {
          this.modal.close('onOk');
        },
        err => {
          this.modal.close('onError');
        }
      );
    }

    close() {
      this.modal.destroy();
    }
  }
