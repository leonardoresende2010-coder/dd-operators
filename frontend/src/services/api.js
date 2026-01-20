const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const config = { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } };
    if (token) config.headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API_URL}${endpoint}`, config);
    if (response.status === 401) { localStorage.clear(); window.location.reload(); }
    return response;
}

export const authAPI = {
    async login(email, password) {
        const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
    },
    async register(email, password, nome_empresa) {
        const res = await fetch(`${API_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, nome_empresa }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
    },
    async me() {
        const res = await fetchWithAuth('/auth/me');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
    }
};

export const respostasAPI = {
    async get() { const res = await fetchWithAuth('/respostas'); return res.json(); },
    async saveSecao(numero, dados) { const res = await fetchWithAuth(`/respostas/secao/${numero}`, { method: 'PUT', body: JSON.stringify({ dados }) }); return res.json(); },
    async finalizar() { const res = await fetchWithAuth('/respostas/finalizar', { method: 'PUT' }); return res.json(); },
    async reabrir() { const res = await fetchWithAuth('/respostas/reabrir', { method: 'PUT' }); return res.json(); }
};

export const uploadAPI = {
    async upload(file, categoria) {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('categoria', categoria);
        const res = await fetch(`${API_URL}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
        return res.json();
    },
    async list() { const res = await fetchWithAuth('/upload'); return res.json(); },
    async remove(id) { const res = await fetchWithAuth(`/upload/${id}`, { method: 'DELETE' }); return res.json(); }
};

export const adminAPI = {
    async getOperadores() { const res = await fetchWithAuth('/admin/operadores'); return res.json(); },
    async getOperador(id) { const res = await fetchWithAuth(`/admin/operadores/${id}`); return res.json(); },
    async updateStatus(id, status) { const res = await fetchWithAuth(`/admin/operadores/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }); return res.json(); },
    async getEstatisticas() { const res = await fetchWithAuth('/admin/estatisticas'); return res.json(); }
};
