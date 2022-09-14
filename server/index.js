// 引入express模块
var express = require('express');
const bodyParser = require('body-parser')
var app = express();
// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置跨域请求
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    //用于判断request来自ajax还是传统请求
    res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    //修改程序信息与版本
    res.header('X-Powered-By', ' 3.2.1')
    //post请求必须指定这个属性
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})
app.get('/getList', function(request, response) { 
    // 返回数据
    const OriginList = [
        {
            name: 'My Data',
            id: "1",
            children: [
                {
                    name: 'DeviceReach-ppid',
                    id: '2',
                    children: [
                        {
                            name: 'AuditComposition',
                            id: '3',
                        },
                        {
                            name: 'Age',
                            id: '4',
                        },
                        {
                            name: 'Education',
                            id: '5',
                        },
                        {
                            name: 'Gender',
                            id: '6',
                        },
                        {
                            name: 'PresenceofChild',
                            id: '7',
                        }
                    ]
                },
            ]
        },
        {
            name: 'Analytics Enviroment Data',
            id: '8',
            children: [
                {
                    name: 'name',
                    id: '9',
                }
            ]
        },
        {
            name: 'Saved Audiences',
            id: '10',
            children: [
                {
                    name: 'male',
                    id: '11',
                }
            ]
        },
        {
            name: 'Lookalike Group',
            id: '12',
            children: [
                {
                    name: 'new',
                    id: '13',
                }
            ]
        }
    ]
    response.send({
        ErrorCode: 0,
        ErrorMsg: '',
        Result: OriginList
    })
})
app.post('/getDetailById', function(request, response) {
    const obj = {
        '3': [
            {
                name: 'asd',
                value: '121'
            },
            {
                name: 'wqe',
                value: '1221'
            },
            {
                name: 'ret',
                value: '22'
            },
            {
                name: 'vcb',
                value: '33'
            }
        ],
        '4': [
            {
                name: 'asds',
                value: '1212'
            },
            {
                name: 'wqase',
                value: '12212'
            },
            {
                name: 'rsdet',
                value: '1222'
            },
            {
                name: 'vadcb',
                value: '323'
            }
        ],
        '5': [
            {
                name: 'assdad',
                value: '11221'
            },
            {
                name: 'wqasde',
                value: '12221'
            },
            {
                name: 'radet',
                value: '232'
            },
            {
                name: 'vadfcb',
                value: '3123'
            }
        ],
        '6': [
            {
                name: 'asd',
                value: '121'
            },
            {
                name: 'wqe',
                value: '1221'
            },
            {
                name: 'ret',
                value: '22'
            },
            {
                name: 'vcb',
                value: '33'
            }
        ],
        '7': [
            {
                name: 'asd',
                value: '121'
            },
            {
                name: 'wqe',
                value: '1221'
            },
            {
                name: 'ret',
                value: '22'
            },
            {
                name: 'vcb',
                value: '33'
            }
        ],
        '9': [
            {
                name: 'asd',
                value: '121'
            },
            {
                name: 'wqe',
                value: '1221'
            },
            {
                name: 'ret',
                value: '22'
            },
            {
                name: 'vcb',
                value: '33'
            }
        ],
        '11': [
            {
                name: 'asd',
                value: '121'
            },
            {
                name: 'wqe',
                value: '1221'
            },
            {
                name: 'ret',
                value: '22'
            },
            {
                name: 'vcb',
                value: '33'
            }
        ],
        '13': [
            {
                name: 'asd',
                value: '121'
            },
            {
                name: 'wqe',
                value: '1221'
            },
            {
                name: 'ret',
                value: '22'
            },
            {
                name: 'vcb',
                value: '33'
            }
        ],
    }
    const body = request.body
    if(!body || !body.id) {
        response.send({
            ErrorCode: 1001,
            ErrorMsg: '缺少参数',
            Result: null
        })
    } else if (obj[body.id]) {
        response.send({
            ErrorCode: 0,
            ErrorMsg: '',
            Result: obj[body.id]
        })
    } else{
        response.send({
            ErrorCode: 1002,
            ErrorMsg: '找不到数据',
            Result: null
        })
    }
})
// 打开端口
var server = app.listen(8088, function() {
    console.log("我的第一个接口")
})