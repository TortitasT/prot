import { Command, copy, ensureDir, exists } from "./deps.ts";

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
    .version("0.1.1")
    .description("Project template generator")
    .action(() => {
      console.info("❓ %cNo command specified, try --help", "color: yellow");
    })
    .command(
      "sync",
      new Command()
        .description("Sync templates")
        .action(async () => {
          console.log("%cSyncing templates...", "color: blue");

          await ensureDir(TEMPLATES_DIR);

          await copy(
            "./templates",
            TEMPLATES_DIR,
            { overwrite: true },
          );
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

            if (!await exists(`${TEMPLATES_DIR}/${selectedTemplate}`)) {
              console.error(
                `❌ %cTemplate ${selectedTemplate} does not exist`,
                "color: red",
              );
              Deno.exit(1);
            }

            await Deno.mkdirSync(name);

            await copy(
              `${TEMPLATES_DIR}/${selectedTemplate}`,
              `${name}`,
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
