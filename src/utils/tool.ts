export const wrapperawait = (promise) => {
    return promise.then(res => [null, res]).catch(err => [err, null])
}

//复杂数组扁平转成obj，便于字典查询，新增key parentIds
export const toFlatObj = (tree, parentId = []) => {
	let obj = {}
	tree.forEach(item => {
		obj[item.id] = {...item, parentIds: parentId}
		if (item?.children?.length) {
			obj = {...obj, ...toFlatObj(item.children, [...parentId, item.id])}
		}
	})
	
	return obj
}