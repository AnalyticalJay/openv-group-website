# Dependency remediation notes

The current pnpm documentation states that pnpm settings must be defined in `pnpm-workspace.yaml` beginning with pnpm 11; settings in the `pnpm` field of `package.json` are no longer read by pnpm 11. The pnpm 10 settings documentation describes `overrides` as the mechanism for enforcing versions across the dependency graph.

Sources:

- [pnpm package.json documentation](https://pnpm.io/package_json)
- [pnpm 10 settings documentation](https://pnpm.io/10.x/settings)
- [pnpm dependency resolution settings](https://pnpm.io/settings/dependency-resolution)
