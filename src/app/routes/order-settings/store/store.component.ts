import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { StoreModalComponent } from './store-modal/store-modal.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  // styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

    params: any = {};
    reqReName: any = {
      pi: 'page',
      ps: 'size'
    };
    resReName: any = {
      list: 'data',
      total: 'paging.count'
    };
    url = `/stores`;
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
      { title: '名称', index: 'name' },
      { title: '运营负责人电话', index: 'ownerPhone' },
      { title: '运营负责人微信', index: 'ownerWechat' },
      { title: '地址', index: 'storeAddr' },
      { title: '描述', index: 'storeDescription' },
      { title: '客服负责人', index: 'accountModel.nick_name' },
      { title: '客服负责人电话', index: 'accountModel.phone' },
      { title: '客服负责人微信', index: 'accountModel.wechat' },
      {
        title: '操作',
        buttons: [
            {
                text: '删除',
                type: 'del',
                click: (recond: any) => {
                  this.http.delete(`/stores/${recond.id}`).subscribe(
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
                component: StoreModalComponent,
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

    showModal() {
      const modal = this.modalService.create({
        nzWidth: '70%',
        nzContent: StoreModalComponent,
        nzComponentParams: {
          title: '新增店铺',
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

}
