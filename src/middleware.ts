import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function middleware(req: NextRequest) {
  

 
  return NextResponse.next();
}


// See "Matching Paths" below to learn more
