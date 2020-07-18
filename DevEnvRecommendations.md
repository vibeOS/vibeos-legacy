# Development Enviornment Recommendations
This markdown document will showcase recommendations and instructions for getting a development enviornment setup for developing vibeOS.

**IMPORTANT: These are only recommendations. You are not required to do what is explained here.**

## Code Editor Setup
For this, I recommend Visual Studio Code. It is cross platform, very modular and has good Git and GitHub integration. You can download Visual Studio Code [here.](https://code.visualstudio.com/)

Alternatively, you can also use GitHub desktop along with any other code editor.

### Git Setup
Visual Studio Code includes some amount of Git, however it's recommended to also install Git for extra measure.

Windows: Download the Git installer [here.](https://git-scm.com/download/win) Make sure to select Visual Studio Code as your editor during setup!

Linux: Download git from your distrobutions repositories.

macOS: Install homebrew [here](https://brew.sh/) if you dont already have it then run `brew install git`

Next, you will need to identify yourself to Git. Open Git Bash on Windows or your terminal on Linux/macOS and run `git config --global user.name "Your Name Here"` then run `git config --blogbal user.email "Your GitHub Email here"`. Once thats done, open up Visual Studio Code, press the Git button, clone repository, sign into GitHub and clone vibeOS!

### Browser Setup
If you want to use the debugging features in Visual Studio Code, you will need to download and install Firefox. [(Download Link)](https://www.mozilla.org/en-US/firefox/download/thanks/)

The debugging profile is already in the repository so once the extension is loaded you can simply press Launch vibeOS to get going. Enabling debugging lets you use things like Breakpoints and will give more explanitory errors then just the console. Recommended.

### Extensions
There are 3 extensions that are required and 2 that are optional. Plugins allow VSC to do a lot more powerful things, so not using them would just make your life harder.

#### Required

If you are using the debugging function, you will need to download the [Firefox Debugging Extension.](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)

If you are going to send/receive patches, you will need to download [Git Patch.](https://marketplace.visualstudio.com/items?itemName=paragdiwan.gitpatch)

If you are going to use the Git integration, it is advised to use the [Pull Request and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension (highly recommended).

#### Optional

I recommend getting the vscode-icons extension, as it gives a nice enhancement to the icon set. [Available here.](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

Also, if you would like to flex your ability to work on vibeOS, I recommend vscode-discord, as it will show everyone how cool you are. [Available here.](https://marketplace.visualstudio.com/items?itemName=maxerbox.vscode-discord)