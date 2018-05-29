import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { MaterialModalComponent } from './material-modal/material-modal.component';
import { NzModalService } from 'ng-zorro-antd';
// import { SFSchema } from 'nz-schema-form';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styles: [
    ':host ::ng-deep .materialImg { width: 50px; height: 50px; }',
    ':host ::ng-deep .ant-table-tbody > tr > td { padding: 2px 8px }'
  ],
})
export class MaterialComponent implements OnInit {
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
  url = `craft/componentInfo`;
  // searchSchema: SFSchema = {
  //   properties: {
  //     no: {
  //       type: 'string',
  //       title: '编号'
  //     }
  //   }
  // };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    // { title: '编号', index: 'no' },
    { title: '材质/规格', index: 'name'},
    { title: '类型', index: 'type' },
    {
      title: '图片',
      buttons: [
        {
          text: '图片',
          click: (record: any) => this.handlePreview(record),
          format: (record: any) => `<img class="materialImg" src="${record.photo}">`
        }
      ]
    },
    { title: '厚度(mm)', type: 'number', index: 'thick'},
    { title: '单位重量(kg)', type: 'number', index: 'unitWeight' },
    { title: '单价(元)', type: 'number', index: 'unitPrice' },
    // { title: '备注', index: 'description' },
    {
      title: '操作',
      buttons: [
          {
              text: '删除',
              type: 'del',
              click: (recond: any) => console.log('删除成功'),
          },
          {
              text: '编辑',
              type: 'modal',
              component: MaterialModalComponent,
              click: (record: any, modal: any) => {
                  console.log(modal);
                  if (modal === 'onOk') {
                      // this.getMaterialList();
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
    private http: _HttpClient
  ) { }

  ngOnInit() { }

  showModal() {
    const modal = this.modalService.create({
      // nzTitle: 'Modal Title',
      nzWidth: '70%',
      nzContent: MaterialModalComponent,
      nzComponentParams: {
        title: '新增材料',
      },
      nzFooter: null
    });
  }

  handlePreview = (record: any) => {
    this.previewImage = record.photo;
    this.previewVisible = true;
  }

}
