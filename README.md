# Mythic GME Tools for FoundryVTT

Provides Script Macros and Roll Tables for Playing any RPG system with Mythic GM Emulator

### [Invite me to a Coffee](#by-jeansenvaars) :) if you enjoy my work!

[![YouTube Video](video-img.png)](https://youtu.be/bSzZbTvXPuw)

## Word Mill Games

**Mythic GM Emulator Rulebook** is REQUIRED to use and understand this content. Variations 1 and 2 books are needed for
the optional rules!.

All attributions belong to [Word Mill Games](https://www.wordmillgames.com) and this module is redistributed with _
appropriate permission from author_ **Tana Pigeon** - And may NOT be REDISTRIBUTED FURTHER without CONSENT

[Get Mythic GME Book](https://www.drivethrurpg.com/product/20798/Mythic-Game-Master-Emulator)

[Other fantastic Word Mill Games material](https://www.drivethrurpg.com/browse/pub/480/Word-Mill)

## Features

![](example-mythic-tools.png)

* Scripts for rolling Fate Charts, Random Event and Scene Chaos Checks with configurable parameters
* Scripts for Complex Questions and predefined focus events (Mythics Variations #1)
* Persistently records current Chaos Rank
* Allows Increasing and Decreasing Chaos Rank with a button
* Roll Tables for manual use in Foundry
* Configuration to point to custom Roll Tables to the Macros to customize your fate
* Formatted Message macro allows styling a chat message (color, title, bold, etc)

### Persisted Configuration

* Chaos Rank: When changing Chaos Rank, the value will be saved and reused across all functions
* Minimum and Maximum Chaos Rank is configurable
* Optional setting for ignoring Chaos Factor in Doubles (Variations #1)

### Macros

* Increase Chaos Rank
* Decrease Chaos Rank
* Fate Chart: Rolls on the Fate Chart. Triggers Random Events when appropriate.
* Random Event: Generates a random event.
* Scene Alteration: Checks if the proposed event is still valid. Rolls Random Events when appropriate.
* Complex Questions (Mythic Variations #1)

### Roll Tables

* Event Focus
* Action Meaning
* Subject Meaning
* Event Focus Themes from Variations #1

### Card Decks

![](example-decks.png)

**NOTE** - Deck Images are not included and can be purchased from DriveThruRPG or similar outlets.

* Includes presets for GME Deck, TAC Deck and some of the GMA Decks
* Add your own decks
* Set your default Deck folder
* Optional rotate cards feature (Mythic and TAC need this)
* Toggle shuffle off if required
* Set image file type to match your card image files.

## How to use

1. Install and Enable Mythic GME Tools in FoundryVTT
2. Enter any game (This module is system agnostic!)
3. Go to Compendiums, right click on Mythic GME Macros, Import All Content
4. Roll Tables can be used either directly from the Compendium, or imported along your other Roll Tables
5. [Optional] Using Decks (Cards not included) - Thank you stargolum/spacegiant) !!!
    1. Get a copy of
       cards [Mythic GME Cards](https://www.drivethrurpg.com/product/257195/Mythic-Game-Master-Emulator-Deck)
       or [TAC Cards](https://www.drivethrurpg.com/product/125685/The-GameMasters-Apprentice-Base-Deck) (check the macro
       list for a precise list of supported decks)
    2. Download the ZIP files of the decks you want to use
    3. Go to the folder "Data" from Foundry. This is where you have folders like `modules`, `systems` and `worlds`.
    4. Create a folder called `decks` exactly there along these other folders.
    5. Go inside the `decks` folder you just created and put the purchased .ZIP file there
    6. Right-click on the ZIP and press "Extract Here". Leave everything as is, make sure no folder names are duplicated
       when you extract it.
    7. Import mythic deck Macros for your preset game (or use these as guidance)
    8. If everything works, you can delete the zip file from there. It is not needed.
5. Say thanks if you like this :)

**CUSTOMIZATION** - Macros use Roll Tables! Going to **Module Settings** lets you choose which tables are being used and
can be configured. Table names must begin with **Mythic** in order to be eligible (this is to avoid dropdown crowding).

**WARNING** - If you installed pre-release builds from manifest links, please uninstall and reinstall the module from
Foundry! Important scripts have changed since.

## Author

This module is developed by me (Saif Ellafi - JeansenVaars) independently, and I hold no business relationship with Word
Mill Games. I (Saif Ellafi / @JeansenVaars) was given PERMISSION by Tana Pigeon to distribute this package UNDER STRICT
CONSENT of non-commercial distribution within Foundry VTT only.

However you can still [Invite me to a Coffee](#by-jeansenvaars) :) if you enjoy my work!

### Contributors

Thanks to [spacegiant](https://github.com/spacegiant) (GitHub username) - We can enjoy a set of Macros destined to use
Mythic Cards Deck as well as The GameMaster's Apprentice.

The decks **ARE NOT INCLUDED**, thus must be purchased
separately: [Mythic GME Deck](https://www.drivethrurpg.com/product/257195/Mythic-Game-Master-Emulator-Deck)
and [TAC](https://www.drivethrurpg.com/product/125685/The-GameMasters-Apprentice-Base-Deck)

### Community

Special thanks to the Community at the Discord Channel from [Mythic Game Master Emulator](https://discord.gg/hyHUuZEt)
for the support

## To do

* Mythic Variations #2
* Optional Rules and Magazine Variations

## By JeansenVaars

![JVLogo](logo-small-black.png)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V14D3AH)

## Check out my other modules!

* [Minimal UI](https://github.com/saif-ellafi/foundryvtt-minimal-ui)
* [Window Controls](https://github.com/saif-ellafi/foundryvtt-window-controls)
* [Scene Preview](https://github.com/saif-ellafi/foundryvtt-scene-preview)
* [Super Select](https://github.com/saif-ellafi/foundryvtt-super-select)

# License

[MIT License](./LICENSE.md)

# Powered By

[![JetBrains](./jetbrains.svg)](https://www.jetbrains.com)

Thanks to JetBrains I can work on this project using **WebStorm**.
