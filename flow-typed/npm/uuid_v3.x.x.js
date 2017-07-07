/* @flow */

declare module 'uuid' {
  declare module.exports: any
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */
declare module 'uuid/lib/bytesToUuid' {
  declare module.exports: any
}

declare module 'uuid/lib/rng-browser' {
  declare module.exports: any
}

declare module 'uuid/lib/rng' {
  declare module.exports: any
}

declare module 'uuid/lib/sha1-browser' {
  declare module.exports: any
}

declare module 'uuid/lib/sha1' {
  declare module.exports: any
}

declare module 'uuid/v1' {
  declare module.exports: () => string
}

declare module 'uuid/v4' {
  declare module.exports: () => string
}

declare module 'uuid/v5' {
  declare module.exports: any
}

// Filename aliases
declare module 'uuid/index' {
  declare module.exports: $Exports<'uuid'>
}
declare module 'uuid/index.js' {
  declare module.exports: $Exports<'uuid'>
}
declare module 'uuid/lib/bytesToUuid.js' {
  declare module.exports: $Exports<'uuid/lib/bytesToUuid'>
}
declare module 'uuid/lib/rng-browser.js' {
  declare module.exports: $Exports<'uuid/lib/rng-browser'>
}
declare module 'uuid/lib/rng.js' {
  declare module.exports: $Exports<'uuid/lib/rng'>
}
declare module 'uuid/lib/sha1-browser.js' {
  declare module.exports: $Exports<'uuid/lib/sha1-browser'>
}
declare module 'uuid/lib/sha1.js' {
  declare module.exports: $Exports<'uuid/lib/sha1'>
}
declare module 'uuid/v1.js' {
  declare module.exports: $Exports<'uuid/v1'>
}
declare module 'uuid/v4.js' {
  declare module.exports: $Exports<'uuid/v4'>
}
declare module 'uuid/v5.js' {
  declare module.exports: $Exports<'uuid/v5'>
}
