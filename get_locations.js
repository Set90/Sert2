import fs from 'fs';
import path from 'path';

const LOG_FILE_PATH = path.join('/tmp', 'location_log.txt'); // Netlify позволяет писать только в /tmp

// Эта функция будет читать лог и отдавать его содержимое
export default function handler(req, res) {
  try {
    if (fs.existsSync(LOG_FILE_PATH)) {
      const logContent = fs.readFileSync(LOG_FILE_PATH, 'utf8');
      res.status(200).send(logContent);
    } else {
      res.status(404).send('Log file not found.');
    }
  } catch (error) {
    res.status(500).send('Error reading log file.');
  }
}
