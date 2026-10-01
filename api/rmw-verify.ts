export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { uid, otp, cookie } = await req.json();
  
  const formData = new URLSearchParams({
    usernm: uid,
    otp,
    validasiotp: 'OTP',
    log: ''
  });
  
  await fetch('https://rmwapps.otoreport.com/', {
    method: 'POST',
    headers: { 'Cookie': `PHPSESSID=${cookie}` },
    body: formData
  });
  
  const profileRes = await fetch('https://rmwapps.otoreport.com/member/mprofile/', {
    headers: { 'Cookie': `PHPSESSID=${cookie}` }
  });
  
  const html = await profileRes.text();
  const username = html.match(/name="username"[^>]*?value="([^"]+)"/)?.[1];
  const nama = html.match(/name="nama"[^>]*?value="([^"]+)"/)?.[1];
  
  if (!username) return new Response('Verification failed', { status: 401 });
  
  return new Response(JSON.stringify({ username, nama }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
