export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { hp, pin, cookie } = await req.json();
  
  const formData = new URLSearchParams({
    hpagen: hp,
    passwd: pin,
    tp: 'ot',
    login: 'Login',
    log: ''
  });
  
  await fetch('https://rmwapps.otoreport.com/', {
    method: 'POST',
    headers: { 'Cookie': `PHPSESSID=${cookie}` },
    body: formData,
    redirect: 'manual'
  });
  
  const uidRes = await fetch('https://rmwapps.otoreport.com/', {
    headers: { 'Cookie': `PHPSESSID=${cookie}` }
  });
  
  const html = await uidRes.text();
  const uid = html.match(/uid:\s*"([^"]+)"/)?.[1];
  
  if (!uid) return new Response('Login failed', { status: 401 });
  
  return new Response(JSON.stringify({ uid }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
