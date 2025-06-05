import * as cheerio from 'cheerio';

export interface File {
  name: string;
  updated: string;
  size: number;
}

async function parse_html(html: string) {
  const $ = cheerio.load(html)
  const pre_node = $('body > pre:nth-child(28)')
  const links = pre_node.find('a').slice(1)
  const files: File[] = []
  
  for (const link of links) {
    const name = $(link).attr('href')!
    
    // get the text after the link
    const linkElement = $(link)
    const parentText = linkElement.parent().text()
    
    // find the index of the link in the parent text
    const linkText = linkElement.text()
    const linkIndex = parentText.indexOf(linkText)
    
    if (linkIndex !== -1) {
      // get the text after the link
      const afterLinkText = parentText.substring(linkIndex + linkText.length)
      
      // use regex to match the date and size
      // format: multiple spaces + date time + multiple spaces + size
      const match = afterLinkText.match(/\s+(\d{2}-\w{3}-\d{4}\s+\d{2}:\d{2})\s+(\d+)/)
      
      if (match) {
        const updated = match[1]
        const size = parseInt(match[2])
        files.push({ name, updated, size })
      }
    }
  }
  
  console.log(files)
  return files
}

export { parse_html };
