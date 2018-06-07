import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AccountModalComponent } from './account-modal/account-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  // styleUrls: ['./account.component.css']
  styles: [
    ':host ::ng-deep .avatar { width: 50px; height: 50px; }',
    ':host ::ng-deep .ant-table-tbody > tr > td { padding: 2px 8px }'
  ],
})
export class AccountComponent implements OnInit {
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
  url = `/accounts`;
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
    { title: '用户名', index: 'username' },
    { title: '昵称', index: 'nickname' },
    {
      title: '头像',
      buttons: [
        {
          text: '头像',
          click: (record: any) => this.handlePreview(record),
          format: (record: any) => `<img class="avatar" src="${record.photo}">`
        }
      ]
    },
    { title: '角色', index: 'role' },
    { title: '电话', index: 'phone' },
    { title: '微信', index: 'wechat' },
    {
      title: '操作',
      buttons: [
          {
              text: '删除',
              type: 'del',
              click: (recond: any) => {
                this.http.delete(`/accounts/${recond.id}`).subscribe(
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
              component: AccountModalComponent,
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
    private http: _HttpClient
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
      nzContent: AccountModalComponent,
      nzComponentParams: {
        title: '新增用户',
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
