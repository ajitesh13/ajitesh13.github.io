---
title: 'Webextension Activity Monitor'
description: 'A Webextension to track the activity of other webextensions'
year: '2020'
platform: 'Firefox >= 72'
stack: 'JavaScript'
github: 'https://github.com/ajitesh13/webextension-activity-reporter'
thumbnail: '/images/works/activitymonitor.png'
images:
  - '/images/works/activitymonitor2.png'
  - '/images/works/activitymonitor.png'
  - '/images/works/activitymonitor3.png'
---

Extensions do most of their work invisibly from users and hence Extension activity is a complete mystery for most users, even advanced ones. Providing more transparency could help increase reliability of abuse reporting and accountability for developers, as well as providing an additional useful tool to aid investigating bugs in the Extensions or in the Firefox WebExtensions internals.

## Features

The activityLog Extension will help the user to track the activities of the activated Extensions in their browser. For example:

- Network requests they are making
- Altered browser settings
- API function calls and events they are executing
- Background functioning of Firefox

This Extension will list out the activities other extensions are doing and will enable a feature for firefox developers, WebExtension developers, reviewers and sophisticated users to trace the individual Extensions.

## Technical Details

This feature is not meant to provide information in a format that's useful for the average user, just for the people who already have a thorough understanding of how Extensions work.

Unlike the about:addons which is the primary way how all Firefox users manage their addons which includes listing, enabling/disabling, setting preferences, etc. This Extension provides deeper insights into extension behavior.
