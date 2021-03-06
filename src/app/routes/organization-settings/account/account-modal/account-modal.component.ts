import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, FormProperty, PropertyGroup } from '@delon/form';

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
        role_id: {
          type: 'string',
          title: '角色',
          ui: {
            widget: 'select',
            asyncData: () => this.http.get('/roles/sub/all').pipe(
              map((item: any) => {
                return item.data.map(type => {
                  return {
                    label: type.description,
                    value: type.id
                  };
                });
              })
            )
          },
        },
        nickName: { type: 'string', title: '昵称' },
        password: {
          type: 'string',
          title: '密码',
          // readOnly: !!this.title,
          // shown: true,
          ui: {
            type: 'password',
            visibleIf: {
              password: (value: any) => {
                // console.log(value);
                return !!this.title;
              }
            }
          }
        },
        email: { type: 'string', title: '邮箱', format: 'email' },
        phone: {
          type: 'string',
          title: '电话',
          ui: {
            validator: (value: any, formProperty: FormProperty, form: PropertyGroup) => {
              return value.length === 11 ? [] : [{
                keyword: 'lengthEqEleven',
                message: '手机号码需为11位'
              }];
            }
          }
        },
        wechat: { type: 'string', title: '微信' },
        photo: {
          type: 'string',
          title: '图片',
          ui: {
            widget: 'upload',
            action: '/accounts/file',
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
            listType: 'picture-card',
            change: (args) => {
              // console.log(args);
            }
          }
        },
      },
      required: ['username', 'role_id', 'password', 'nickName', 'phone', 'email'],
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
        this.modalTitle = `编辑 ${this.record.nickName} 用户信息`;
        this.http.get(`/accounts/${this.record.id}`).subscribe((res: any) => {
          this.i = {
            ...res.data,
            role_id: res.data.role.id,
          };
        });
      } else {
        this.modalTitle = this.title;
        this.i = {
          'appId': 'gslb',
          'companyId': '',
          'username': '',
          'phone': '',
          'role_id': '',
          'nickName': '',
          'wechat': '',
          'email': '',
          'password': '',
        };
      }
    }

    save(value: any) {
      // console.log(value);
      this.title ? this.addAccount(value) : this.updateAccount(value);
    }

    addAccount(value: any) {
      this.http.post(`/accounts`, value).subscribe(
        res => {
        // console.log(res);
          this.modal.close('onOk');
        },
        err => {
          console.log('abc');
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
