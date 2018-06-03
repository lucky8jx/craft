import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, SFSchemaEnumType } from '@delon/form';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

  @Component({
    selector: 'app-material-modal',
    templateUrl: './material-modal.component.html',
    // styleUrls: ['./material-modal.component.css']
  })
  export class MaterialModalComponent implements OnInit {
    @Input() title;
    modalTitle: string;
    record: any = {};
    i: any;
    type: any;
    schema: SFSchema = {
      properties: {
        name: { type: 'string', title: '材质/规格' },
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
        thick: {
          type: 'number',
          title: '厚度(mm)',
          ui: {
            addOnAfter: 'mm'
          }
        },
        unitWeight: { type: 'number', title: '单位重量(kg)' },
        unitPrice: { type: 'number', title: '单价(元)' },
        photo: {
          type: 'string',
          title: '图片',
          ui: {
            widget: 'upload',
            action: '/components/file',
            name: 'file',
            resReName: 'data.url',
            asyncData: () => {
              if (!this.title) {
                return this.http.get(`/components/${this.record.id}`).pipe(
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
              if (args.type === 'success') {

              }
              // console.log(args);
            }
          }
        },
        description: { type: 'string', title: '备注', maxLength: 140 },
      },
      required: ['name', 'type', 'thick', 'unitWeight', 'unitPrice'],
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
        console.log(this.title);
        this.modalTitle = `编辑 ${this.record.name} 材料信息`;
        this.http.get(`/components/${this.record.id}`).subscribe((res: any) => {
          this.i = res.data;
        });
      } else {
        this.modalTitle = this.title;
        this.i = {
          'name': '',
          'description': '',
          'photo': '',
          'type': null,
          'unitPrice': null,
          'unitWeight': null,
          'thick': null,
        };
      }
    }

    save(value: any) {
      this.title ? this.addMaterial(value) : this.updateMaterial(value);
    }

    addMaterial(value: any) {
      console.log(value);
      this.http.post(`/components`, value).subscribe(
        res => {
        // console.log(res);
          this.modal.close('onOk');
        },
        err => {
          this.modal.close('onError');
        }
      );
    }

    updateMaterial(value: any) {
      // console.log(value);
      this.http.put(`/components/${this.record.id}`, value).subscribe(
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
