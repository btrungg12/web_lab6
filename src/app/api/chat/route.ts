// src/app/api/chat/route.ts
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const { text } = await generateText({
      // SỬA Ở ĐÂY: Dùng model 2.5 flash có trong danh sách của bạn
      model: google('gemini-2.5-flash'), 
      prompt: question,
    });

    return NextResponse.json({ 
      answer: text 
    });

  } catch (error) {
    console.error("Lỗi chi tiết:", error);
    return NextResponse.json({ 
      error: "Lỗi: " + (error instanceof Error ? error.message : String(error)) 
    }, { status: 500 });
  }
}