/**
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as util from './util'

const BOOKMARKS_KEY = 'bookmarks'

export class Bookmarks {
  private readonly _values: string[]

  /**
   * @constructor
   * @param {string|string[]} values single bookmark as string or multiple bookmarks as a string array.
   */
  constructor (values?: string | string[] | null) {
    this._values = asStringArray(values)
  }

  static empty (): Bookmarks {
    return EMPTY_BOOKMARK
  }

  /**
   * Check if the given Bookmarks holder is meaningful and can be send to the database.
   * @return {boolean} returns `true` bookmarks has a value, `false` otherwise.
   */
  isEmpty (): boolean {
    return this._values.length === 0
  }

  /**
   * Get all bookmarks values as an array.
   * @return {string[]} all values.
   */
  values (): string[] {
    return this._values
  }

  [Symbol.iterator] (): IterableIterator<string> {
    return this._values[Symbol.iterator]()
  }

  /**
   * Get these bookmarks as an object for begin transaction call.
   * @return {Object} the value of this bookmarks holder as object.
   */
  asBeginTransactionParameters (): { [BOOKMARKS_KEY]?: string[] } {
    if (this.isEmpty()) {
      return {}
    }

    // Driver sends {bookmarks: "max", bookmarks: ["one", "two", "max"]} instead of simple
    // {bookmarks: ["one", "two", "max"]} for backwards compatibility reasons. Old servers can only accept single
    // bookmarks that is why driver has to parse and compare given list of bookmarks. This functionality will
    // eventually be removed.
    return {
      [BOOKMARKS_KEY]: this._values
    }
  }
}

const EMPTY_BOOKMARK = new Bookmarks(null)

/**
 * Converts given value to an array.
 * @param {string|string[]|Array} [value=undefined] argument to convert.
 * @return {string[]} value converted to an array.
 */
function asStringArray (
  value?: string | string[] | null
): string[] {
  if (value == null || value === '') {
    return []
  }

  if (util.isString(value)) {
    return [value] as string[]
  }

  if (Array.isArray(value)) {
    const result = new Set<string>()
    const flattenedValue = flattenArray(value)
    for (let i = 0; i < flattenedValue.length; i++) {
      const element = flattenedValue[i]
      // if it is undefined or null, ignore it
      if (element !== undefined && element !== null) {
        if (!util.isString(element)) {
          throw new TypeError(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `Bookmark value should be a string, given: '${element}'`
          )
        }
        result.add(element)
      }
    }
    return [...result]
  }

  throw new TypeError(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `Bookmarks should either be a string or a string array, given: '${value}'`
  )
}

/**
 * Recursively flattens an array so that the result becomes a single array
 * of values, which does not include any sub-arrays
 *
 * @param {Array} value
 */
function flattenArray (values: any[]): string[] {
  return values.reduce(
    (dest, value) =>
      Array.isArray(value)
        ? dest.concat(flattenArray(value))
        : dest.concat(value),
    []
  )
}
