import { MockRequest, MockStatusError } from '@delon/mock';

function genData(qs: any) {
    console.log(qs);
    if (qs.page === 1 && qs.size === 2) {
        return {
            'data': [{
                'id': '0a195589-81c5-409d-a390-e4c4a541a64f',
                'validFlag': 1,
                'remark': null,
                'domain': '0',
                'sort': -2147483648,
                'name': 'fadsf',
                'description': 'fdasfasdf',
                'photo': '/assets/tmp/img/avatar.jpg',
                'type': '3',
                'isUse': '1',
                'unitPrice': null,
                'unitWeight': 3.0,
                'thick': 1,
                'companyId': '3',
                'validFlagName': 'validFlag',
                'domainName': 'domain',
                'createdAt': '2018-05-19 22:00:48',
                'createdBy': '',
                'updatedAt': '2018-05-19 22:00:48',
                'updatedBy': ''
            }, {
                'id': '27c5baec-7405-4b84-91a1-44f2dd7cb91b',
                'validFlag': 1,
                'remark': null,
                'domain': '0',
                'sort': -2147483648,
                'name': 'fadsf',
                'description': 'fdasfasdf',
                'photo': '/assets/tmp/img/avatar.jpg',
                'type': '2',
                'isUse': '1',
                'unitPrice': 33.2,
                'unitWeight': 65.3,
                'thick': 63.0,
                'companyId': '3',
                'validFlagName': 'validFlag',
                'domainName': 'domain',
                'createdAt': '2018-05-20 12:24:46',
                'createdBy': '',
                'updatedAt': '2018-05-20 12:24:46',
                'updatedBy': ''
            }],
            'message': 'ok',
            'code': '200',
            'success': true,
            'paging': {
                'count': 3,
                'page': 1,
                'pageSize': 2,
                'pages': 2
            }
        };
    } else {
        return {
            'data': [{
                'id': '35a0a11e-f635-410d-a6ad-f0af1bc69ea6',
                'validFlag': 1,
                'remark': null,
                'domain': '0',
                'sort': -2147483648,
                'name': 'fadsf',
                'description': 'fdasfasdf',
                'photo': '/assets/tmp/img/avatar.jpg',
                'type': '1',
                'isUse': '1',
                'unitPrice': null,
                'unitWeight': 3.0,
                'thick': 2,
                'companyId': '3',
                'validFlagName': 'validFlag',
                'domainName': 'domain',
                'createdAt': '2018-05-19 22:00:39',
                'createdBy': '',
                'updatedAt': '2018-05-19 22:00:39',
                'updatedBy': ''
            }],
            'message': 'ok',
            'code': '200',
            'success': true,
            'paging': {
                'count': 3,
                'page': 2,
                'pageSize': 2,
                'pages': 2
            }
        };
    }
}

function getComponentInfoById(id: any) {
    return [
        {
            'id': '35a0a11e-f635-410d-a6ad-f0af1bc69ea6',
            'validFlag': 1,
            'remark': null,
            'domain': '0',
            'sort': -2147483648,
            'name': 'fadsf',
            'description': 'fdasfasdf',
            'photo': '/assets/tmp/img/avatar.jpg',
            'type': 1,
            'isUse': '1',
            'unitPrice': null,
            'unitWeight': 3.0,
            'thick': 2,
            'companyId': '3',
            'validFlagName': 'validFlag',
            'domainName': 'domain',
            'createdAt': '2018-05-19 22:00:39',
            'createdBy': '',
            'updatedAt': '2018-05-19 22:00:39',
            'updatedBy': ''
        },
        {
            'id': '0a195589-81c5-409d-a390-e4c4a541a64f',
            'validFlag': 1,
            'remark': null,
            'domain': '0',
            'sort': -2147483648,
            'name': 'fadsf',
            'description': 'fdasfasdf',
            'photo': '/assets/tmp/img/avatar.jpg',
            'type': 3,
            'isUse': '1',
            'unitPrice': null,
            'unitWeight': 3.0,
            'thick': 1,
            'companyId': '3',
            'validFlagName': 'validFlag',
            'domainName': 'domain',
            'createdAt': '2018-05-19 22:00:48',
            'createdBy': '',
            'updatedAt': '2018-05-19 22:00:48',
            'updatedBy': ''
        }, {
            'id': '27c5baec-7405-4b84-91a1-44f2dd7cb91b',
            'validFlag': 1,
            'remark': null,
            'domain': '0',
            'sort': -2147483648,
            'name': 'fadsf',
            'description': 'fdasfasdf',
            'photo': '/assets/tmp/img/avatar.jpg',
            'type': 2,
            'isUse': '1',
            'unitPrice': 33.2,
            'unitWeight': 65.3,
            'thick': 63.0,
            'companyId': '3',
            'validFlagName': 'validFlag',
            'domainName': 'domain',
            'createdAt': '2018-05-20 12:24:46',
            'createdBy': '',
            'updatedAt': '2018-05-20 12:24:46',
            'updatedBy': ''
        }
    ].filter(item => item.id === id)[0];
}

export const MATARIAL = {
    'craft/componentInfo': (req: MockRequest) => genData(req.queryString),
    'craft/componentInfo/:id': (req: MockRequest) => getComponentInfoById(req.params.id),
};
