import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function middleware(req: NextRequest) {
  
   const session = await getToken({ req, secret: process.env.NEXT_AUHT_SECRET });
   

 
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
const  data:any = session.user;
const userRole= data.role;

  const validRoles = ['admin','client','SEO','super-user'];

  if( validRoles.includes( userRole ) ){
   
    if (req.nextUrl.pathname.startsWith('/admin') && userRole === 'client' ) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = '/'
     return NextResponse.rewrite(url)
      
    }
    
  }
  if( validRoles.includes( userRole ) ){
    console.log('pase por /admin/dashboard')
    if (req.nextUrl.pathname.startsWith('/api/admin/dashboard') && userRole === 'client' ) {
     
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = '/api/404'
     return NextResponse.rewrite(url)
    };
  
  }
  
 
  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/address', '/checkout/summary','/admin','/api/admin/dashboard']
};