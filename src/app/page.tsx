"use client";

import { useState, useEffect } from "react";
import { 
  Trash2, 
  Plus, 
  ClipboardList, 
  CheckCircle2, 
  Circle, 
  Settings, 
  X, 
  Loader2,
  Trash,
  Check
} from "lucide-react";
import { PickupItem, parsePickupSMS } from "@/lib/pickup-engine";

export default function Home() {
  const [pickups, setPickups] = useState<PickupItem[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("https://api.deepseek.com/v1");
  const [model, setModel] = useState("deepseek-chat");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  // 初始化加载
  useEffect(() => {
    const savedPickups = localStorage.getItem("005-pickups");
    if (savedPickups) setPickups(JSON.parse(savedPickups));
    const savedKey = localStorage.getItem("005-api-key");
    if (savedKey) setApiKey(savedKey);
    const savedEnd = localStorage.getItem("005-endpoint");
    if (savedEnd) setEndpoint(savedEnd);
    const savedModel = localStorage.getItem("005-model");
    if (savedModel) setModel(savedModel);
  }, []);

  // 持久化保存
  useEffect(() => {
    localStorage.setItem("005-pickups", JSON.stringify(pickups));
  }, [pickups]);

  useEffect(() => {
    localStorage.setItem("005-api-key", apiKey);
    localStorage.setItem("005-endpoint", endpoint);
    localStorage.setItem("005-model", model);
  }, [apiKey, endpoint, model]);

  // 解析短信
  const handleParse = async () => {
    if (!inputText.trim()) return;
    if (!apiKey) {
      alert("请先在设置中配置 API Key");
      setIsSettingsOpen(true);
      return;
    }

    setIsParsing(true);
    try {
      const newItems = await parsePickupSMS(inputText, apiKey, endpoint, model);
      setPickups(prev => [...newItems, ...prev]);
      setInputText("");
      setIsModalOpen(false);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsParsing(false);
    }
  };

  // 状态切换
  const toggleDone = (id: string) => {
    setPickups(prev => prev.map(item => 
      item.id === id ? { ...item, isDone: !item.isDone } : item
    ));
  };

  // 删除单条
  const deleteItem = (id: string) => {
    if (confirm("确定要删除这条取件信息吗？")) {
      setPickups(prev => prev.filter(item => item.id !== id));
    }
  };

  // 清空已完成
  const clearDone = () => {
    setPickups(prev => prev.filter(item => !item.isDone));
  };

  return (
    <main style={{ 
      minHeight: "100vh", 
      background: "var(--color-bg)",
      padding: "var(--space-6) var(--space-4)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{ width: "100%", maxWidth: "var(--max-width-sm)" }}>
        
        {/* Header */}
        <header style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "var(--space-8)"
        }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "var(--space-1)" }}>
              快递取件码
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
              {pickups.filter(p => !p.isDone).length} 个待取包裹
            </p>
          </div>
          <button 
            className="btn btn-ghost" 
            style={{ padding: "var(--space-2)" }}
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings size={20} />
          </button>
        </header>

        {/* List Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", paddingBottom: "100px" }}>
          {pickups.length === 0 ? (
            <div style={{ 
              textAlign: "center", 
              padding: "var(--space-16) 0",
              color: "var(--color-text-faint)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-4)"
            }}>
              <ClipboardList size={48} strokeWidth={1} />
              <p>暂无取件码，点击下方粘贴短信识别</p>
            </div>
          ) : (
            pickups.map(item => (
              <div 
                key={item.id}
                className="card animate-in"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  background: item.isDone ? "var(--color-surface)" : "var(--color-surface-2)",
                  opacity: item.isDone ? 0.6 : 1,
                  border: item.isDone ? "1px solid transparent" : "1px solid var(--color-border)",
                  transition: "all var(--transition-base)"
                }}
              >
                <button 
                  style={{ color: item.isDone ? "var(--color-success)" : "var(--color-text-faint)" }}
                  onClick={() => toggleDone(item.id)}
                >
                  {item.isDone ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: 700, 
                    textDecoration: item.isDone ? "line-through" : "none",
                    color: item.isDone ? "var(--color-text-muted)" : "var(--color-primary)"
                  }}>
                    {item.code}
                  </div>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "var(--space-3)", 
                    marginTop: "var(--space-1)",
                    fontSize: "0.8125rem",
                    color: "var(--color-text-muted)"
                  }}>
                    <span>📍 {item.location}</span>
                    <span style={{ 
                      opacity: 0.5, 
                      fontSize: "0.75rem",
                      paddingLeft: "var(--space-2)",
                      borderLeft: "1px solid var(--color-border)"
                    }}>
                      {item.date}
                    </span>
                  </div>
                </div>

                <button 
                  style={{ color: "var(--color-text-faint)" }}
                  onClick={() => deleteItem(item.id)}
                >
                  <Trash size={18} />
                </button>
              </div>
            ))
          )}

          {pickups.some(p => p.isDone) && (
            <button 
              onClick={clearDone}
              style={{ 
                alignSelf: "center", 
                fontSize: "0.75rem", 
                color: "var(--color-text-faint)",
                marginTop: "var(--space-4)",
                textDecoration: "underline"
              }}
            >
              清空已完成项
            </button>
          )}
        </div>

        {/* Global Action Button */}
        <div style={{
          position: "fixed",
          bottom: "var(--space-8)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - var(--space-8))",
          maxWidth: "var(--max-width-sm)",
          zIndex: 10
        }}>
          <button 
            className="btn btn-primary" 
            style={{ 
              width: "100%", 
              padding: "var(--space-4)", 
              fontSize: "1rem",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 10px 40px rgba(var(--color-primary-rgb), 0.3)"
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} /> 粘贴短信智能识别
          </button>
        </div>

        {/* Parsing Modal */}
        {isModalOpen && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--space-4)",
            zIndex: 100
          }}>
            <div className="card animate-in" style={{ width: "100%", maxWidth: "400px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
                <h3 style={{ fontWeight: 700 }}>粘贴驿站短信</h3>
                <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
              </div>
              <textarea 
                className="input"
                style={{ height: "150px", resize: "none", marginBottom: "var(--space-4)" }}
                placeholder="在此粘贴包含取件码的短信内容..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
              <button 
                className="btn btn-primary" 
                style={{ width: "100%" }}
                onClick={handleParse}
                disabled={isParsing || !inputText.trim()}
              >
                {isParsing ? <><Loader2 className="animate-spin" size={18} /> 正在智能识别...</> : "开始识别"}
              </button>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--space-4)",
            zIndex: 100
          }}>
          <div className="card animate-in" style={{ width: "100%", maxWidth: "440px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-6)" }}>
                <h3 style={{ fontWeight: 700 }}>接口设置 (BYOK)</h3>
                <button onClick={() => setIsSettingsOpen(false)}><X size={20} /></button>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginBottom: "var(--space-1)" }}>
                    API KEY
                  </label>
                  <input 
                    type="password"
                    className="input"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginBottom: "var(--space-1)" }}>
                    Endpoint (接口地址)
                  </label>
                  <input 
                    className="input"
                    placeholder="https://api.deepseek.com/v1"
                    value={endpoint}
                    onChange={e => setEndpoint(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginBottom: "var(--space-1)" }}>
                    Model (模型名称)
                  </label>
                  <input 
                    className="input"
                    placeholder="deepseek-chat"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                  />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
                    {["deepseek-chat", "gpt-4o-mini", "qwen-max"].map(m => (
                      <button 
                        key={m} 
                        style={{ 
                          fontSize: "0.65rem", 
                          padding: "2px 8px", 
                          background: model === m ? "var(--color-primary)" : "var(--color-surface-2)",
                          borderRadius: "4px",
                          color: model === m ? "#fff" : "var(--color-text-muted)"
                        }}
                        onClick={() => setModel(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: "0.7rem", color: "var(--color-text-faint)", marginTop: "var(--space-2)" }}>
                  密钥及配置仅保存在本地浏览器中，不经过任何服务器。
                </p>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: "100%", marginTop: "var(--space-6)" }}
                onClick={() => setIsSettingsOpen(false)}
              >
                保存设置
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
