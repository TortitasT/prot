import { Command, copy, ensureDir, exists } from "./deps.ts";

const TEMPLATES_DIR = `${
  Deno.env.get("USERPROFILE")
}\\AppData\\Roaming\\Tortitas\\prot\\templates`;

/* const ASCII_TEAPOT = `
              ;,'
     _o_    ;:;'
 ,-.'---`.__ ;
((j`=====',-'
 `-\     /
    `-=-'     hjw
` */

if (!(await exists(TEMPLATES_DIR))) {
  await ensureDir(TEMPLATES_DIR);

  console.log("Installing templates...");

  await copy(
    "./templates",
    TEMPLATES_DIR,
  );
}

if (import.meta.main) {
  await new Command()
    .name("prot")
    .version("0.1.0")
    .description("Project template generator")
    .action(() => {
      console.info("No command specified, try --help");
    })
    .command(
      "new",
      new Command()
        .description("Create a new project")
        .arguments("<name:string> [template:string]")
        .action(async (_options, name: string, template?: string, ...args) => {
          if (name == "test") {
            console.log(TEMPLATES_DIR);
            Deno.exit(0);
          }

          if (await exists(name)) {
            console.error(`Directory ${name} already exists`);
            Deno.exit(1);
          }

          await Deno.mkdirSync(name);

          const selectedTemplate = template || "default";

          if (!await exists(`${TEMPLATES_DIR}/${selectedTemplate}`)) {
            console.error(`Template ${selectedTemplate} does not exist`);
            Deno.exit(1);
          }

          await copy(
            `${TEMPLATES_DIR}/${selectedTemplate}`,
            `${name}`,
            { overwrite: true },
          );

          console.info(
            `Project ${name} created with template ${selectedTemplate}`,
          );

          Deno.exit(0);
        }),
    )
    .parse(Deno.args);
}
