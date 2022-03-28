import { TOKEN, API } from './index';

export const fetchOrder = orderId => {
    return fetch(`${API}/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
    })
    .catch(err => err);
}