import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ColourAtlaModalComponent } from './colour-atla-modal/colour-atla-modal.component';

@Component({
  selector: 'app-colour-atla',
  templateUrl: './colour-atla.component.html',
  styles: [
    ':host ::ng-deep .colorImg { width: 50px; height: 50px; }',
    ':host ::ng-deep .ant-table-tbody > tr > td { padding: 2px 8px }'
  ],
})
export class ColourAtlaComponent implements OnInit {
  previewImage = '';
  previewVisible = false;
  params: any = {};
  reqReName: any = {
    pi: 'page',
    ps: 'size'
  };
  resReName: any = {
    list: 'data',
    total: 'paging.count'
  };
  url = `/colors`;
  searchSchema: SFSchema = {
    properties: {
      searchTerm: {
        type: 'string',
        title: '查询'
      }
    }
  };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '名称', index: 'name'},
    { title: '类型',  index: 'type', },
    {
      title: '图片',
      buttons: [
        {
          text: '图片',
          click: (record: any) => this.handlePreview(record),
          format: (record: any) => `<img class="colorImg" src="${record.photo}">`
        }
      ]
    },
    { title: '表面加工处理', index: 'process'},
    { title: '单价(元)', type: 'number', index: 'unitPrice' },
    // { title: '备注', index: 'description' },
    {
      title: '操作',
      buttons: [
          {
              text: '删除',
              type: 'del',
              click: (recond: any) => {
                this.http.delete(`/colors/${recond.id}`).subscribe(
                  res => {
                    this.st.reload();
                    this.msgSrv.success('删除成功');
                  },
                  err => {
                    this.msgSrv.error('删除失败');
                  }
                );
              },
          },
          {
              text: '编辑',
              type: 'modal',
              component: ColourAtlaModalComponent,
              click: (record: any, modal: any) => {
                  if (modal === 'onOk') {
                    this.st.reload();
                    this.msgSrv.success('编辑保存成功');
                  } else if (modal === 'onError') {
                    this.msgSrv.error('编辑保存失败');
                  }
              },
              params: (record: any) => {
                  return {
                      material: record
                  };
              }
          }
        ]
      }
    ];

    constructor(
      private modalService: NzModalService,
      private msgSrv: NzMessageService,
      private http: _HttpClient,
    ) { }

    ngOnInit() { }

    submit(value: any) {
      console.log(JSON.stringify(value));
      this.params = value;
      this.st.reload();
    }
    reset() {
      this.params = {};
      this.st.reset();
    }

    showModal() {
      const modal = this.modalService.create({
        nzWidth: '70%',
        nzContent: ColourAtlaModalComponent,
        nzComponentParams: {
          title: '新增色卡',
        },
        nzFooter: null
      });
      modal.afterClose.subscribe(result => {
        // console.log(result);
        if (result === 'onOk') {
          this.st.reload();
          this.msgSrv.success('新增保存成功');
        } else if ( result === 'onError') {
          this.msgSrv.error('新增保存失败');
        }
      });
    }

    handlePreview = (record: any) => {
      this.previewImage = record.photo;
      this.previewVisible = true;
    }

}
