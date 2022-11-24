import { Command, compress, decompress, ensureDir, exists } from "./deps.ts";

const ALL_TEMPLATES_DIR = {
  windows: `${
    Deno.env.get("USERPROFILE")
  }\\AppData\\Roaming\\Tortitas\\prot\\templates`,

  linux: `${Deno.env.get("HOME")}/.config/tortitas/prot/templates`,

  darwin: `${
    Deno.env.get("HOME")
  }/Library/Application Support/Tortitas/prot/templates`,
};

const TEMPLATES_DIR = ALL_TEMPLATES_DIR[Deno.build.os];

const ASCII_TEAPOT = `%c
              ;,'
     _o_    ;:;'
 ,-.'---\`.__ ;
((j\`=====',-'
 \`-\     /
    \`-=-'     hjw
`;

if (import.meta.main) {
  await new Command()
    .name("prot")
    .version("0.3.5")
    .description("Project template generator")
    .action(() => {
      console.info("❓ %cNo command specified, try --help", "color: yellow");
    })
    .command(
      "list",
      new Command()
        .description("List available templates")
        .action(async () => {
          const templates = await Deno.readDir(TEMPLATES_DIR);
          console.info("📁 %cAvailable templates:", "color: yellow");
          for await (const template of templates) {
            console.info(
              "  %c%s",
              "color: blue",
              template.name.split(".")[0],
            );
          }
        }),
    )
    .command(
      "directory",
      new Command()
        .description("Show and open templates directory in file explorer")
        .action(async () => {
          console.info("📁 %cCurrent templates directory is:", "color: yellow");
          console.info("  %c%s", "color: blue", TEMPLATES_DIR);

          if (Deno.build.os === "windows") {
            await Deno.run({
              cmd: ["explorer", TEMPLATES_DIR],
            }).status();
          }

          if (Deno.build.os === "linux") {
            await Deno.run({
              cmd: ["xdg-open", TEMPLATES_DIR],
            }).status();
          }

          if (Deno.build.os === "darwin") {
            await Deno.run({
              cmd: ["open", TEMPLATES_DIR],
            }).status();
          }
        }),
    )
    .command(
      "sync",
      new Command()
        .description("Sync templates")
        .action(async () => {
          console.log("%c📰 Syncing templates...", "color: blue");

          await ensureDir(TEMPLATES_DIR);

          const templates = await Deno.readDir("./templates");

          for await (const template of templates) {
            const currentDir = `${Deno.cwd()}/templates/${template.name}`;

            console.info(
              "  %c📌 Importing %s...",
              "color: yellow",
              template.name,
            );

            for await (
              const file of Deno.readDir(
                currentDir,
              )
            ) {
              await compress(
                `${currentDir}/${file.name}`,
                `${TEMPLATES_DIR}/${template.name}.zip`,
                {
                  overwrite: true,
                },
              );
            }
          }

          // await copy(
          //   "./templates",
          //   TEMPLATES_DIR,
          //   { overwrite: true },
          // );
        }),
    )
    .command(
      "new",
      new Command()
        .description("Create a new project")
        .arguments("<name:string> [template:string]")
        .action(
          async (
            _options: any,
            name: string,
            template?: string,
            ...args: any
          ) => {
            if (await exists(name)) {
              console.error(
                `❌ %cDirectory ${name} already exists`,
                "color: red",
              );
              Deno.exit(1);
            }

            const selectedTemplate = template || "default";

            if (!await exists(`${TEMPLATES_DIR}/${selectedTemplate}.zip`)) {
              console.error(
                `❌ %cTemplate ${selectedTemplate} does not exist`,
                "color: red",
              );
              Deno.exit(1);
            }

            await Deno.mkdirSync(name);

            // await copy(
            //   `${TEMPLATES_DIR}/${selectedTemplate}`,
            //   `${name}`,
            //   { overwrite: true },
            // );

            const projectFolder = Deno.cwd() + "/" + name;

            await decompress(
              `${TEMPLATES_DIR}/${selectedTemplate}.zip`,
              projectFolder,
              { overwrite: true },
            );

            for await (const dirEntry of Deno.readDir(name)) {
              if (dirEntry.isFile) {
                const fileContent = await Deno.readTextFile(
                  `${name}/${dirEntry.name}`,
                );

                await Deno.writeTextFile(
                  `${name}/${dirEntry.name}`,
                  fileContent.replaceAll("%%name%%", name),
                );
              }
            }

            console.info(ASCII_TEAPOT, "color: blue");
            console.info(
              `✅ %cProject ${name} successfully created with template ${selectedTemplate}`,
              "color: green;",
            );

            Deno.exit(0);
          },
        ),
    )
    .parse(Deno.args);
}
