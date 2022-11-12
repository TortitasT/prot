import { Command, copy, exists } from "./deps.ts";

const TEMPLATES_DIR = "./templates";

if (import.meta.main) {
  await new Command()
    .name("prot")
    .version("0.1.0")
    .description("Project template generator")
    .command(
      "new",
      new Command()
        .description("Create a new project")
        .arguments("<name:string> [template:string]")
        .action(async (options, name: string, template?: string, ...args) => {
          if (await exists(name)) {
            console.error(`Directory ${name} already exists`);
            Deno.exit(1);
          }

          await Deno.mkdirSync(name);

          let selectedTemplate = template || "default";

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
