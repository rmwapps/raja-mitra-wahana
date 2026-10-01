export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { uid, cookie } = await req.json();
  
  const formData = new URLSearchParams({
    act: '04w',
    uid
  });
  
  const res = await fetch('https://rmwapps.otoreport.com/cek.php', {
    method: 'POST',
    headers: {
      'Cookie': `PHPSESSID=${cookie}`,
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
  });
  
  const text = await res.text();
  
  return new Response(JSON.stringify({ success: res.ok, response: text }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
