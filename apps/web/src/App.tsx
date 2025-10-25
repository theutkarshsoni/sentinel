import { useEffect, useState } from 'react';
import { api } from './api';

type Template = { 
  key: string; 
  name: string; 
  paramsSchema: any 
};

type RequestRow = {
  id: string; 
  env: 'DEV'|'STAGE'|'PROD'; 
  status: string; 
  params: any;
  template: { name: string }; 
  createdBy: { name: string }
};

export default function App() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [form, setForm] = useState({ templateKey: 'preview-env', env: 'DEV', branch: '', ttlHours: 24 });

  const loadData = async () => {
    const [td, rd] = await Promise.all([
      api.get('/templates'), 
      api.get('/requests')
    ]);
    setTemplates(td.data);
    setRequests(rd.data);
  };

  useEffect(() => { 
    loadData(); 
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/requests', {
      templateKey: form.templateKey,
      env: form.env,
      params: { branch: form.branch, ttlHours: Number(form.ttlHours) }
    });
    setForm({ ...form, branch: '' });
    await loadData();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-8">
      <h1 className="text-2xl font-bold">Sentinel — Requests</h1>

      <form onSubmit={create} className="bg-white p-4 rounded-xl shadow flex gap-4 items-end">
        <div>
          <label className="block text-sm">Template</label>
          <select 
            className="border rounded p-2"
            value={form.templateKey}
            onChange={e => setForm({...form, templateKey:e.target.value})}
          >
            {templates.map(t => <option key={t.key} value={t.key}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm">Env</label>
          <select 
            className="border rounded p-2"
            value={form.env}
            onChange={e => setForm({...form, env: e.target.value as any})}
          >
            <option>DEV</option>
            <option>STAGE</option>  
            <option>PROD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Branch</label>
          <input 
            className="border rounded p-2" 
            placeholder="feature/checkout"
            value={form.branch} 
            onChange={e => setForm({...form, branch:e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm">TTL (hours)</label>
          <input 
            type="number" 
            className="border rounded p-2 w-24"
            value={form.ttlHours} 
            onChange={e => setForm({...form, ttlHours:Number(e.target.value)})}
          />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg">Create</button>
      </form>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="p-3">ID</th><th>Template</th><th>Env</th><th>Status</th><th>Params</th><th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-3 text-xs text-gray-500">{r.id.slice(0,8)}</td>
                <td>{r.template.name}</td>
                <td><span className="px-2 py-1 text-xs rounded bg-slate-100">{r.env}</span></td>
                <td><span className="px-2 py-1 text-xs rounded bg-amber-100">{r.status}</span></td>
                <td><code className="text-xs">{JSON.stringify(r.params)}</code></td>
                <td>{r.createdBy.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
