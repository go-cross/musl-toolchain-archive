const default_musl_url = "https://musl.cc/";

async function main() {
  const musl_url = process.env.MUSL_URL || default_musl_url;
  const html = await fetch(musl_url).then((res) => res.text());
  console.log(html);
}

main();