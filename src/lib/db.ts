// src/lib/db.ts
import { Pool } from 'pg';

// Tạo một kết nối (pool) dùng chung
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Hàm helper để chạy câu lệnh SQL ở bất cứ đâu trong dự án
export const query = async (text: string, params?: any[]) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
};