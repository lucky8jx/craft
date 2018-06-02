import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

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
    schema: SFSchema = {
      properties: {
        name: { type: 'string', title: '材质/规格' },
        type: {
          type: 'number',
          title: '类型',
          enum: [
            { label: '铁', value: 0 },
            { label: '木板', value: 1 },
            { label: '玻璃', value: 2 },
            { label: '大理石', value: 3 },
            { label: '纸箱', value: 4 },
            { label: '皮垫', value: 5 },
          ],
          ui: {
            widget: 'select'
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
            resReName: 'data',
            change: (args) => {
              console.log(args);
            }
          }
        },
        description: { type: 'string', title: '备注', maxLength: 140 },
      },
      required: ['name', 'type', 'href'],
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
        this.modalTitle = `编辑 ${this.record.name} 材料信息`;
        this.http.get(`/components/${this.record.id}`).subscribe((res: any) => (this.i = res.data));
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
