# vibeOS JavaScript Terminal
The vibeOS JavaScript Terminal is an application which can process JavaScript code and return output in a similar way to terminals found on NT and *nix systems. In addition to being able to process regular JS, vibeOS includes certain command line utilities to gather information and manage the operating enviornment. This help document covers what these commands are and how to use them, in addition to providing information about development and debugging commands.

**Note:** When explaining these commands, it will leave out `()` &/or `(arg)`. As these commands are JavaScript based, any command will require `()` to be appended. Example: The help command will be shown as `help` but to run, it must be appended with `()` for a result of `help()`.

**Note:** Standard Utilities currently reside in the `ct.js` file. Removal of this file, or it being unable to load, will result in undocumented behavior and will result in Standard Utilities being unable to function.

**Even More Important Note:** Because of built in commands in many browsers, all SU commands will start with `vsu_`.

## Standard Utilities

`vsu_about` - The about command returns various information about the operating enviornment, including but not limited to: Name, Version, Version Appendages, Browser HREF and Current User.
Example:
```
Welcome to the JS Terminal
> about()
vibeOS 1.0 (PuRe) | https://vibeos.ctaetcsh.xyz/ | User: guest
```
*Important: The example shown above is NOT representative of the current state of vibeOS, and is purely for demonstration purposes.*



