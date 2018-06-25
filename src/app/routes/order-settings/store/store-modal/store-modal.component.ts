import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, FormProperty, PropertyGroup } from '@delon/form';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

  @Component({
    selector: 'app-store-modal',
    templateUrl: './store-modal.component.html',
    // styleUrls: ['./store-modal.component.css']
  })
  export class StoreModalComponent implements OnInit {
    @Input() title;
    modalTitle: string;
    record: any = {};
    i: any;
    schema: SFSchema = {
      properties: {
        name: { type: 'string', title: '名称' },
        storeType: {
          type: 'string',
          title: '店铺类型',
          ui: {
            widget: 'select',
            asyncData: () => this.http.get('/codes/store/type').pipe(
              map((item: any) => {
                return item.data.map(type => {
                  return {
                    label: type.name,
                    value: type.value
                  };
                });
              })
            )
          },
        },
        ownerPhone: {
          type: 'string',
          title: '负责人电话',
          ui: {
            validator: (value: any, formProperty: FormProperty, form: PropertyGroup) => {
              return value.length === 11 ? [] : [{
                keyword: 'lengthEqEleven',
                message: '手机号码需为11位'
              }];
            }
          }
        },
        ownerWechat: { type: 'string', title: '负责人微信' },
        storeAddr: { type: 'string', title: '地址' },
        storeDescription: { type: 'string', title: '描述' },
        accountId: {
          type: 'string',
          title: '客服负责人',
          ui: {
            widget: 'select',
            asyncData: () => this.http.get('/accounts/role?roleName=customer_service').pipe(
              map((item: any) => {
                return item.data.map(account => {
                  return {
                    label: account.nickName,
                    value: account.id
                  };
                });
              })
            )
          },
        },
      },
      required: ['name', 'storeType', 'ownerPhone', 'accountId'],
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
        this.modalTitle = `编辑 ${this.record.name} 店铺信息`;
        this.http.get(`/stores/${this.record.id}`).subscribe((res: any) => (this.i = res.data));
      } else {
        this.modalTitle = this.title;
        this.i = {
          'name': '',
          'ownerPhone': '',
          'ownerWechat': '',
          'accountId': null,
        };
      }
    }

    save(value: any) {
      this.title ? this.addStore(value) : this.updateStore(value);
    }

    addStore(value: any) {
      // console.log(value);
      this.http.post(`/stores`, value).subscribe(
        res => {
        // console.log(res);
          this.modal.close('onOk');
        },
        err => {
          this.modal.close('onError');
        }
      );
    }

    updateStore(value: any) {
      this.http.put(`/stores/${this.record.id}`, value).subscribe(
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
