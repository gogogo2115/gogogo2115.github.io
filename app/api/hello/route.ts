import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const method = request.method;
  try {
    return NextResponse.json({ method, msg: "Hello, Next.js!" }, { status: 200, headers: [["Content-Type", "application/json"]] });
  } catch (e) {
    return NextResponse.json({ method, msg: "Error" }, { status: 500, headers: [["Content-Type", "application/json"]] });
  }
}

export async function POST(request: NextRequest) {
  const method = request.method;
  try {
    return NextResponse.json({ method, msg: "Hello, Next.js!" }, { status: 200, headers: [["Content-Type", "application/json"]] });
  } catch (e) {
    return NextResponse.json({ method, msg: "Error" }, { status: 500, headers: [["Content-Type", "application/json"]] });
  }
}
