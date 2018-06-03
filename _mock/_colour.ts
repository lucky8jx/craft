import { MockRequest, MockStatusError } from '@delon/mock';

function getData(qs: any) {
    if (qs.page === 1 && qs.size === 2) {
        return {
            'code': '200',
            'message': 'ok',
            'paging': {
                'count': 3,
                'page': 1,
                'page_size': 10,
                'pages': 2
            },
            'success': true,
            'data': [
                {
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
                    'unitPrice': 4,
                    'extra': 'abc',
                    'companyId': '3',
                    'validFlagName': 'validFlag',
                    'domainName': 'domain',
                    'createdAt': '2018-05-19 22:00:48',
                    'createdBy': '',
                    'updatedAt': '2018-05-19 22:00:48',
                    'updatedBy': ''
                },
                {
                    'id': '27c5baec-7405-4b84-91a1-44f2dd7cb91b',
                    'validFlag': 1,
                    'remark': null,
                    'domain': '0',
                    'sort': -2147483648,
                    'name': 'fadsf',
                    'description': 'fdasfasdf',
                    'photo': '/assets/tmp/img/avatar.jpg',
                    'type': '3',
                    'isUse': '1',
                    'unitPrice': 4,
                    'extra': 'abc',
                    'companyId': '3',
                    'validFlagName': 'validFlag',
                    'domainName': 'domain',
                    'createdAt': '2018-05-19 22:00:48',
                    'createdBy': '',
                    'updatedAt': '2018-05-19 22:00:48',
                    'updatedBy': ''
                },
            ]
        };
    } else {
        return {
            'code': '200',
            'message': 'ok',
            'paging': {
                'count': 3,
                'page': 1,
                'page_size': 10,
                'pages': 2
            },
            'success': true,
            'data': [
                {
                    'id': '35a0a11e-f635-410d-a6ad-f0af1bc69ea6',
                    'validFlag': 1,
                    'remark': null,
                    'domain': '0',
                    'sort': -2147483648,
                    'name': 'fadsf',
                    'description': 'fdasfasdf',
                    'photo': '/assets/tmp/img/avatar.jpg',
                    'type': '3',
                    'isUse': '1',
                    'unitPrice': 4,
                    'extra': 'abc',
                    'companyId': '3',
                    'validFlagName': 'validFlag',
                    'domainName': 'domain',
                    'createdAt': '2018-05-19 22:00:48',
                    'createdBy': '',
                    'updatedAt': '2018-05-19 22:00:48',
                    'updatedBy': ''
                },
            ]
        };
    }
}

function getColourById (id: string) {
    return [
        {
            'code': '200',
            'message': 'ok',
            'paging': null,
            'success': true,
            'data': {
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
                'unitPrice': 4,
                'extra': 'abc',
                'companyId': '3',
                'validFlagName': 'validFlag',
                'domainName': 'domain',
                'createdAt': '2018-05-19 22:00:48',
                'createdBy': '',
                'updatedAt': '2018-05-19 22:00:48',
                'updatedBy': ''
            }
        },
        {
            'code': '200',
            'message': 'ok',
            'paging': null,
            'success': true,
            'data': {
                'id': '27c5baec-7405-4b84-91a1-44f2dd7cb91b',
                'validFlag': 1,
                'remark': null,
                'domain': '0',
                'sort': -2147483648,
                'name': 'fadsf',
                'description': 'fdasfasdf',
                'photo': '/assets/tmp/img/avatar.jpg',
                'type': '3',
                'isUse': '1',
                'unitPrice': 4,
                'extra': 'abc',
                'companyId': '3',
                'validFlagName': 'validFlag',
                'domainName': 'domain',
                'createdAt': '2018-05-19 22:00:48',
                'createdBy': '',
                'updatedAt': '2018-05-19 22:00:48',
                'updatedBy': ''
            }
        },
        {
            'code': '200',
            'message': 'ok',
            'paging': null,
            'success': true,
            'data': {
                'id': '35a0a11e-f635-410d-a6ad-f0af1bc69ea6',
                'validFlag': 1,
                'remark': null,
                'domain': '0',
                'sort': -2147483648,
                'name': 'fadsf',
                'description': 'fdasfasdf',
                'photo': '/assets/tmp/img/avatar.jpg',
                'type': '3',
                'isUse': '1',
                'unitPrice': 4,
                'extra': 'abc',
                'companyId': '3',
                'validFlagName': 'validFlag',
                'domainName': 'domain',
                'createdAt': '2018-05-19 22:00:48',
                'createdBy': '',
                'updatedAt': '2018-05-19 22:00:48',
                'updatedBy': ''
            }
        },
    ].filter(item => item.data.id === id)[0];
}

export const COLOUR = {
    'GET colours': (req: MockRequest) => getData(req.queryString),
    'GET colours/:id': (req: MockRequest) => getColourById(req.params.id),
    // 'POST /craft/componentInfo': (req: MockRequest) => addMaterial()
};
