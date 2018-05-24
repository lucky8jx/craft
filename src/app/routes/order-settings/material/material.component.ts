import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
// import { SFSchema } from 'nz-schema-form';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  // styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
    params: any = {};
    reqReName: any = {
      pi: 'page',
      ps: 'size'
    };
    resReName: any = {
      list: 'data',
      total: 'paging.count'
    };
    url = `/craft/componentInfo`;
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
      { title: '图片', type: 'img', width: '50px', index: 'photo' },
      { title: '厚度(mm)', type: 'number', index: 'thick'},
      { title: '单位重量(kg)', type: 'number', index: 'unitWeight' },
      { title: '单价(元)', type: 'number', index: 'unitPrice' },
      { title: '备注', index: 'remark' },
      {
        title: '',
        buttons: [
          // { text: '查看', click: (item: any) => this.router.navigateByUrl(`/form/${item.id}`) },
          // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
        ]
      }
    ];

    constructor(private http: _HttpClient) { }

    ngOnInit() { }

}
