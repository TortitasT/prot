import { Command, copy, ensureDir, exists } from "./deps.ts";

const TEMPLATES_DIR = `${
  Deno.env.get("USERPROFILE")
}\\AppData\\Roaming\\Tortitas\\prot\\templates`;

const ASCII_TEAPOT = `%c
              ;,'
     _o_    ;:;'
 ,-.'---\`.__ ;
((j\`=====',-'
 \`-\     /
    \`-=-'     hjw
`;

if (!(await exists(TEMPLATES_DIR))) {
  await ensureDir(TEMPLATES_DIR);

  console.log("%cInstalling templates...", "color: blue");

  await copy(
    "./templates",
    TEMPLATES_DIR,
  );
}

if (import.meta.main) {
  await new Command()
    .name("prot")
    .version("0.1.1")
    .description("Project template generator")
    .action(() => {
      console.info("❓ %cNo command specified, try --help", "color: yellow");
    })
    .command(
      "new",
      new Command()
        .description("Create a new project")
        .arguments("<name:string> [template:string]")
        .action(async (_options, name: string, template?: string, ...args) => {
          if (await exists(name)) {
            console.error(`❌ %cDirectory ${name} already exists`, "color: red");
            Deno.exit(1);
          }

          await Deno.mkdirSync(name);

          const selectedTemplate = template || "default";

          if (!await exists(`${TEMPLATES_DIR}/${selectedTemplate}`)) {
            console.error(
              `❌ %cTemplate ${selectedTemplate} does not exist`,
              "color: red",
            );
            Deno.exit(1);
          }

          await copy(
            `${TEMPLATES_DIR}/${selectedTemplate}`,
            `${name}`,
            { overwrite: true },
          );

          console.info(ASCII_TEAPOT, "color: blue");
          console.info(
            `✅ %cProject ${name} successfully created with template ${selectedTemplate}`,
            "color: green;",
          );

          Deno.exit(0);
        }),
    )
    .parse(Deno.args);
}
