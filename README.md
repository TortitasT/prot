# prot

Project generator made in Denoland.

## Usage

```powershell
prot new <name> [template]
```

## Install

Requires Denoland to be installed.
```powershell
git clone https://github.com/tortitast/prot.git
cd prot
deno install --allow-env --allow-read --allow-write -f .\main.ts
```

## Templates

To add a template create a folder with the name of the template and the files inside.
```powershell
%USERPROFILE%\AppData\Roaming\Tortitas\prot\templates
```