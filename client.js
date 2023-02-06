
fetch('http://localhost:3001/login', {
  method: 'POST', // or 'PUT'
})
  .then((response) => response.headers.get('auth-token'))
  .then((response) => {
    console.log('Success:', response);
    const token = data;
    fetch('http://localhost:3001/peticion',{
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    })
    .then(response => {
        return response.json()
    })
    .then(response =>{
        console.log(response)
    })
  })
  .catch((error) => {
    console.error('Error:', error);
  });


