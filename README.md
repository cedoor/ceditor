<h1 align="center" title="Ceditor">
  <img width="120" alt="Ceditor logo" src="https://github.com/cedoor/ceditor/blob/master/resources/icon.png">
  Ceditor<sup>beta</sup>
</h1>

<p align="center">
  <a href="https://ceditor.cedoor.org">
  	<img src="https://img.shields.io/badge/Ceditor-TS%2FJS%20online%20editor-green.svg">
  </a>
  <a href="https://david-dm.org/cedoor/ceditor">
  	<img src="https://img.shields.io/david/cedoor/ceditor.svg">
  </a>
  <a href="https://david-dm.org/cedoor/ceditor">
  	<img src="https://img.shields.io/david/dev/cedoor/ceditor.svg">
  </a>
  <a href="https://github.com/cedoor/ceditor/releases/latest">
    <img src="https://img.shields.io/github/release/cedoor/ceditor.svg">
  </a>
  <a href="LICENSE">
  	<img src="https://img.shields.io/github/license/cedoor/ceditor.svg?style=flat-square">
  </a>
</p>
  
Ceditor is an online JavaScript/TypeScript editor to run & share the code with [Github gists](https://gist.github.com). Passing the id of the Github gist in the URL it's possible to load the code (TypeScript or JavaScript) directly into the [Ace](https://ace.c9.io/) editor. The tool provides information on the gist and allows navigation of its associated files.

It is also possible to import the code of other gist files and libraries via CDN.

## :paperclip: Table of Contents
- :rocket: [Features](#rocket-features)
- :hammer: [Install](#hammer-install)
- :video_game: [Usage](#video_game-usage)
- :arrow_up: [Deploy](#arrow_up-deploy)
- :chart_with_upwards_trend: [Development](#chart_with_upwards_trend-development)
  - :raised_hand: [Contribute](#raised_hand-contribute)
  - :scroll: [Rules](#scroll-rules)
    - [Commits](#commits)
    - [Branches](#branches)
- :page_facing_up: [License](#page_facing_up-license)
- :telephone_receiver: [Contacts](#telephone_receiver-contacts)
  - :boy: [Developers](#boy-developers)

## :rocket: Features

- :heavy_check_mark: Read gist files
- :heavy_check_mark: Run the TypeScript/JavaScript code
- :heavy_check_mark: Import JavaScript libraries via CDN
- :heavy_check_mark: Import gist files (TypeScript/JavaScript code) in the editor
- :heavy_check_mark: Sidenav gist informations
- :heavy_check_mark: Sidenav gist files navigation
- :white_large_square: About app dialog
- :white_large_square: More default Ceditor files
- :white_large_square: Create new gist
- :white_large_square: Update current gist files
- :white_large_square: Create new gist file

## :hammer: Install

With the following installed:
- git
- node >= 8
- npm >= 6

Clone the repo and install the dependencies from npm.

```bash
git clone https://github.com/cedoor/ceditor.git
cd ceditor
npm i
```

## :video_game: Usage

For local *development* with angular dev server:

```bash
npm start
```

Then open [http://localhost:4200](http://localhost:4200) in your browser.

## :arrow_up: Deploy

You can self-host your own Ceditor with Github hosting service. For that, fork the repository, install the dependencies and run `npm run release` (remember to set correctly --base-href build option of angular cli command).

## :chart_with_upwards_trend: Development

### :raised_hand: Contribute

Ceditor is a work in progress. Remember that if you want you can make a small contribution with a pull request.

### :scroll: Rules

#### Commits

* Use this commit message format (angular style):  

    `[<type>] <subject>`
    `<BLANK LINE>`
    `<body>`

    where `type` must be one of the following:

    - feat: A new feature
    - fix: A bug fix
    - docs: Documentation only changes
    - style: Changes that do not affect the meaning of the code
    - refactor: A code change that neither fixes a bug nor adds a feature
    - test: Adding missing or correcting existing tests
    - chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
    - update: Update of the library version or of the dependencies

and `body` must be should include the motivation for the change and contrast this with previous behavior (do not add body if the commit is trivial). 

* Use the imperative, present tense: "change" not "changed" nor "changes".
* Don't capitalize first letter.
* No dot (.) at the end.

#### Branches

* There is a master branch, used only for release.
* There is a dev branch, used to merge all sub dev branch.
* Avoid long descriptive names for long-lived branches.
* No CamelCase.
* Use grouping tokens (words) at the beginning of your branch names (in a similar way to the `type` of commit).
* Define and use short lead tokens to differentiate branches in a way that is meaningful to your workflow.
* Use slashes to separate parts of your branch names.
* Remove branch after merge if it is not important.

Examples:
    
    git branch -b docs/README
    git branch -b test/one-function
    git branch -b feat/side-bar
    git branch -b style/header

## :page_facing_up: License
* See [LICENSE](https://github.com/cedoor/ceditor/blob/master/LICENSE) file.

## :telephone_receiver: Contacts
### :boy: Developers
* e-mail : omardesogus9@gmail.com
* github : [@cedoor](https://github.com/cedoor)
* website : https://cedoor.org
