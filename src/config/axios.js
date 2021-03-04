import axios from 'axios';


const clienteAxios = axios.create({
	baseURL: 'https://squmntyfx2.execute-api.us-east-1.amazonaws.com/'
});

export default clienteAxios;