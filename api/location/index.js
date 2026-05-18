import fs from 'fs';
import path from 'path';

// Путь к лог-файлу, как и раньше
const LOG_FILE_PATH = path.join('/tmp', 'location_log.txt');

// Эта функция будет обрабатывать ВСЕ запросы к /api/location
export default function handler(req, res) {
  // Если это GET-запрос, отдаем лог
  if (req.method === 'GET') {
    try {
      if (fs.existsSync(LOG_FILE_PATH)) {
        const logContent = fs.readFileSync(LOG_FILE_PATH, 'utf8');
        res.status(200).setHeader('Content-Type', 'text/plain').send(logContent);
      } else {
        res.status(404).send('Log file not found yet.');
      }
    } catch (error) {
      res.status(500).send('Error reading log file.');
    }
  }
  // Если это POST-запрос, записываем данные
  else if (req.method === 'POST') {
    const body = req.body;
    
    const device_id = body.device_id || 'unknown_device';
    const latitude = body.latitude;
    const longitude = body.longitude;
    
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} | Device: ${device_id} | Lat: ${latitude}, Lon: ${longitude}\n`;
    
    fs.appendFileSync(LOG_FILE_PATH, logEntry);
    
    res.status(200).json({ status: 'Location received' });
  }
  // Все остальные методы — посылаем лесом
  else {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).end('Method not allowed.');
  }
};
