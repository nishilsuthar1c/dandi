"use client";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function Dashboards() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [newName, setNewName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", value: "" });
  const [showKeyIdx, setShowKeyIdx] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch API keys from Supabase
  useEffect(() => {
    const fetchKeys = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("api_keys")
        .select("id, name, value, useage, created_at");
      if (error) setError(error.message);
      else setApiKeys(data || []);
      setLoading(false);
    };
    fetchKeys();
  }, []);

  // Add new API key
  const handleAdd = async () => {
    if (newValue.trim() && newName.trim()) {
      setLoading(true);
      const { data, error } = await supabase
        .from("api_keys")
        .insert([{ name: newName.trim(), value: newValue.trim(), useage: 0 }])
        .select();
      if (error) setError(error.message);
      else setApiKeys([...apiKeys, ...(data || [])]);
      setNewValue("");
      setNewName("");
      setLoading(false);
    }
  };

  // Delete API key
  const handleDelete = async (idx) => {
    const key = apiKeys[idx];
    setLoading(true);
    const { error } = await supabase
      .from("api_keys")
      .delete()
      .eq("id", key.id);
    if (error) setError(error.message);
    else setApiKeys(apiKeys.filter((_, i) => i !== idx));
    setLoading(false);
  };

  // Edit API key
  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditData({
      name: apiKeys[idx].name,
      value: apiKeys[idx].value,
    });
  };

  // Update API key
  const handleUpdate = async () => {
    const key = apiKeys[editIndex];
    setLoading(true);
    const { data, error } = await supabase
      .from("api_keys")
      .update({ name: editData.name, value: editData.value })
      .eq("id", key.id)
      .select();
    if (error) setError(error.message);
    else setApiKeys(apiKeys.map((k, i) => (i === editIndex ? { ...k, ...editData } : k)));
    setEditIndex(null);
    setEditData({ name: "", value: "" });
    setLoading(false);
  };

  const handleToggleShow = (idx) => {
    setShowKeyIdx(showKeyIdx === idx ? null : idx);
  };
  const handleCopy = async (value, idx) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1000);
    } catch (e) {}
  };

  // Replace handleDelete to open modal
  const handleDeleteClick = (idx) => {
    setDeleteIdx(idx);
    setShowDeleteModal(true);
  };
  // Confirm delete
  const confirmDelete = async () => {
    if (deleteIdx !== null) {
      await handleDelete(deleteIdx);
      setShowDeleteModal(false);
      setDeleteIdx(null);
    }
  };
  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteIdx(null);
  };

  // Sidebar links
  const sidebarLinks = [
    { name: "Overview", href: "/dashboards" },
    { name: "API Playground", href: "/api-playground" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Billing", href: "/billing" },
    { name: "Settings", href: "/settings" },
    { name: "Documentation", href: "/docs" },
    { name: "Tavily MCP", href: "/mcp" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar toggle button (always visible) */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded bg-white shadow hover:bg-gray-100 md:block"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" /></svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r flex flex-col min-h-screen p-6 transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 p-2 rounded hover:bg-gray-100"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center gap-2 mb-8 mt-2 justify-center">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-xl text-white">T</div>
          {!sidebarCollapsed && <span className="font-bold text-lg">tavily</span>}
        </div>
        {!sidebarCollapsed && (
          <nav className="flex-1">
            <ul className="space-y-2">
              {sidebarLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-2 py-2 rounded transition-colors font-medium ${link.href === '/dashboards' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="mt-8 flex items-center gap-2 justify-center">
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center font-bold text-purple-700">N</div>
          {!sidebarCollapsed && <span className="font-medium">Nishil Suthar</span>}
        </div>
      </aside>
      {/* Main Content */}
      <main className={`flex-1 p-10 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        {/* Header */}
        <div className="bg-gradient-to-tr from-[#e0c3fc] to-[#8ec5fc] rounded-xl p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between shadow">
          <div>
            <div className="uppercase text-xs font-semibold text-gray-700 mb-1">Current Plan</div>
            <div className="text-3xl font-bold text-gray-800 mb-2">Researcher</div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">API Usage</span>
              <span className="text-xs text-gray-500">0 / 1,000 Credits</span>
            </div>
          </div>
          <button className="mt-4 md:mt-0 bg-white border border-gray-300 rounded px-4 py-2 font-medium shadow hover:bg-gray-50">Manage Plan</button>
        </div>
        {/* API Keys Section */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">API Keys</h2>
            <button
              className="bg-blue-600 text-white rounded-full px-4 py-2 font-semibold hover:bg-blue-700"
              onClick={() => document.getElementById('add-key-form').classList.toggle('hidden')}
            >
              +
            </button>
          </div>
          <p className="text-gray-500 mb-4 text-sm">The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.</p>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          {loading && <div className="text-gray-500 mb-2">Loading...</div>}
          {/* Add Key Form */}
          <div id="add-key-form" className="hidden mb-4">
            <div className="flex gap-2 mb-2">
              <input
                className="border rounded px-2 py-1 flex-1"
                placeholder="Name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
              <input
                className="border rounded px-2 py-1 flex-1"
                placeholder="Key"
                value={newValue}
                onChange={e => setNewValue(e.target.value)}
              />
              <button className="bg-blue-600 text-white rounded px-3 py-1 font-semibold" onClick={handleAdd}>Add</button>
            </div>
          </div>
          {/* API Keys Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left font-semibold">NAME</th>
                  <th className="px-4 py-2 text-left font-semibold">USAGE</th>
                  <th className="px-4 py-2 text-left font-semibold">KEY</th>
                  <th className="px-4 py-2 text-left font-semibold">OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key, idx) => (
                  <tr key={key.id} className="border-b">
                    <td className="px-4 py-2">{editIndex === idx ? (
                      <input className="border rounded px-2 py-1" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
                    ) : key.name}</td>
                    <td className="px-4 py-2">{key.useage}</td>
                    <td className="px-4 py-2 font-mono">
                      {editIndex === idx ? (
                        <input className="border rounded px-2 py-1" value={editData.value} onChange={e => setEditData({ ...editData, value: e.target.value })} />
                      ) : showKeyIdx === idx ? key.value : '*'.repeat(key.value.length)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        {/* Eye button */}
                        <button
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                          title="Show/Hide"
                          onClick={() => handleToggleShow(idx)}
                        >
                          {showKeyIdx === idx ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.25-2.69A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.306M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          )}
                        </button>
                        {/* Copy button */}
                        <button
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                          title="Copy"
                          onClick={() => handleCopy(key.value, idx)}
                        >
                          {copiedIdx === idx ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" /><rect x="3" y="3" width="13" height="13" rx="2" /></svg>
                          )}
                        </button>
                        {/* Edit button */}
                        {editIndex === idx ? (
                          <>
                            <button className="p-2 rounded-full hover:bg-green-100 transition-colors flex items-center justify-center text-green-600 font-semibold" onClick={handleUpdate} title="Save">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-500 font-semibold" onClick={() => setEditIndex(null)} title="Cancel">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </>
                        ) : (
                          <button className="p-2 rounded-full hover:bg-blue-100 transition-colors flex items-center justify-center text-blue-600" title="Edit" onClick={() => handleEdit(idx)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" /></svg>
                          </button>
                        )}
                        {/* Delete button */}
                        <button className="p-2 rounded-full hover:bg-red-100 transition-colors flex items-center justify-center text-red-600" title="Delete" onClick={() => handleDeleteClick(idx)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Tavily Expert Section (static) */}
        <section className="bg-blue-50 rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-2">Tavily Expert</h3>
          <p className="text-gray-600 mb-4">Your expert is a specialized agent, always up to date with Tavily's latest documentation and best practices. To be used in AI-native IDEs to accurately implement and test Tavily tools within your application.</p>
          <button className="bg-blue-600 text-white rounded px-4 py-2 font-semibold">Get your Tavily Expert</button>
        </section>
      </main>
      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Delete API Key?</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this API key? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700" onClick={cancelDelete}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 