/**
 * 快递取件码解析引擎
 * 使用 AI 解析短信文本并提取结构化取件信息
 */

export interface PickupItem {
  id: string;
  code: string;
  location: string;
  date: string;
  isDone: boolean;
  rawText: string;
}

export async function parsePickupSMS(
  text: string, 
  apiKey: string, 
  endpoint: string = "https://api.deepseek.com/v1", 
  model: string = "deepseek-chat"
): Promise<PickupItem[]> {
  const prompt = `
你是一个专业的快递短信解析助手。请从以下短信文本中提取所有的取件码和取件地点。
要求：
1. 忽略非快递取件相关的文本。
2. 如果一条短信包含多个取件码，请拆分成多条记录。
3. 返回的结果必须是严格的 JSON 数组格式。
4. 字段包含：code (取件码), location (取件地点)。
5. 如果无法确定地点，请填写"未知驿站"。

待解析文本：
"${text}"

返回格式：
[
  {"code": "67-5-2243", "location": "青岛中车小镇13号楼店"},
  {"code": "67-5-2236", "location": "青岛中车小镇13号楼店"}
]
`;

  try {
    const response = await fetch(`${endpoint.replace(/\/+$/, '')}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "你是一个只输出 JSON 数组的机器人。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.1,
        // 部分模型不支持 response_format，移除以提高兼容性，或根据模型动态判断
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // 解析 JSON (处理可能的包裹对象或纯数组)
    let parsed: any[] = [];
    try {
      const jsonObj = JSON.parse(content);
      parsed = Array.isArray(jsonObj) ? jsonObj : (jsonObj.pickups || jsonObj.items || []);
    } catch {
      // 备用：正则提取数组部分
      const match = content.match(/\[[\s\S]*\]/);
      if (match) parsed = JSON.parse(match[0]);
    }

    const today = new Date().toISOString().split('T')[0];

    return parsed.map((item: any, index: number) => ({
      id: `${Date.now()}-${index}`,
      code: item.code || "无取件码",
      location: item.location || "未知驿站",
      date: today,
      isDone: false,
      rawText: text
    }));

  } catch (error) {
    console.error("AI Parsing Error:", error);
    throw new Error("解析失败，请检查网络或配置。");
  }
}
