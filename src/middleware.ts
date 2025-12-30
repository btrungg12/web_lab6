// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Chỉ áp dụng bảo mật cho đường dẫn bắt đầu bằng /api/secret
  if (request.nextUrl.pathname.startsWith('/api/secret')) {
    
    const apiKey = request.headers.get('x-api-key');
    
    // LƯU Ý: Nếu chưa cấu hình file .env thì sửa tạm dòng này thành:
    // const secret = 'nextjs_is_cool'; 
    const secret = process.env.API_SECRET_KEY; 

    if (!apiKey || apiKey !== secret) {
      return NextResponse.json(
        { error: 'Unauthorized: Sai mật mã hoặc thiếu Key bảo vệ' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};