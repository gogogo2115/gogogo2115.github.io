import { NextRequest, NextResponse } from "next/server";

const currentTime = new Date().toISOString();

export async function GET(request: NextRequest) {
  const method = request.method;
  try {
    return NextResponse.json({ method, msg: "Hello, Next.js!", date: currentTime }, { status: 200, headers: [["Content-Type", "application/json"]] });
  } catch (e) {
    return NextResponse.json({ method, msg: "Error", date: currentTime }, { status: 500, headers: [["Content-Type", "application/json"]] });
  }
}

export async function POST(request: NextRequest) {
  const method = request.method;
  try {
    return NextResponse.json({ method, msg: "Hello, Next.js!", date: currentTime }, { status: 200, headers: [["Content-Type", "application/json"]] });
  } catch (e) {
    return NextResponse.json({ method, msg: "Error", date: currentTime }, { status: 500, headers: [["Content-Type", "application/json"]] });
  }
}
