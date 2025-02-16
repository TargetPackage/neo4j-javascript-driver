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

import RxSession from './session-rx'
import {
  Driver as CoreDriver,
  types,
  SessionConfig
} from 'neo4j-driver-core'

declare type AuthToken = types.AuthToken
declare type Config = types.Config
declare type EncryptionLevel = types.EncryptionLevel
declare type TrustStrategy = types.TrustStrategy

declare type SessionMode = types.SessionMode

declare const READ: SessionMode
declare const WRITE: SessionMode

declare interface Driver extends CoreDriver {
  rxSession: (sessionParams?: SessionConfig) => RxSession
}

export {
  Driver,
  READ,
  WRITE,
  AuthToken,
  Config,
  EncryptionLevel,
  TrustStrategy,
  SessionMode
}

export default Driver
