import fs from 'fs';
import path from 'path';

const LOG_FILE_PATH = path.join('/tmp', 'location_log.txt');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;
    
    const device_id = body.device_id || 'unknown_device';
    const latitude = body.latitude;
    const longitude = body.longitude;
    
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} | Device: ${device_id} | Lat: ${latitude}, Lon: ${longitude}\n`;
    
    // Записываем в лог-файл в папке /tmp
    fs.appendFileSync(LOG_FILE_PATH, logEntry);
    
    // Отвечаем, что всё ок.
    res.status(200).json({ status: 'Location received' });
  } else {
    res.status(405).end('Method not allowed.');
  }
}
