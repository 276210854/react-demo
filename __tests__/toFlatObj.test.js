// import { toFlatObj } from '../src/utils/tool';

const toFlatObj = (tree, parentId = []) => {
	let obj = {}
	tree.forEach(item => {
		obj[item.id] = {...item, parentIds: parentId}
		if (item?.children?.length) {
			obj = {...obj, ...toFlatObj(item.children, [...parentId, item.id])}
		}
	})
	
	return obj
}
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
                      children: [
                        {
                            name: 'AuditComposition1',
                            id: '31',
                            children: [
                              {
                                  name: 'AuditComposition2',
                                  id: '311',
                              },
                            ]
                        },
                      ]
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
test('toFlatObj format', () => {
  expect(JSON.stringify(toFlatObj(OriginList, []))).toBe('{"1":{"name":"My Data","id":"1","children":[{"name":"DeviceReach-ppid","id":"2","children":[{"name":"AuditComposition","id":"3","children":[{"name":"AuditComposition1","id":"31","children":[{"name":"AuditComposition2","id":"311"}]}]},{"name":"Age","id":"4"},{"name":"Education","id":"5"},{"name":"Gender","id":"6"},{"name":"PresenceofChild","id":"7"}]}],"parentIds":[]},"2":{"name":"DeviceReach-ppid","id":"2","children":[{"name":"AuditComposition","id":"3","children":[{"name":"AuditComposition1","id":"31","children":[{"name":"AuditComposition2","id":"311"}]}]},{"name":"Age","id":"4"},{"name":"Education","id":"5"},{"name":"Gender","id":"6"},{"name":"PresenceofChild","id":"7"}],"parentIds":["1"]},"3":{"name":"AuditComposition","id":"3","children":[{"name":"AuditComposition1","id":"31","children":[{"name":"AuditComposition2","id":"311"}]}],"parentIds":["1","2"]},"4":{"name":"Age","id":"4","parentIds":["1","2"]},"5":{"name":"Education","id":"5","parentIds":["1","2"]},"6":{"name":"Gender","id":"6","parentIds":["1","2"]},"7":{"name":"PresenceofChild","id":"7","parentIds":["1","2"]},"8":{"name":"Analytics Enviroment Data","id":"8","children":[{"name":"name","id":"9"}],"parentIds":[]},"9":{"name":"name","id":"9","parentIds":["8"]},"10":{"name":"Saved Audiences","id":"10","children":[{"name":"male","id":"11"}],"parentIds":[]},"11":{"name":"male","id":"11","parentIds":["10"]},"12":{"name":"Lookalike Group","id":"12","children":[{"name":"new","id":"13"}],"parentIds":[]},"13":{"name":"new","id":"13","parentIds":["12"]},"31":{"name":"AuditComposition1","id":"31","children":[{"name":"AuditComposition2","id":"311"}],"parentIds":["1","2","3"]},"311":{"name":"AuditComposition2","id":"311","parentIds":["1","2","3","31"]}}');
});