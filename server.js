import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
);

app.get('/', (req, res) => {
  res.send('Welcome to the Wallpaper App');
});

app.get('/api', async (req, res) => {
  try {
    const { q, page, purity, ratios, resolutions } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({ error: 'Missing search query parameter (q).' });
    }

    const response = await axios.get('https://wallhaven.cc/api/v1/search', {
      params: {
        q,
        page,
        purity,
        ratios,
        resolutions
      },
      headers: {
        'X-API-KEY': process.env.API_KEY
      },
      timeout: 6969
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/hosted-image', async (req, res) => {
  try {
    const imageUrl =
      req.query.imageUrl ||
      'https://w.wallhaven.cc/full/8o/wallhaven-8ogjvy.png';

    if (!imageUrl.startsWith('https://w.wallhaven.cc/full')) {
      imageUrl = `https://w.wallhaven.cc/full/${imageUrl}`;
    }

    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });

    res.setHeader('Content-Type', response.headers['content-type']);

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error fetching image: ${error.message}` });
  }
});

app.get('/api/refresh', async (req, res) => {
  try {
    res.status(200).json({ message: 'Server refreshed' });
  } catch (error) {
    console.error('Error refreshing server:', error);
    res.status(500).json({ message: 'Failed to refresh server' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const refreshServer = async () => {
  try {
    const url = process.env.SERVER_URL;
    const response = await axios.get(`${url}/api/refresh`);
    const data = response.data;
    console.log('Server refreshed:', data);
  } catch (error) {
    console.error('Error refreshing server:', error);
  }
};

const interval = 10 * 60 * 1000;
setInterval(refreshServer, interval);
