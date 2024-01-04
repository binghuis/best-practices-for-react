import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return new Promise(resolve => {  
    setTimeout(() => {  
      resolve(new Response('白白', {  
        status: 200,  
      }));  
    }, 2000);  
  });  
}