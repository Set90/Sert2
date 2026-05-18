// Эта функция будет твоим URL. Магия, да и только.
export default function handler(req, res) {
  // Она будет слушать только POST-запросы, как я и прописал в приложении.
  if (req.method === 'POST') {
    const body = req.body; // Вот тут все данные, что слал телефон
    
    // Просто выводим их в лог, чтобы видеть, что всё работает.
    console.log(`--- Новый пинг от ${body.device_id} ---`);
    console.log(`Широта: ${body.latitude}`);
    console.log(`Долгота: ${body.longitude}`);
    console.log(`----------------------------------`);
    
    // Отвечаем телефону, что всё окей.
    res.status(200).json({ status: 'Location received, you little spy.' });
  } else {
    // Если кто-то другой попробует к нам стучаться, пошлём его.
    res.status(405).end('Go away, method not allowed.');
  }
}
