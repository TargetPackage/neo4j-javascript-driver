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
/* eslint-disable @typescript-eslint/promise-function-async */

import Connection from './connection'
import { bookmarks } from './internal'
import { ServerInfo } from './result-summary'

/**
 * Inteface define a common way to acquire a connection
 *
 * @private
 */
class ConnectionProvider {
  /**
   * This method acquires a connection against the specified database.
   *
   * Access mode and Bookmarks only applies to routing driver. Access mode only
   * differentiates the target server for the connection, where WRITE selects a
   * WRITER server, whereas READ selects a READ server. Bookmarks, when specified,
   * is only passed to the routing discovery procedure, for the system database to
   * synchronize on creation of databases and is never used in direct drivers.
   *
   * @param {object} param - object parameter
   * @property {string} param.accessMode - the access mode for the to-be-acquired connection
   * @property {string} param.database - the target database for the to-be-acquired connection
   * @property {Bookmarks} param.bookmarks - the bookmarks to send to routing discovery
   * @property {string} param.impersonatedUser - the impersonated user
   * @property {function (databaseName:string?)} param.onDatabaseNameResolved - Callback called when the database name get resolved
   */
  acquireConnection (param?: {
    accessMode?: string
    database?: string
    bookmarks: bookmarks.Bookmarks
    impersonatedUser?: string
    onDatabaseNameResolved?: (databaseName?: string) => void
  }): Promise<Connection> {
    throw Error('Not implemented')
  }

  /**
   * This method checks whether the backend database supports multi database functionality
   * by checking protocol handshake result.
   *
   * @returns {Promise<boolean>}
   */
  supportsMultiDb (): Promise<boolean> {
    throw Error('Not implemented')
  }

  /**
   * This method checks whether the backend database supports transaction config functionality
   * by checking protocol handshake result.
   *
   * @returns {Promise<boolean>}
   */
  supportsTransactionConfig (): Promise<boolean> {
    throw Error('Not implemented')
  }

  /**
   * This method checks whether the backend database supports transaction config functionality
   * by checking protocol handshake result.
   *
   * @returns {Promise<boolean>}
   */
  supportsUserImpersonation (): Promise<boolean> {
    throw Error('Not implemented')
  }

  /**
   * This method verifies the connectivity of the database by trying to acquire a connection
   * for each server available in the cluster.
   *
   * @param {object} param - object parameter
   * @property {string} param.database - the target database for the to-be-acquired connection
   * @property {string} param.accessMode - the access mode for the to-be-acquired connection
   *
   * @returns {Promise<ServerInfo>} promise resolved with server info or rejected with error.
   */
  verifyConnectivityAndGetServerInfo (param?: { database?: string, accessMode?: string }): Promise<ServerInfo> {
    throw Error('Not implemented')
  }

  /**
   * Returns the protocol version negotiated via handshake.
   *
   * Note that this function call _always_ causes a round-trip to the server.
   *
   * @returns {Promise<number>} the protocol version negotiated via handshake.
   * @throws {Error} When protocol negotiation fails
   */
  getNegotiatedProtocolVersion (): Promise<number> {
    throw Error('Not Implemented')
  }

  /**
   * Closes this connection provider along with its internals (connections, pools, etc.)
   *
   * @returns {Promise<void>}
   */
  close (): Promise<void> {
    throw Error('Not implemented')
  }
}

export default ConnectionProvider
