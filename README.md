# open-junk-dir

open-jink-dir create a disposable directory

can specify the directory path yourself, and you can also use the Moment.js [format](https://momentjs.com/).

## Useage

![vscode-open-junk-dir](https://user-images.githubusercontent.com/536667/51915753-2f708480-241f-11e9-8f87-bde0ed1e61a4.gif)


## Settings

```json5
{
  // root directory to make junk file
  "openJunkDir.junkFileDir": "~/junk",
  // junk file directory format (Moment.js format)
  "openJunkDir.junkFileFormat": "/YYYY/MM/DD/YYYYMMDD_hmmss"
}
```