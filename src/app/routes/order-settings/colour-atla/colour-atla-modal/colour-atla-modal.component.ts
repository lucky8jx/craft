import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

  @Component({
    selector: 'app-colour-atla-modal',
    templateUrl: './colour-atla-modal.component.html',
    // styleUrls: ['./colour-atla-modal.component.css']
  })
  export class ColourAtlaModalComponent implements OnInit {
    @Input() title;
    modalTitle: string;
    record: any = {};
    i: any;
    schema: SFSchema = {
      properties: {
        name: { type: 'string', title: '名称' },
        type: {
          type: 'string',
          title: '类型',
          ui: {
            widget: 'select',
            asyncData: () => this.http.get('/codes/component/type').pipe(
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
        process: { type: 'string', title: '表面加工处理' },
        unitPrice: { type: 'number', title: '单价(元)' },
        photo: {
          type: 'string',
          title: '图片',
          ui: {
            widget: 'upload',
            action: '/colors/file',
            name: 'file',
            resReName: 'data.url',
            asyncData: () => {
              if (!this.title) {
                return this.http.get(`/colors/${this.record.id}`).pipe(
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
        description: { type: 'string', title: '备注', maxLength: 140 },
      },
      required: ['name', 'type', 'photo', 'process', 'unitPrice'],
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
        this.modalTitle = `编辑 ${this.record.name} 色卡信息`;
        this.http.get(`/colors/${this.record.id}`).subscribe((res: any) => (this.i = res.data));
      } else {
        this.modalTitle = this.title;
        this.i = {
          'name': '',
          'description': '',
          'photo': '',
          'type': null,
          'unitPrice': null,
          'process': '',
        };
      }
    }

    save(value: any) {
      this.title ? this.addColourAtla(value) : this.updateColourAtla(value);
    }

    addColourAtla(value: any) {
      // console.log(value);
      this.http.post(`/colors`, value).subscribe(
        res => {
        // console.log(res);
          this.modal.close('onOk');
        },
        err => {
          this.modal.close('onError');
        }
      );
    }

    updateColourAtla(value: any) {
      this.http.put(`/colors/${this.record.id}`, value).subscribe(
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
