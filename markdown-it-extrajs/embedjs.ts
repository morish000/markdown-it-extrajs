function getFileContent(filePath: string): string {
  const content = Deno.readFileSync(filePath);
  return new TextDecoder("utf-8").decode(content);
}

function getBase64Content(filePath: string): string {
  const content = getFileContent(filePath);
  return btoa(content);
}

export default function replacePlaceholdersInFile(
  templateFilePath: string,
  replacements: { [placeholder: string]: string },
  outputFilePath: string,
) {
  let templateContent = getFileContent(templateFilePath);

  for (const [placeholder, filePath] of Object.entries(replacements)) {
    const replaceContent = getBase64Content(filePath);
    templateContent = templateContent.replace(
      new RegExp(`\\$\\{${placeholder}\\}`, "g"),
      replaceContent,
    );
  }

  Deno.writeTextFileSync(outputFilePath, templateContent);
}
