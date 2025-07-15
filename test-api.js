// Test API endpoint manually
const https = require('https');

const testData = {
  appId: 2147,
  email: "test@example.com"
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'manage-dev.ventla.io',
  port: 443,
  path: '/Client/CreateAccountConfirmedEmail',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🧪 Testing API endpoint...');
console.log('📤 Request data:', testData);

const req = https.request(options, (res) => {
  console.log('📥 Response status:', res.statusCode);
  console.log('📥 Response headers:', res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('📥 Response body:', data);
    try {
      const jsonResponse = JSON.parse(data);
      console.log('✅ Parsed response:', jsonResponse);
    } catch (e) {
      console.log('❌ Failed to parse JSON:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('💥 Request error:', e.message);
});

req.write(postData);
req.end(); 