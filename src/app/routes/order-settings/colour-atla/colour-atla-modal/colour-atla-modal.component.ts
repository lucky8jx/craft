import { Component, Input, OnInit, ViewChild } from '@angular/core';
  import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
  import { _HttpClient } from '@delon/theme';
  import { SFSchema, SFUISchema } from '@delon/form';

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
        extra: { type: 'string', title: '表面加工处理' },
        unitPrice: { type: 'number', title: '单价(元)' },
        photo: {
          type: 'string',
          title: '图片',
          ui: {
            widget: 'upload',
            action: '/colours/file',
            name: 'file',
            resReName: 'data',
            change: (args) => {
              console.log(args);
            }
          }
        },
        description: { type: 'string', title: '备注', maxLength: 140 },
      },
      required: ['name', 'type', 'photo'],
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
        this.http.get(`/colours/${this.record.id}`).subscribe((res: any) => (this.i = res.data));
      } else {
        this.modalTitle = this.title;
        this.i = {
          'name': '',
          'description': '',
          'photo': '',
          'type': null,
          'unitPrice': null,
          'extra': '',
        };
      }
    }

    save(value: any) {
      this.title ? this.addColourAtla(value) : this.updateColourAtla(value);
    }

    addColourAtla(value: any) {
      console.log(value);
      this.http.post(`/colours`, value).subscribe(
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
      this.http.put(`/colours/${this.record.id}`, value).subscribe(
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
