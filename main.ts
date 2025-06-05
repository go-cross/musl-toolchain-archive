import { parse_html } from "./parse";
import download from 'download'

const default_musl_url = "https://musl.cc/";

async function download_file(url: string) {
  await download(url, './files')
}

async function main() {
  let musl_url = process.env.MUSL_URL || default_musl_url;
  if (musl_url.endsWith('/')) {
    musl_url = musl_url.slice(0, -1)
  }
  const html = await fetch(musl_url).then((res) => res.text());
  const files = await parse_html(html);
  for (const file of files) {
    console.log(`downloading ${file.name}`)
    await download_file(`${musl_url}/${file.name}`)
  }
}

main();