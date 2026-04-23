// Shell / OS commands reference — macOS, Windows, Linux, Ubuntu.

export const shellCommandsArticle = {
  id: "shell-commands",
  title: "Shell and OS Commands",
  keywords: [
    "shell", "command", "terminal", "cli", "bash", "zsh", "powershell",
    "cmd", "mac", "macos", "windows", "linux", "ubuntu", "apt",
    "brew", "winget", "chocolatey", "package manager",
  ],
  summary:
    "A practical cross-platform reference for everyday terminal commands on macOS, Windows, Linux, and Ubuntu — navigation, files, processes, networking, and package managers.",
  sections: [
    {
      id: "overview",
      title: "Shells across operating systems",
      keywords: ["shell", "overview", "bash", "zsh", "powershell", "cmd"],
      body: "macOS: default shell is zsh (bash on older versions). Linux/Ubuntu: default shell is usually bash. Windows: two shells ship with it — CMD (legacy) and PowerShell (modern, object-based, cross-platform). On Windows you can also install WSL (Windows Subsystem for Linux) to get a real Ubuntu/Debian environment alongside Windows.",
    },
    {
      id: "navigation",
      title: "Directory navigation",
      keywords: ["navigation", "cd", "pwd", "ls", "dir", "list"],
      body: "Print working directory — mac/Linux: `pwd`; Windows CMD: `cd` (no args) or `echo %CD%`; PowerShell: `pwd` or `Get-Location`. Change directory — all: `cd path`. Up one: `cd ..`. Home — mac/Linux: `cd ~`; Windows: `cd %USERPROFILE%` or PowerShell `cd ~`. List contents — mac/Linux: `ls`, `ls -la`; Windows CMD: `dir`; PowerShell: `ls` (alias for Get-ChildItem).",
    },
    {
      id: "file-basics",
      title: "Files — create, read, copy, move, delete",
      keywords: ["file", "touch", "cat", "cp", "mv", "rm", "del", "copy"],
      body: "Create empty file — mac/Linux: `touch file.txt`; Windows CMD: `type nul > file.txt`; PowerShell: `New-Item file.txt`. Read — mac/Linux: `cat file`; Windows CMD: `type file`; PowerShell: `Get-Content file` (alias `cat`). Copy — mac/Linux: `cp src dst`; Windows CMD: `copy src dst`; PowerShell: `Copy-Item src dst`. Move/rename — mac/Linux: `mv src dst`; Windows CMD: `move src dst`; PowerShell: `Move-Item`. Delete — mac/Linux: `rm file`; Windows CMD: `del file`; PowerShell: `Remove-Item file`.",
    },
    {
      id: "directories",
      title: "Directories",
      keywords: ["directory", "mkdir", "rmdir", "folder"],
      body: "Make — all: `mkdir name` (use `mkdir -p a/b/c` on mac/Linux, `mkdir a\\b\\c` on Windows to nest). Remove empty — mac/Linux: `rmdir name`; Windows CMD: `rmdir name`. Remove recursive — mac/Linux: `rm -rf name` (destructive, no recycle bin); Windows CMD: `rmdir /s /q name`; PowerShell: `Remove-Item name -Recurse -Force`.",
    },
    {
      id: "viewing-files",
      title: "Viewing and paging files",
      keywords: ["cat", "less", "more", "head", "tail", "view"],
      body: "Whole file — `cat file` (mac/Linux), `type file` (Windows CMD). Page through — `less file` (mac/Linux, q to quit), `more file` (Windows + mac/Linux). First/last lines — mac/Linux: `head -n 20 file`, `tail -n 20 file`. Follow a growing log — `tail -f log.txt` (mac/Linux); PowerShell: `Get-Content log.txt -Wait`.",
    },
    {
      id: "search",
      title: "Searching files and content",
      keywords: ["search", "grep", "find", "findstr", "select-string"],
      body: "Search text in files — mac/Linux: `grep -rn \"pattern\" .`; Windows CMD: `findstr /s /n \"pattern\" *`; PowerShell: `Select-String -Path * -Pattern \"pattern\"`. Find files by name — mac/Linux: `find . -name \"*.txt\"`; Windows CMD: `dir /s /b *.txt`; PowerShell: `Get-ChildItem -Recurse -Filter *.txt`. The cross-platform tool `ripgrep` (`rg \"pattern\"`) is faster than grep on all three.",
    },
    {
      id: "permissions",
      title: "Permissions and ownership (Unix)",
      keywords: ["permission", "chmod", "chown", "sudo"],
      body: "Unix permissions have three triplets: owner, group, world — each r(4), w(2), x(1). `chmod 755 file` = rwxr-xr-x. `chmod +x script.sh` adds execute. `chown user:group file` changes ownership. `sudo cmd` runs as root. Windows uses ACLs via `icacls file /grant user:F` (much more granular, rarely touched day-to-day).",
    },
    {
      id: "processes",
      title: "Processes",
      keywords: ["process", "ps", "top", "kill", "tasklist", "taskkill"],
      body: "List processes — mac/Linux: `ps aux`, `top`, `htop` (if installed); Windows CMD: `tasklist`; PowerShell: `Get-Process` (alias `ps`). Kill by PID — mac/Linux: `kill 1234` (`kill -9 1234` to force); Windows CMD: `taskkill /PID 1234 /F`; PowerShell: `Stop-Process -Id 1234`. Kill by name — `pkill node` (mac/Linux), `taskkill /IM node.exe /F` (Windows).",
    },
    {
      id: "environment",
      title: "Environment variables",
      keywords: ["env", "environment", "variable", "export", "setx"],
      body: "Show all — mac/Linux: `env` or `printenv`; Windows CMD: `set`; PowerShell: `Get-ChildItem Env:`. Read one — mac/Linux: `echo $PATH`; Windows CMD: `echo %PATH%`; PowerShell: `$env:PATH`. Set for current session — mac/Linux: `export NAME=value`; Windows CMD: `set NAME=value`; PowerShell: `$env:NAME = \"value\"`. Set persistently on Windows: `setx NAME value` (new shells only).",
    },
    {
      id: "networking",
      title: "Networking",
      keywords: ["network", "ping", "curl", "wget", "netstat", "ifconfig", "ip"],
      body: "Connectivity — all: `ping host`. Fetch URL — mac/Linux: `curl -fsSL https://example.com`; Windows CMD: `curl ...` (shipped since Win 10); PowerShell: `Invoke-WebRequest url`. Interface info — mac: `ifconfig`, modern Linux: `ip addr`; Windows: `ipconfig`. Ports in use — mac/Linux: `lsof -i :3000` or `ss -tlnp`; Windows: `netstat -ano | findstr :3000`.",
    },
    {
      id: "piping",
      title: "Pipes and redirection",
      keywords: ["pipe", "redirect", "stdout", "stderr"],
      body: "Pipe (chain commands) — all: `cmd1 | cmd2`. Redirect stdout to file — all: `cmd > out.txt`, append with `>>`. Redirect stderr — mac/Linux: `cmd 2> err.txt`; both: `cmd > all.txt 2>&1`. PowerShell also supports `2>&1` and has object pipelines — `Get-Process | Where-Object CPU -gt 50` passes objects, not text.",
    },
    {
      id: "archives",
      title: "Compression and archives",
      keywords: ["zip", "tar", "gz", "unzip", "compress"],
      body: "Tar archives — mac/Linux: `tar -czf out.tar.gz dir/` create, `tar -xzf out.tar.gz` extract. Zip — mac/Linux: `zip -r out.zip dir/`, `unzip out.zip`; Windows CMD: `tar` and `curl` both ship; PowerShell: `Compress-Archive -Path dir -DestinationPath out.zip`, `Expand-Archive out.zip`.",
    },
    {
      id: "macos-package-manager",
      title: "macOS — Homebrew",
      keywords: ["mac", "macos", "homebrew", "brew", "install"],
      body: "Homebrew is the de facto package manager for macOS. Install: one-liner from brew.sh. Usage: `brew install node`, `brew upgrade`, `brew update` (refresh index), `brew uninstall pkg`, `brew list` (installed), `brew search term`. GUI apps via casks: `brew install --cask visual-studio-code`.",
    },
    {
      id: "windows-package-managers",
      title: "Windows — winget, Chocolatey, Scoop",
      keywords: ["windows", "winget", "chocolatey", "choco", "scoop", "install"],
      body: "winget is Microsoft's official package manager (built in on Windows 10/11): `winget install Git.Git`, `winget upgrade --all`, `winget search node`. Chocolatey (community): `choco install nodejs`, `choco upgrade all`. Scoop is user-scoped and simpler for CLI tools: `scoop install ripgrep`.",
    },
    {
      id: "linux-package-managers",
      title: "Linux — apt, dnf, pacman",
      keywords: ["linux", "apt", "dnf", "yum", "pacman", "package manager"],
      body: "Debian/Ubuntu use `apt`. Fedora/RHEL use `dnf` (or older `yum`). Arch uses `pacman`. Always update the index before installing. Use `sudo` because these modify system files.",
    },
    {
      id: "ubuntu-apt",
      title: "Ubuntu — apt in detail",
      keywords: ["ubuntu", "apt", "apt-get", "install", "upgrade"],
      body: "Refresh package lists: `sudo apt update`. Upgrade installed packages: `sudo apt upgrade -y` (or `full-upgrade` to allow removals). Install: `sudo apt install nodejs git`. Remove: `sudo apt remove pkg`; `purge` also drops config. Search: `apt search term`. Info: `apt show pkg`. List installed: `apt list --installed`. Clean cache: `sudo apt autoremove && sudo apt clean`.",
    },
    {
      id: "ubuntu-services",
      title: "Ubuntu — services with systemd",
      keywords: ["systemd", "systemctl", "service", "ubuntu"],
      body: "Ubuntu uses systemd for services. Start/stop/restart: `sudo systemctl start nginx`, `stop`, `restart`. Status: `systemctl status nginx`. Enable on boot: `sudo systemctl enable nginx`. Logs: `journalctl -u nginx -f` (follow) or `journalctl -xe` (recent errors). List active: `systemctl list-units --type=service`.",
    },
    {
      id: "ubuntu-users",
      title: "Ubuntu — users and groups",
      keywords: ["user", "adduser", "usermod", "sudo", "group"],
      body: "Add user: `sudo adduser alice` (interactive). Add to group: `sudo usermod -aG docker alice` (re-login takes effect). Grant sudo: add to `sudo` group. Switch user: `su - alice`. List groups for current user: `groups`. User info: `id alice`.",
    },
    {
      id: "ubuntu-wsl",
      title: "Windows — WSL (Ubuntu on Windows)",
      keywords: ["wsl", "ubuntu", "windows", "linux subsystem"],
      body: "WSL runs a real Linux kernel inside Windows. Install: `wsl --install` (defaults to Ubuntu). List distros: `wsl --list`. Launch: type `wsl` or `ubuntu` in any terminal. Windows files appear at `/mnt/c/...`; Linux files are best edited inside the WSL filesystem for performance. Integrates with VS Code via the 'WSL' extension.",
    },
    {
      id: "powershell-vs-cmd",
      title: "PowerShell vs CMD",
      keywords: ["powershell", "cmd", "windows", "difference"],
      body: "CMD is the legacy shell — simple string-based commands, batch (.bat) scripts, backwards compatibility. PowerShell is modern — object pipelines (`Get-Process | Sort-Object CPU`), cross-platform (PowerShell Core runs on Linux/macOS), and much more scriptable. On any modern Windows, reach for PowerShell unless you're debugging an old .bat file.",
    },
    {
      id: "mac-admin",
      title: "macOS — admin odds and ends",
      keywords: ["mac", "macos", "defaults", "launchctl", "diskutil"],
      body: "App preferences: `defaults read com.apple.finder`, `defaults write com.apple.finder AppleShowAllFiles YES`. Services: `launchctl list`, `launchctl load/unload /path/to/plist`. Disk tools: `diskutil list`, `diskutil info /Volumes/Foo`. Toggle hidden files in Finder: `Cmd+Shift+.`. Rosetta (run x86 on Apple Silicon): `softwareupdate --install-rosetta`.",
    },
    {
      id: "editing",
      title: "Editing files from the terminal",
      keywords: ["editor", "nano", "vim", "vi", "notepad"],
      body: "Cross-platform: `nano file` (beginner-friendly, `Ctrl+O` save, `Ctrl+X` exit). Everywhere: `vim file` or `vi file` (modal — `i` to insert, `Esc` then `:wq` save & quit, `:q!` quit discarding). Windows: `notepad file` for GUI. VS Code from any terminal (if installed on PATH): `code file`.",
    },
    {
      id: "common-patterns",
      title: "Useful cross-platform patterns",
      keywords: ["pattern", "chain", "background", "history"],
      body: "Run two commands only if first succeeds: `cmd1 && cmd2` (bash/zsh/PowerShell/CMD). Regardless of first result: `cmd1; cmd2` (bash/zsh/PowerShell). Background process — mac/Linux: `longtask &`; PowerShell: `Start-Process ...`. Command history — mac/Linux: `history`, up-arrow, `Ctrl+R` (reverse search); PowerShell: `Get-History` or up-arrow.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "rm", "dangerous"],
      body: "`rm -rf /` destroys a Unix system — never run without double-checking the path. Windows `rmdir /s /q` has no recycle bin. Case sensitivity: Linux and macOS (by default) are case-sensitive on paths in the terminal, Windows is not. Line endings: Windows uses CRLF, mac/Linux use LF — Git can auto-convert (`core.autocrlf`). Trailing slashes matter for rsync. Always quote variables that could contain spaces: `\"$VAR\"` / `\"%VAR%\"`.",
    },
  ],
};
