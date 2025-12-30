// src/app/api/secret/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Import cầu nối DB
export async function GET() {
  try {
    // Thay 'documents' bằng tên bảng thật trong pgAdmin của bạn
    const result = await query('SELECT * FROM documents'); 
    
    return NextResponse.json({
      data: result.rows,
      message: "Lấy dữ liệu từ Database thành công!"
    });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi kết nối DB: " + error }, { status: 500 });
  }
}