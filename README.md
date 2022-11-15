# prot

Project generator made in Deno.

## Usage

```powershell
prot new <name> [template]
```

## Install

Requires Deno to be installed.
```powershell
git clone https://github.com/tortitast/prot.git
cd prot
deno install --allow-env --allow-read --allow-write --allow-run -f main.ts
prot sync
```

### On mac (maybe on linux too, haven't tried)

Add this line to your shell .rc file (e.g. ~/.bashrc, ~/.zshrc, ~/.config/fish/config.fish)
```bash
export PATH="/Users/vgf/.deno/bin:$PATH"
```

## Templates

To add a template create a .zip in the following directory with the name of the template and the files inside.

- Windows
```powershell
%USERPROFILE%\AppData\Roaming\Tortitas\prot\templates
```

- Linux
```bash
~/.config/tortitas/prot/templates
```

- Mac
```bash
~/Library/Application Support/Tortitas/prot/templates
```

### %%name%%
%%name%% will be automatically replaced with the name of the project.