export const config = { runtime: 'edge' };

export default async function handler() {
  const res = await fetch('https://rmwapps.otoreport.com/');
  const cookie = res.headers.get('set-cookie')?.match(/PHPSESSID=([^;]+)/)?.[1];
  
  if (!cookie) return new Response('Failed to get cookie', { status: 500 });
  
  return new Response(JSON.stringify({ cookie }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
