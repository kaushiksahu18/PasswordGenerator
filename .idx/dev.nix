# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.bun
    pkgs.nodejs_20
    pkgs.git

    # terminal
    pkgs.fish
    pkgs.starship
    pkgs.fira-code
    pkgs.meslo-lgs-nf
  ];
  # Sets environment variables in the workspace
  env = { };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "Catppuccin.catppuccin-vsc"
      "esbenp.prettier-vscode"
      "PKief.material-icon-theme"
      "jock.svg"
      "usernamehw.errorlens"
      "yoavbls.pretty-ts-errors"
      "bbenoist.Nix"
      "bradlc.vscode-tailwindcss"
      "formulahendry.auto-rename-tag"
      "dsznajder.es7-react-js-snippets"
    ];
    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
        starship-config = "starship preset pure-preset -o ~/.config/starship.toml";
      };
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # npm-dev = "npm run dev"
      };
    };
  };
}
