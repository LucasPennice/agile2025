import { Given, Then, BeforeAll, AfterAll, Before } from '@cucumber/cucumber';
import puppeteer from 'puppeteer';

let browser, page;

BeforeAll(async () => {
  browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  page = await browser.newPage();
  await page.goto('https://agile2025.vercel.app/ '); // Cambiá esto según tu servidor
});

AfterAll(async () => {
  await browser.close();
});

Before(async () => {
  await page.goto('https://agile2025.vercel.app/', { waitUntil: 'networkidle2' });
});

Given('el jugador ingresa el nombre {string}', async (nombre) => {
  await page.waitForSelector('#username');
  await page.type('#username', nombre);
});

Given('la palabra secreta es {string}', async (palabra) => {
  await page.type('#palabra', palabra);
  await page.click('#startBtn');
});

Then('debe mostrarse el progreso como {string}', async (textoEsperado) => {
  await page.waitForSelector('#progreso');
  const progreso = await page.$eval('#progreso', el => el.textContent.trim());
  if (progreso !== textoEsperado) {
    throw new Error(`Esperaba "${textoEsperado}" pero se mostró "${progreso}"`);
  }
});