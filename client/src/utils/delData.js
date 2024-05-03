const delData = (ulr, id) => {
	return new Promise((resolve, reject) =>
		fetch(ulr, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}
export default delData	
	