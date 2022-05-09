export const url = 'http://localhost:5000';
export const colors = ['rgb(186, 93, 7)', 'rgb(141, 103, 171)',
    'rgb(96, 129, 8)', 'rgb(220, 20, 140)',
    'rgb(39,133,106)', 'rgb(30,50,100)',
    'rgb(232,17,91)', 'rgb(215,242,125)',
    'rgb(140,25,50)']

export const AuthorizationHeaderConfig = {
    headers: {
        Authorization: '' + localStorage.getItem('token')
    }
}
